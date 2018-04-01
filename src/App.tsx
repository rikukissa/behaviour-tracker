import * as React from "react";
import styled from "styled-components";
import { Student } from "./components/Student";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const NAMES = [
  "Niko",
  "Pauli",
  "Ali",
  "Reima",
  "Rami",
  "Mauno",
  "Rasmus",
  "Paul",
  "Reko",
  "Mauri",
  "Anselmi",
  "Peetu",
  "Altti"
];

class App extends React.Component {
  public state = {
    selected: null
  };
  private selectStudent = (name: string) => {
    const alreadySelected = this.state.selected === name;
    this.setState({ selected: alreadySelected ? null : name });
  };
  public render() {
    return (
      <Container>
        {NAMES.map(name => (
          <Student
            key={name}
            name={name}
            selected={this.state.selected === name}
            onClick={this.selectStudent}
          />
        ))}
      </Container>
    );
  }
}

export default App;
