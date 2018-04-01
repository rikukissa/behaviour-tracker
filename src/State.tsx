import * as React from "react";

interface IStudent {
  name: string;
  data: any;
}

const STUDENTS: IStudent[] = [
  { name: "Riku", data: [] },
  { name: "Pauli", data: [] },
  { name: "Ali", data: [] }
];

export interface IState {
  students: IStudent[];
  addingStudent: boolean;
}

const initialState: IState = {
  students: STUDENTS,
  addingStudent: false
};

interface IContext {
  state: IState;
  actions: {
    addStudent: (student: IStudent) => void;
    toggleStudentEditor: () => void;
  };
}

export const StateContext = React.createContext<IContext>({
  state: initialState,
  actions: {} as any
});

export class StateProvider extends React.Component {
  public state = initialState;
  private toggleStudentEditor = () => {
    this.setState({ addingStudent: !this.state.addingStudent });
  };
  private addStudent = (student: IStudent) => {
    this.setState({
      students: this.state.students.concat(student),
      addingStudent: false
    });
  };
  private actions = {
    addStudent: this.addStudent,
    toggleStudentEditor: this.toggleStudentEditor
  };
  public render() {
    return (
      <StateContext.Provider
        value={{ state: this.state, actions: this.actions }}
      >
        {this.props.children}
      </StateContext.Provider>
    );
  }
}
