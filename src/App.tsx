import * as React from "react";
import * as Icons from "react-icons/lib/io";

import { Student, StudentBox } from "./components/Student";
import styled from "styled-components";
import { StateProvider, StateContext } from "./State";
import { StudentModal } from "./components/StudentModal";

const Container = styled.div`
  min-height: 100%;
  background: #f4f5f0;
  padding: 2em;
`;

const Students = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: baseline;
`;

const PlusButton = styled(StudentBox)`
  width: 50px;
  height: 40px;
  align-items: center;
  justify-content: center;
  display: flex;
  &:not(:hover) {
    background: #454545;
    color: #f4f5f0;
  }
`;

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
        <StateProvider>
          <StateContext.Consumer>
            {({ state, actions }) => (
              <>
                <Students>
                  {state.students.map(student => (
                    <Student
                      key={student.name}
                      student={student}
                      selected={this.state.selected === student.name}
                      onEmotion={actions.storeEmotion}
                      onClick={this.selectStudent}
                    />
                  ))}
                </Students>
                <PlusButton
                  onClick={actions.toggleStudentEditor}
                  selected={false}
                >
                  <Icons.IoPlusRound size={50} />
                </PlusButton>
                <StudentModal />
              </>
            )}
          </StateContext.Consumer>
        </StateProvider>
      </Container>
    );
  }
}

export default App;
