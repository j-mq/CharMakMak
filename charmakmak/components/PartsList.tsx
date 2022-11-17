import React, { Fragment, useRef, useState } from 'react';
import styled from 'styled-components';
import { partTypes } from '../constants/constants';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const TopPart = styled.div`
  display: flex;
  height: 8px;
  width: 100%;
  background: transparent;
`;

type PartProps = {
  selected: boolean;
  draggingOver: boolean;
};

const Part = styled.button<PartProps>`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 20px;
  padding: 8px 0px 8px 8px;
  border-radius: 4px;
  border: none;
  cursor: ${(props) => (props.selected ? 'default' : 'pointer')};
  width: calc(100% - 5px);
  height: 40px;
  color: ${(props) =>
    props.selected ? props.theme.labelColor : props.theme.notSelected};
  background: ${(props) =>
    props.selected
      ? props.theme.inputSelectedColor
      : props.theme.editorBackground};
  transition: transform 150ms ease-in-out;
  position: relative;

  :focus {
    border-left: ${(props) => props.theme.inputBorderActive};
    border-top: ${(props) => props.theme.inputBorderActive};
    border-bottom: ${(props) => props.theme.inputBorderActive};
    padding: 6px 0px 6px 6px;
    outline: none;
  }

  :hover {
    background: ${(props) =>
      props.selected ? '' : props.theme.inputMenuHover};
    color: ${(props) => props.theme.labelColor};
  }

  :active {
    background: ${(props) => props.theme.inputSelectedColor};
    transform: ${(props) => (props.selected ? '' : 'scale(0.95)')};
    color: ${(props) => props.theme.labelColor};
  }
`;

const PartTitle = styled.span`
  font-weight: 700;
`;

const PartItemsCount = styled.span`
  font-style: italic;
`;

const Handle = styled.div`
  position: absolute;
  right: -5px;
  background: ${(props) => props.theme.backgroundLight};
  padding: 8px;
  border-radius: 0px 4px 4px 0px;
  height: 40px;
  width: 40px;
  cursor: grab;
`;

const GhostIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  padding: 4px;
  z-index: -100;
  background: black;

  color: ${(props) => props.theme.labelColor};
  background: ${(props) => props.theme.editorBackground};

  i {
    color: ${(props) => props.theme.labelColor};
    font-size: 20px;
  }
`;

const DraggingOn = styled.div`
  width: 100%;
  height: 2px;
  background: ${(props) => props.theme.labelColor};
  margin-top: -10px;
  z-index: 5;
`;

export type Part = {
  id: string;
  title: string;
  type: partTypes;
  items: string[];
};

type PartsListProps = {
  parts: Part[];
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
};

const PartsList = ({ parts, selected, setSelected }: PartsListProps) => {
  const [draggingOverId, setDraggingOverId] = useState<string>('');
  const [draggedIcon, setDraggedIcon] = useState('');

  const dragGhostRef = useRef<HTMLDivElement | null>(null);

  const getTypeIcon = (type: partTypes) => {
    switch (type) {
      case partTypes.Image:
        return 'image';
      case partTypes.Selection:
        return 'list';
      case partTypes.Description:
        return 'font';
      default:
        return 'image';
    }
  };

  const onDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    id: string,
    type: partTypes
  ) => {
    console.log('the e', e.target);

    e.dataTransfer.dropEffect = 'move';
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('itemID', id);
    setDraggedIcon(getTypeIcon(type));

    if (dragGhostRef.current) {
      e.dataTransfer.setDragImage(dragGhostRef.current, 0, 15);
    }
  };

  const onDragOver = (e: React.DragEvent<HTMLElement>, id: string) => {
    e.preventDefault();
    if (id !== draggingOverId) {
      setDraggingOverId(id);
    }
  };

  const onDrop = (e: React.DragEvent<HTMLElement>, id: string) => {
    e.preventDefault();
    const itemID = e.dataTransfer.getData('itemID');
    setDraggingOverId('');
    console.log('dragged itemID', itemID);
    console.log('on top of id', id);
  };

  const makeParts = () => {
    return parts.map((part) => {
      return (
        <Fragment key={`container-${part.id}`}>
          <Part
            key={part.id}
            onClick={() => setSelected(part.id)}
            selected={part.id === selected}
            draggingOver={part.id === draggingOverId}
            onDragOver={(e) => onDragOver(e, part.id)}
            onDragLeave={() => setDraggingOverId('')}
            onDrop={(e) => onDrop(e, part.id)}
          >
            <i className={`fas fa-${getTypeIcon(part.type)}`}></i>
            <PartTitle>{part.title}</PartTitle>
            <PartItemsCount>{part.items.length} Items</PartItemsCount>
            <Handle
              draggable
              onDragStart={(e) => onDragStart(e, part.id, part.type)}
            >
              <i className={`fas fa-grip`}></i>
            </Handle>
          </Part>
          {part.id === draggingOverId && <DraggingOn />}
        </Fragment>
      );
    });
  };

  return (
    <Container>
      <TopPart
        onDragOver={(e) => onDragOver(e, 'top-part')}
        onDragLeave={() => setDraggingOverId('')}
        onDrop={(e) => onDrop(e, 'top-part')}
      />
      {draggingOverId === 'top-part' && <DraggingOn />}
      {makeParts()}
      <GhostIcon ref={dragGhostRef}>
        <i className={`fas fa-${draggedIcon}`} />
      </GhostIcon>
    </Container>
  );
};

export default PartsList;
