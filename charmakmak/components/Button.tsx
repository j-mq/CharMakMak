import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  border: none;
  padding: 8px;
  cursor: pointer;
  width: 40px;
  height: 40px;
  background: ${(props) => props.theme.backgroundLight};
  transition: all 150ms ease-in-out;

  i {
    font-size: 20px;
  }

  :focus {
    border: ${(props) => props.theme.inputBorderActive};
    outline: none;
  }

  :hover {
    background: ${(props) => props.theme.inputMenuHover};
  }

  :active {
    background: ${(props) => props.theme.inputSelectedColor};
    transform: scale(0.9);
  }
`;

type ButtonProps = {
  icon: string;
  onClick: () => void;
};

const Button = ({ icon, onClick }: ButtonProps) => {
  return (
    <StyledButton onClick={onClick}>
      <i className={icon}></i>
    </StyledButton>
  );
};

export default Button;
