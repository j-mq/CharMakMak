import React from 'react';
import styled from 'styled-components';

const Container = styled.main`
  grid-area: content;
  padding: 24px 32px;
  display: flex;
  flex-direction: column;
`;

const Canvas = styled.div`
  background: ${(props) => props.theme.backgroundLighter};
  width: 100%;
  height: 100%;
  border-radius: 4px;
`;

type ProjectDisplayProps = {
  children?: React.ReactNode;
};

const ProjectDisplay = ({ children }: ProjectDisplayProps) => {
  return (
    <Container>
      <Canvas></Canvas>
    </Container>
  );
};

export default ProjectDisplay;
