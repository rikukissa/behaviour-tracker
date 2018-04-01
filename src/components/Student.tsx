import * as React from "react";
import styled, { css } from "styled-components";
import * as Icons from "react-icons/lib/io";
import { Emojione } from "react-emoji-render";

const EMOJIS = ["😤", "😣", "😕", "😊", "😃"];

interface IStudentProps {
  onClick: (name: string) => void;
  name: string;
  selected: boolean;
}

export const StudentBox = styled.div.attrs<Pick<IStudentProps, "selected">>({})`
  padding: 1em;
  margin: 1em;
  border: 4px solid #454545;
  color: #454545;
  font-family: "Lato", sans-serif;
  font-size: 20px;
  font-weight: 600;
  padding: 1em;
  min-width: 310px;
  min-height: 105px;
  cursor: pointer;
  transition: all 300ms;
  ${({ selected }) =>
    selected
      ? css`
          transform: scale(1.2, 1.2);
        `
      : ""};
`;

const Name = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Emoji = styled.div`
  font-size: 30px;
  padding: 0.5em;
  cursor: pointer;
`;

const Emojis = styled.div`
  text-align: center;
  justify-content: center;

  display: inline-flex;
  margin-top: 0.5em;
`;

export function Student({ onClick, selected, name }: IStudentProps) {
  const emojis = EMOJIS.map(emoji => (
    <Emoji key={emoji}>
      <Emojione svg text={emoji} />
    </Emoji>
  ));

  return (
    <StudentBox selected={selected} onClick={() => onClick(name)}>
      <Name>
        {name}
        {selected && (
          <div>
            <Icons.IoClipboard />
          </div>
        )}
      </Name>

      {selected && <Emojis>{emojis}</Emojis>}
    </StudentBox>
  );
}
