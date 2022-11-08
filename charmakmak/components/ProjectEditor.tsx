import React, { useState } from 'react';
import styled from 'styled-components';

type ContainerProps = {
  isOpen: boolean;
};

const Container = styled.div<ContainerProps>`
  grid-area: editor;
  padding: 0px;
  background: ${(props) => props.theme.backgroundDark};
  display: flex;
  width: ${(props) => (props.isOpen ? '427px' : '16px')};
  transition: width 0.2s ease-in-out;
  position: relative;
`;

const EditArea = styled.div`
  width: 100%;
  padding: 16px;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const OpenButton = styled.button`
  height: 100%;
  width: 16px;
  padding: 0px;
  border: none;
  background: ${(props) => props.theme.backgroundLighter};
  cursor: pointer;

  i {
    font-size: 16px;
  }
`;

type ProjectEditorProps = {
  children?: React.ReactNode;
};

const ProjectEditor = ({ children }: ProjectEditorProps) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Container isOpen={open}>
      <OpenButton onClick={() => setOpen(!open)}>
        <i className={`fa-solid fa-caret-${open ? 'right' : 'left'}`}></i>
      </OpenButton>
      {open && (
        <EditArea>
          <div>Window: </div>
          <div>Project Name: Editable</div>
          <div>Options</div>
          <div>Add Options</div>
        </EditArea>
      )}
    </Container>
  );
};

export default ProjectEditor;
