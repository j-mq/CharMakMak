import Image from 'next/image';
import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Label = styled.div`
  color: ${(props) => props.theme.labelColor};
  font-size: 12px;
  font-weight: 700;
  margin-bottom: 4px;
  height: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 75%;
`;

const Input = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 32px;
  padding: 8px;
  text-align: left;
  background: ${(props) => props.theme.inputBackground};
  border: ${(props) => props.theme.inputBorder};
  color: ${(props) => props.theme.inputTextColor};
  padding: 6px 8px;
  border-radius: 4px;
  font-size: 14px;
  text-align: right;
  cursor: pointer;
  transition: all 150ms ease-in-out;

  i {
    font-size: 8px;
  }

  :focus {
    border: ${(props) => props.theme.inputBorderActive};
    outline: none;
  }
`;

const InputLabel = styled.span`
  display: flex;
  align-items: center;
  gap: 4px;
  width: calc(100% - 8px);
  i {
    font-size: 16px;
  }
`;

const InputLabelText = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Menu = styled.ul`
  top: 50px;
  left: 0px;
  position: absolute;
  z-index: 100;
  width: 100%;
  max-height: 200px;
  overflow-y: auto;
  padding: 0px;
  margin: 0;
  list-style: none;
  background-color: white;
  border-radius: 4px;
  box-shadow: ${(props) => props.theme.dropShadow};
  background: ${(props) => props.theme.inputMenuBackground};
  font-size: 14px;
  transition: all 150ms ease-in-out;
`;

type MenuItemProps = {
  isSelected: boolean;
};

const MenuItem = styled.li<MenuItemProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px;
  cursor: pointer;
  color: ${(props) =>
    props.isSelected
      ? props.theme.inputSelectedColor
      : props.theme.inputTextColor};
  font-weight: ${(props) => (props.isSelected ? 'bold' : 'normal')};

  :first-child {
    border-radius: 4px 4px 0px 0px;
  }

  :last-child {
    border-radius: 0px 0px 4px 4px;
  }

  :hover {
    background: ${(props) => props.theme.inputMenuHover};
  }
`;

const MenuItemLabel = styled.span`
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const MenuItemImage = styled.span<MenuItemProps>`
  border: ${(props) =>
    props.isSelected ? '2px solid ' + props.theme.inputSelectedColor : 'none'};
`;

export type ItemSelectionData = {
  label: string;
  value: string;
  imageUrl?: string;
}[];

type ItemSelectionProps = {
  label: string;
  data: ItemSelectionData;
  type: 'selection' | 'image';
  value?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
};

const ItemSelection = ({
  label,
  data,
  type,
  value,
  onChange,
  placeholder,
}: ItemSelectionProps) => {
  const [selectedValue, setSelectedValue] = useState(value);
  const [showMenu, setShowMenu] = useState(false);

  const onClickItemSelectionOutside = useCallback(() => {
    setShowMenu(false);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (showMenu) {
        window.addEventListener('click', onClickItemSelectionOutside);
      } else {
        window.removeEventListener('click', onClickItemSelectionOutside);
      }
    }, 1);
  }, [showMenu, onClickItemSelectionOutside]);

  const onClickMenuItem = (itemValue: string) => {
    setShowMenu(false);
    setSelectedValue(itemValue);
    if (onChange) {
      onChange(itemValue);
    }
  };

  const onClickItemSelectionButton = () => {
    setShowMenu(true);
  };

  const getSelectedLabel = () => {
    const selectedItem = data.find((item) => item.value === selectedValue);

    return selectedItem ? selectedItem.label : placeholder;
  };

  const getTypeIcon = () => {
    switch (type) {
      case 'selection':
        return <i className='fas fa-list'></i>;
      case 'image':
        return <i className='fas fa-image'></i>;
      default:
        return null;
    }
  };

  const createMenuList = () =>
    data.map((item) => (
      <MenuItem
        key={`item-${item.value}`}
        onClick={() => onClickMenuItem(item.value)}
        isSelected={item.value === selectedValue}
        aria-hidden
      >
        <MenuItemLabel>{item.label}</MenuItemLabel>
        {item.imageUrl && (
          <MenuItemImage isSelected={item.value === selectedValue}>
            <Image
              src={item.imageUrl}
              alt={`selection-image-${item.label}`}
              width={50}
              height={50}
            ></Image>
          </MenuItemImage>
        )}
      </MenuItem>
    ));

  return (
    <Container>
      <Label>{label}</Label>
      <Input type='button' onClick={onClickItemSelectionButton}>
        <InputLabel>
          {getTypeIcon()}
          <InputLabelText>{getSelectedLabel()}</InputLabelText>
        </InputLabel>
        <i className='fa-solid fa-chevron-down'></i>
      </Input>
      {showMenu && <Menu>{createMenuList()}</Menu>}
    </Container>
  );
};

export default ItemSelection;
