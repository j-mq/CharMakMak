import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: relative;
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
  cursor: pointer;
  i {
    font-size: 8px;
  }

  :focus {
    border: ${(props) => props.theme.inputBorderActive};
  }
`;

const InputLabel = styled.span`
  display: flex;
  align-items: center;
  gap: 4px;
  i {
    font-size: 16px;
  }
`;

const Menu = styled.ul`
  top: 32px;
  left: 0px;
  position: absolute;
  z-index: 100;
  width: 100%;
  max-height: 200px;
  padding: 0px;
  margin: 0;
  list-style: none;
  background-color: white;
  border-radius: 4px;
  box-shadow: ${(props) => props.theme.dropShadow};
  background: ${(props) => props.theme.inputMenuBackground};
  font-size: 14px;
`;

const MenuItem = styled.li`
  padding: 8px;
  cursor: pointer;
  color: black;
`;

export type ItemSelectionData = {
  label: string;
  value: string;
  imageUrl?: string;
}[];

type ItemSelectionProps = {
  data: ItemSelectionData;
  type: 'selection' | 'image';
  value?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
};

const ItemSelection = ({
  data,
  type,
  value,
  onChange,
  placeholder,
}: ItemSelectionProps) => {
  const [selectedValue, setSelectedValue] = React.useState(value);
  const [showMenu, setShowMenu] = React.useState(false);

  const onClickItemSelectionOutside = React.useCallback(() => {
    setShowMenu(false);
  }, []);

  React.useEffect(() => {
    setTimeout(() => {
      if (showMenu) {
        window.addEventListener('click', onClickItemSelectionOutside);
      } else {
        window.removeEventListener('click', onClickItemSelectionOutside);
      }
    }, 100);
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
        aria-hidden
      >
        {item.label}
      </MenuItem>
    ));

  return (
    <Container>
      <Input type='button' onClick={onClickItemSelectionButton}>
        <InputLabel>
          {getTypeIcon()}
          {getSelectedLabel()}
        </InputLabel>
        <i className='fa-solid fa-chevron-down'></i>
      </Input>
      {showMenu && <Menu>{createMenuList()}</Menu>}
    </Container>
  );
};

export default ItemSelection;
