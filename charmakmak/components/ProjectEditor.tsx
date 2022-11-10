import React, { useState } from 'react';
import styled from 'styled-components';
import TextInput from './TextInput';
import TitleInput from './TitleInput';
import Button from './Button';

type ContainerProps = {
  isOpen: boolean;
};

const Container = styled.div<ContainerProps>`
  grid-area: editor;
  padding: 0px;
  background: ${(props) => props.theme.backgroundDark};
  display: flex;
  width: ${(props) => (props.isOpen ? '427px' : '16px')};
  transition: width 200ms ease-in-out;
`;

const EditArea = styled.div`
  width: 100%;
  width: calc(100% - 16px);
  display: flex;
  flex-direction: column;
  padding: 16px;
  gap: 16px;
`;

const ItemEditor = styled.div`
  display: flex;
  height: 224px;
  background: ${(props) => props.theme.backgroundLight};
  border-radius: 4px;
`;

const ContentList = styled.div`
  display: flex;
  flex-direction: column;
  width: 66%;
  padding: 16px;
  gap: 8px;
  background: ${(props) => props.theme.editorBackground};
  border-radius: 4px 0px 0px 4px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 66%;
`;

const OpenButton = styled.button`
  height: 100%;
  width: 16px;
  flex-shrink: 0;
  padding: 0px;
  border: none;
  background: ${(props) => props.theme.backgroundLighter};
  cursor: pointer;
  i {
    font-size: 16px;
  }
  transition: all 150ms ease-in-out;

  :focus {
    border: ${(props) => props.theme.inputBorderActive};
    outline: none;
  }

  :hover {
    background: ${(props) => props.theme.inputMenuHover};
  }

  :active {
    background: ${(props) => props.theme.inputSelectedColor};
  }
`;

const ItemList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

type ProjectEditorProps = {
  children?: React.ReactNode;
};

const ProjectEditor = ({ children }: ProjectEditorProps) => {
  const [open, setOpen] = useState<boolean>(true);
  const [textInput, setTextInput] = useState('');
  const [projectNameInput, setProjectNameInput] = useState('');

  const onClickUpload = () => {
    console.log('upload');
  };

  return (
    <Container isOpen={open}>
      <OpenButton onClick={() => setOpen(!open)}>
        <i className={`fa-solid fa-caret-${open ? 'right' : 'left'}`}></i>
      </OpenButton>
      {open && (
        <EditArea>
          <ItemEditor>
            <ContentList>
              <TextInput
                value={textInput}
                onChange={(value) => setTextInput(value)}
                label='Item Input Text Item Input TextItem Input TextItem Input TextItem Input TextItem Input TextItem Input TextItem Input Text'
                type='single'
                placeholder='please select'
                maxCharacters={15}
              />
              <TextInput
                value={textInput}
                onChange={(value) => setTextInput(value)}
                label='Item Input Text Item Input TextItem Input TextItem Input TextItem Input TextItem Input TextItem Input TextItem Input Text'
                type='single'
                placeholder='please select'
                maxCharacters={15}
              />
              <Button
                icon='fa-solid fa-arrow-up-from-bracket'
                onClick={onClickUpload}
              ></Button>
            </ContentList>
            <Content></Content>
          </ItemEditor>
          <ItemList>
            <TitleInput
              value={projectNameInput}
              onChange={(value) => setProjectNameInput(value)}
              maxCharacters={100}
              placeholder='Project Name'
            ></TitleInput>
            <div>Options</div>
            <div>Add Options</div>
          </ItemList>
        </EditArea>
      )}
    </Container>
  );
};

export default ProjectEditor;
