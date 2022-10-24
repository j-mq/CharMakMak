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
  display: flex;
  border-radius: 4px;
`;

const ImageArea = styled.div`
  width: 100%;
  height: 100%;
`;

const SelectionArea = styled.div`
  width: 252px;
  height: 100%;
  border-radius: 0px 4px 4px 0px;
  background: ${(props) => props.theme.selectionArea};
  flex-shrink: 0;
  overflow-y: auto;
`;

type ProjectDisplayProps = {
  children?: React.ReactNode;
};

const ProjectDisplay = ({ children }: ProjectDisplayProps) => {
  return (
    <Container>
      <Canvas>
        <ImageArea></ImageArea>
        <SelectionArea>{children}</SelectionArea>
      </Canvas>
    </Container>
  );
};

export default ProjectDisplay;
