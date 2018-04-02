import * as React from "react";
import { subDays } from "date-fns";

export interface IStudent {
  name: string;
  data: Array<{ added: Date; value: number }>;
}

function generateFakeData() {
  return Array(10)
    .fill(null)
    .map((_, i) => ({
      added: subDays(new Date(), 10 - i),
      value: Math.round(-2 + Math.random() * 5)
    }));
}

function generateFakeStudents() {
  const names = ["Riku", "Pauli", "Ali"];
  return names.map(name => ({ name, data: generateFakeData() }));
}

const STUDENTS: IStudent[] = generateFakeStudents();

export interface IState {
  students: IStudent[];
  addingStudent: boolean;
}

const LOCALSTORAGE_KEY = "app_data";

const storedState = window.localStorage.getItem(LOCALSTORAGE_KEY);
const initialState: IState = {
  students: STUDENTS,
  addingStudent: false,
  ...(storedState ? JSON.parse(storedState) : {})
};

interface IContext {
  state: IState;
  actions: {
    addStudent: (student: IStudent) => void;
    toggleStudentEditor: () => void;
    storeEmotion: (name: string, value: number) => void;
  };
}

export const StateContext = React.createContext<IContext>({
  state: initialState,
  actions: {} as any
});

export class StateProvider extends React.Component<{}, IState> {
  public state = { ...initialState };
  private setAndStoreState = (patcher: (state: IState) => Partial<IState>) => {
    this.setState(state => {
      const newState = { ...state, ...patcher(state) };
      window.localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(newState));
      return newState;
    });
  };
  private toggleStudentEditor = () => {
    this.setAndStoreState((state: IState) => ({
      addingStudent: !state.addingStudent
    }));
  };
  private addStudent = (student: IStudent) => {
    const newStudent = { ...student, data: [] };
    this.setAndStoreState((state: IState) => ({
      students: state.students.concat(newStudent),
      addingStudent: false
    }));
  };
  private storeEmotion = (name: string, value: number) => {
    this.setAndStoreState((state: IState) => ({
      students: state.students.map((student: IStudent) => {
        if (student.name !== name) {
          return student;
        }
        return {
          ...student,
          data: student.data.concat({ added: new Date(), value })
        };
      }),
      addingStudent: false
    }));
  };
  private actions = {
    addStudent: this.addStudent,
    toggleStudentEditor: this.toggleStudentEditor,
    storeEmotion: this.storeEmotion
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
