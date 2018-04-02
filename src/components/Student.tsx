import * as React from "react";
import styled, { css } from "styled-components";
import * as Icons from "react-icons/lib/io";
import * as isSameDay from "date-fns/is_same_day";

import { Emojione } from "react-emoji-render";
import { IStudent } from "../State";

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
  height: 105px;
  padding: 1em;
  margin: 1em;
  border: 4px solid #454545;
  color: #454545;
  font-family: "Lato", sans-serif;
  font-size: 20px;
  font-weight: 600;
  padding: 1em;
  cursor: pointer;
  transition: all 300ms;
  cursor: pointer;

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

const Name = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Emoji = styled.div`
  font-size: 30px;
  padding: 0.5em;
  transition: all 300ms;
  cursor: pointer;
  &:hover {
    transform: scale(1.2, 1.2);
  }
`;

const Emojis = styled.div`
  text-align: center;
  justify-content: center;
  display: inline-flex;
  margin-top: 0.5em;
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
      {!selected &&
        emotion && (
          <CurrentMood>
            <Emojione svg text={getEmojiWithEmotionValue(emotion.value)} />
          </CurrentMood>
        )}
      {!selected &&
        !emotion && (
          <CurrentMood isPlaceholder>
            <Emojione svg text={"🙂"} />
          </CurrentMood>
        )}
    </StudentBox>
  );
}
