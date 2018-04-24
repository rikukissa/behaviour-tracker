import * as React from "react";
import * as Icons from "react-icons/lib/io";

import { Student, StudentBox } from "./components/Student";
import styled from "styled-components";

import { StudentModal } from "./components/StudentModal";
import { IState, storeEmotion, toggleStudentEditor, IStudent } from "./store";
import { connect } from "react-redux";

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

interface IAppProps {
  students: IStudent[];
}
interface IAppDispatchProps {
  storeEmotion: (name: string, value: number) => any;
  toggleStudentEditor: () => any;
}

interface IAppState {
  selected: string | null;
}

class App extends React.Component<IAppProps & IAppDispatchProps, IAppState> {
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
        <Students>
          {this.props.students.map(student => (
            <Student
              key={student.name}
              student={student}
              selected={this.state.selected === student.name}
              onEmotion={this.props.storeEmotion}
              onClick={this.selectStudent}
            />
          ))}
        </Students>
        <PlusButton onClick={this.props.toggleStudentEditor} selected={false}>
          <Icons.IoPlusRound size={50} />
        </PlusButton>
        <StudentModal />
      </Container>
    );
  }
}

export default connect(
  (state: IState) =>
    console.log(state) || {
      students: state.students
    },
  {
    storeEmotion,
    toggleStudentEditor
  }
)(App);
