import * as React from "react";
import styled, { css } from "styled-components";

const EMOJIS = ["😤", "😣", "😕", "😊", "😃"];

interface IStudentProps {
  onClick: (name: string) => void;
  name: string;
  selected: boolean;
}

const Container = styled.div.attrs<Pick<IStudentProps, "selected">>({})`
  padding: 1em;
  margin: 1em;
  background: linear-gradient(135deg, rgba(248, 78, 175, 1) 0%, #e28cac 100%);
  color: #fff;
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

const Name = styled.div``;

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
  const emojis = EMOJIS.map(emoji => <Emoji key={emoji}>{emoji}</Emoji>);

  return (
    <Container selected={selected} onClick={() => onClick(name)}>
      <Name>{name}</Name>

      {selected && <Emojis>{emojis}</Emojis>}
    </Container>
  );
}
