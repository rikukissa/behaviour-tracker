import { subDays, getDay, addDays } from "date-fns";
import { createStore } from "redux";

export interface IDataPoint {
  added: Date;
  value: number;
}

export interface IStudent {
  name: string;
  data: IDataPoint[];
}

export interface IState {
  students: IStudent[];
  addingStudent: boolean;
}

function generateFakeData() {
  return Array(10)
    .fill(null)
    .map((_, i) => ({
      added: subDays(addDays(new Date(), 4), 10 - i),
      value: Math.round(-2 + Math.random() * 4)
    }))
    .filter(({ added }) => getDay(added) < 6);
}

function generateFakeStudents() {
  const names = ["John", "Paul", "Mikko"];
  return names.map(name => ({ name, data: generateFakeData() }));
}

const LOCALSTORAGE_KEY = "app_data";
const storedState = window.localStorage.getItem(LOCALSTORAGE_KEY);

const initialState: IState = {
  students: generateFakeStudents(),
  addingStudent: false,
  ...(storedState ? JSON.parse(storedState) : {})
};

interface IToggleStudentEditorAction {
  type: "TOGGLE_STUDENT_EDITOR";
}

export function toggleStudentEditor() {
  return {
    type: "TOGGLE_STUDENT_EDITOR"
  };
}

interface IAddStudentAction {
  type: "ADD_STUDENT";
  payload: { student: IStudent };
}

export function addStudent(student: IStudent) {
  return {
    type: "ADD_STUDENT",
    payload: { student }
  };
}

interface IStoreEmotionAction {
  type: "STORE_EMOTION";
  payload: { value: number; name: string };
}

export function storeEmotion(name: string, value: number) {
  return {
    type: "ADD_STUDENT",
    payload: { value, name }
  };
}

type Action =
  | IToggleStudentEditorAction
  | IAddStudentAction
  | IStoreEmotionAction;

function reducer(state: IState = initialState, action: Action): IState {
  switch (action.type) {
    case "TOGGLE_STUDENT_EDITOR": {
      return {
        ...state,
        addingStudent: !state.addingStudent
      };
    }
    case "ADD_STUDENT": {
      const newStudent = { ...action.payload.student, data: [] };
      return {
        ...state,
        students: state.students.concat(newStudent),
        addingStudent: false
      };
    }
    case "STORE_EMOTION": {
      return {
        ...state,
        students: state.students.map((student: IStudent) => {
          if (student.name !== action.payload.name) {
            return student;
          }
          return {
            ...student,
            data: student.data.concat({
              added: new Date(),
              value: action.payload.value
            })
          };
        }),
        addingStudent: false
      };
    }
    default: {
      return state;
    }
  }
}
export const store = createStore(reducer);
