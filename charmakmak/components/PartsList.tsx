import React from 'react';
import styled from 'styled-components';
import { partTypes } from '../constants/constants';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

type PartProps = {
  selected: boolean;
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

  const makeParts = () => {
    return parts.map((part) => {
      return (
        <Part
          key={part.id}
          onClick={() => setSelected(part.id)}
          selected={part.id === selected}
        >
          <i className={`fas fa-${getTypeIcon(part.type)}`}></i>
          <PartTitle>{part.title}</PartTitle>
          <PartItemsCount>{part.items.length} Items</PartItemsCount>
          <Handle>
            <i className={`fas fa-grip`}></i>
          </Handle>
        </Part>
      );
    });
  };

  return <Container>{makeParts()}</Container>;
};

export default PartsList;
