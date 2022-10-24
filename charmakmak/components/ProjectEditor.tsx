import React, { useState } from 'react';
import styled from 'styled-components';

type ContainerProps = {
  isOpen: boolean;
};

const Container = styled.div<ContainerProps>`
  grid-area: editor;
  padding: 16px;
  background: ${(props) => props.theme.backgroundDark};
  display: flex;
  flex-direction: column;
  width: ${(props) => (props.isOpen ? '427px' : '60px')};
  transition: width 0.2s ease-in-out;
`;

const EditArea = styled.div`
  width: 100%;
  height: 224px;
  background: ${(props) => props.theme.backgroundLight};
`;

type ProjectEditorProps = {
  children?: React.ReactNode;
};

const ProjectEditor = ({ children }: ProjectEditorProps) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Container isOpen={open}>
      <button onClick={() => setOpen(!open)}>
        <i className={`fa-solid fa-arrow-${open ? 'right' : 'left'}`}></i>
      </button>
      {open && <EditArea></EditArea>}
    </Container>
  );
};

export default ProjectEditor;
