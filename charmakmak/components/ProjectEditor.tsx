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
  width: ${(props) => (props.isOpen ? '427px' : '30px')};
  transition: width 0.2s ease-in-out;
`;

type ProjectEditorProps = {
  children?: React.ReactNode;
};

const ProjectEditor = ({ children }: ProjectEditorProps) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Container isOpen={open}>
      <button onClick={() => setOpen(!open)}>Open/Close</button>
    </Container>
  );
};

export default ProjectEditor;
