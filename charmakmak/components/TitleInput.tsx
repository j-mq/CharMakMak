import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  display: flex;
  width: 100%;
  height: fit-content;
  padding: 0px;
  text-align: left;
  background: transparent;
  border: none;
  color: ${(props) => props.theme.labelColor};
  font-size: 20px;
  resize: none;
  transition: all 150ms ease-in-out;

  :focus {
    color: ${(props) => props.theme.inputSelectedColor};
    outline: none;
  }
`;

type TextInputProps = {
  maxCharacters: number;
  placeholder: string;
  value: string;
  onBlur: () => void;
  onChange: (value: string) => void;
};

const TextInput = ({
  maxCharacters,
  placeholder,
  value,
  onBlur,
  onChange,
}: TextInputProps) => {
  return (
    <Container>
      <Input
        value={value}
        type='text'
        onChange={(e) => onChange(e.target.value)}
        maxLength={maxCharacters}
        placeholder={placeholder}
        onBlur={onBlur}
      />
    </Container>
  );
};

export default TextInput;
