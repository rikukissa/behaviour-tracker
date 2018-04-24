import * as React from "react";
import styled, { css } from "styled-components";
import * as Icons from "react-icons/lib/io";
import * as isSameDay from "date-fns/is_same_day";

import { Emojione } from "react-emoji-render";
import { IStudent, IDataPoint } from "../store";
import { VictoryAxis, VictoryLine, VictoryChart } from "victory";
import { isSameWeek, addDays, startOfISOWeek } from "date-fns";

const EMOJIS = [
  { emoji: "😤", value: -2 },
  { emoji: "😣", value: -1 },
  { emoji: "🙂", value: 0 },
  { emoji: "😊", value: 1 },
  { emoji: "😃", value: 2 }
];

interface IStudentProps {
  onClick: (name: string) => void;
  onEmotion: (name: string, value: number) => void;
  student: IStudent;
  selected: boolean;
}

export const StudentBox = styled.div.attrs<Pick<IStudentProps, "selected">>({})`
  width: 310px;
  padding: 1em;
  margin: 1em;
  border: 4px solid #454545;
  color: #454545;
  font-size: 20px;
  font-weight: 600;
  padding: 1em;
  cursor: pointer;
  transition: all 300ms;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  ${({ selected }) =>
    selected
      ? css`
          transform: scale(1.2, 1.2);
        `
      : css`
          &:hover {
            transform: scale(1.05, 1.05);
          }
        `};
`;

const CardBody = styled.div`
  padding-top: 1em;
  display: flex;
  height: 120px;
`;

const Name = styled.div`
  display: flex;
  justify-content: space-between;
  flex-shrink: 0;
`;

const Emoji = styled.div`
  font-size: 30px;
  padding: 0.5em;
  transition: all 300ms;
  cursor: pointer;
  align-items: center;
  display: flex;
  &:hover {
    transform: scale(1.2, 1.2);
  }
`;

const Emojis = styled.div`
  text-align: center;
  justify-content: center;
  display: inline-flex;
  margin-top: 0.5em;
  flex-grow: 1;
`;

const Tools = styled.div`
  display: flex;
`;

const CurrentMood = styled.div.attrs<{ isPlaceholder?: boolean }>({})`
  font-size: 60px;
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  ${({ isPlaceholder }) =>
    isPlaceholder
      ? css`
          opacity: 0.2;
        `
      : ""};
`;

const Tool = styled.div`
  margin: 0 5px;
  cursor: pointer;
  &:hover {
    transform: scale(1.2, 1.2);
  }
`;

function getCurrentEmotion(student: IStudent) {
  const today = student.data.filter(({ added }) =>
    isSameDay(added, new Date())
  );
  if (today.length === 0) {
    return null;
  }
  return today[today.length - 1];
}

function getEmojiWithEmotionValue(value: number) {
  const emotion = EMOJIS.find(emoji => emoji.value === value);
  return emotion && emotion.emoji;
}

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri"];

function calculateAverage(points: IDataPoint[]) {
  if (points.length === 0) {
    return 0;
  }
  return points.reduce((sum, { value }) => sum + value, 0) / points.length;
}

const onlyFromThisWeek = (point: IDataPoint) =>
  isSameWeek(new Date(), point.added);

function getChartData(student: IStudent) {
  const weeksDataPoint = student.data.filter(onlyFromThisWeek);
  const weekStart = startOfISOWeek(new Date());

  return Array(5)
    .fill(null)
    .map((_, i) => {
      const day = addDays(weekStart, i);
      const pointsForDay = weeksDataPoint.filter(point =>
        isSameDay(point.added, day)
      );
      const average = calculateAverage(pointsForDay);

      return {
        x: i + 1,
        y: average
      };
    });
}

export function Student({
  onClick,
  selected,
  student,
  onEmotion
}: IStudentProps) {
  const name = student.name;

  const emojis = EMOJIS.map(emoji => (
    <Emoji onClick={() => onEmotion(name, emoji.value)} key={emoji.value}>
      <Emojione svg text={emoji.emoji} />
    </Emoji>
  ));

  const emotion = getCurrentEmotion(student);

  return (
    <StudentBox selected={selected} onClick={() => onClick(name)}>
      <Name>
        {name}
        {selected && (
          <Tools>
            <Tool>
              <Icons.IoClipboard />
            </Tool>
            <Tool>
              <Icons.IoWrench />
            </Tool>
          </Tools>
        )}
      </Name>

      {selected && <Emojis>{emojis}</Emojis>}

      {!selected && (
        <CardBody>
          <VictoryChart domainPadding={5} padding={10}>
            <VictoryAxis
              style={{
                axis: { strokeWidth: 0 },
                tickLabels: {
                  display: "none"
                }
              }}
              dependentAxis
              domain={[-2, 2]}
              offsetX={0}
            />

            <VictoryAxis
              style={{
                tickLabels: {
                  fontSize: "40px"
                },
                axis: { stroke: "#454545", strokeWidth: 4 }
              }}
              tickCount={4}
              tickFormat={t => WEEKDAYS[t - 1]}
            />
            <VictoryLine
              style={{
                data: { stroke: "#c43a31", strokeWidth: 7 }
              }}
              data={getChartData(student)}
            />
          </VictoryChart>

          {!emotion ? (
            <CurrentMood isPlaceholder>
              <Emojione svg text={"🙂"} />
            </CurrentMood>
          ) : (
            <CurrentMood>
              <Emojione svg text={getEmojiWithEmotionValue(emotion.value)} />
            </CurrentMood>
          )}
        </CardBody>
      )}
    </StudentBox>
  );
}
