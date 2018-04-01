import * as React from "react";
import * as Modal from "react-modal";
import Form from "react-jsonschema-form";
import * as Icons from "react-icons/lib/io";

import { Student, StudentBox } from "./components/Student";
import styled from "styled-components";
import { StateProvider, StateContext } from "./State";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: 100%;
  background: #f4f5f0;
  padding: 2em;
`;

const PlusButton = styled(StudentBox)`
  align-items: center;
  justify-content: center;
  display: flex;
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
              <div>
                {state.students.map(student => (
                  <Student
                    key={student.name}
                    name={student.name}
                    selected={this.state.selected === student.name}
                    onClick={this.selectStudent}
                  />
                ))}
                <PlusButton selected={false}>
                  <Icons.IoPlusRound
                    size={50}
                    onClick={actions.toggleStudentEditor}
                  />
                </PlusButton>
                <Modal ariaHideApp={false} isOpen={state.addingStudent}>
                  <Form
                    onSubmit={({ formData }) => actions.addStudent(formData)}
                    schema={{
                      title: "Oppilas",
                      type: "object",
                      required: ["name"],
                      properties: {
                        name: {
                          type: "string",
                          title: "Nimi"
                        }
                      }
                    }}
                  />
                </Modal>
              </div>
            )}
          </StateContext.Consumer>
        </StateProvider>
      </Container>
    );
  }
}

export default App;
