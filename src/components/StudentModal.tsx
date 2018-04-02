import * as React from "react";
import * as Modal from "react-modal";
import Form from "react-jsonschema-form";
import * as Icons from "react-icons/lib/io";
import styled, { injectGlobal } from "styled-components";
import { StateContext } from "../State";

function ReactModalAdapter({ className, modalClassName, ...props }: any) {
  return (
    <Modal className={modalClassName} portalClassName={className} {...props} />
  );
}
const Close = styled.div`
  background: #fff;
  display: inline-block;
  border-radius: 100%;
  padding: 10px;
  position: absolute;
  right: 30px;
  top: 45px;
  cursor: pointer;
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.025);
`;
const MyModal = styled(ReactModalAdapter).attrs<{
  ariaHideApp: boolean;
  isOpen: boolean;
}>({
  overlayClassName: "Overlay",
  modalClassName: "Modal"
})`
  color: #1800ff;
  .Modal {
    width: 60%;
    height: 100%;
    background: #feeae0;
    padding: 20px;
  }
  .Overlay {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: flex-end;
  }
`;

// tslint:disable-next-line no-unused-expression
injectGlobal`
  .form-group {
    fieldset {
      border: 0;
      padding: 0;
      padding-top: 2em;
      margin-top: 1em;
    }
    input {
      border: 0;
      height: 40px;
      width: 300px;
      border-radius: 10px;
      box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.025);
      color: inherit;
      padding: 0 0.5em;
      font: inherit
    }
    label {
      font-weight: 600;
      font-size: 20px;
      margin-bottom: 7px;
      display: block;
    }
  }
  .form-group legend {
    font-size: 60px;
    font-weight: 600;
    font-family: 'Sacramento', cursive;
  }
  .btn {
    border: 0;
    background: #fff;
    color: inherit;
    font: inherit;
    text-transform: uppercase;
    border-radius: 10px;
    font-weight: 600;
    padding: 1em 2em;
    box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.025);
    font: inherit
  }
`;

export function StudentModal() {
  return (
    <StateContext.Consumer>
      {({ state, actions }) => (
        <MyModal ariaHideApp={false} isOpen={state.addingStudent}>
          <Close onClick={actions.toggleStudentEditor}>
            <Icons.IoClose size={40} />
          </Close>
          <Form
            onSubmit={({ formData }) => actions.addStudent(formData)}
            schema={{
              title: "Uusi oppilas",
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
        </MyModal>
      )}
    </StateContext.Consumer>
  );
}
