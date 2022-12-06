import React, { useState } from 'react';
import styled from 'styled-components';
import TextInput from './TextInput';
import TitleInput from './TitleInput';
import Button from './Button';
import {
  partTypes,
  Project,
  ProjectImages,
  SelectionPart,
} from '../constants/constants';
import PartsList, { Part } from './PartsList';
import Saving from './Saving';
import { updateProject } from '../pages/project/fetch';

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
  position: relative;
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

const AddPartsContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 8px;
`;

type ProjectEditorProps = {
  project: Project;
  selectionParts: SelectionPart[];
  images: ProjectImages[];
  children?: React.ReactNode;
  addPart: (partType: partTypes) => void;
};

const ProjectEditor = ({
  images,
  project,
  addPart,
  selectionParts,
}: ProjectEditorProps) => {
  const [open, setOpen] = useState<boolean>(true);
  const [textInput, setTextInput] = useState('');
  const [projectNameInput, setProjectNameInput] = useState(project.name);
  const [selected, setSelected] = useState<string>('');

  const onClickUpload = () => {
    console.log('upload');
  };

  const onUpdateProjectName = async (newName: string) => {
    if (newName !== project.name) {
      const updated = await updateProject({
        id: project._id,
        name: newName,
        nftAllowed: project.nftAllowed,
      });
      setProjectNameInput(updated.name);
    }
  };

  const getParts = (): Part[] => {
    const _selectionParts = selectionParts.map((part) => {
      return {
        id: part._id,
        title: part.name,
        type: partTypes.Selection,
        items: part.options,
      };
    });
    const imageParts = project.imageParts.map((part) => {
      const _images = images
        .filter((image) => part.images.includes(image._id))
        .map((image) => image._id);

      return {
        id: part._id,
        title: part.name,
        type: partTypes.Image,
        items: _images,
      };
    });
    const descriptionParts = project.descriptionParts.map((part) => {
      return {
        id: part._id,
        title: part.name,
        type: partTypes.Description,
        items: [],
      };
    });
    return [..._selectionParts, ...imageParts, ...descriptionParts];
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
              onBlur={() => onUpdateProjectName(projectNameInput)}
            ></TitleInput>
            <PartsList
              parts={getParts()}
              selected={selected}
              setSelected={setSelected}
            />
            <AddPartsContainer>
              <Button
                icon='fa-solid fa-image'
                onClick={() => addPart(partTypes.Image)}
              ></Button>
              <Button
                icon='fa-solid fa-list'
                onClick={() => addPart(partTypes.Selection)}
              ></Button>
              <Button
                icon='fa-solid fa-font'
                onClick={() => addPart(partTypes.Description)}
              ></Button>
            </AddPartsContainer>
          </ItemList>
          <Saving isSaving />
        </EditArea>
      )}
    </Container>
  );
};

export default ProjectEditor;
