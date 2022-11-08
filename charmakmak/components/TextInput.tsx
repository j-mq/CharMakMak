import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: relative;
`;

const Label = styled.div`
  color: ${(props) => props.theme.labelColor};
  font-size: 12px;
  font-weight: 700;
  margin-bottom: 4px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
`;

const LabelText = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 75%;
`;

const LimitWarning = styled.div`
  color: ${(props) => props.theme.inputSelectedColor};
  font-size: 12px;
  font-weight: 700;
  width: 25%;
`;

const Input = styled.textarea`
  display: flex;
  width: 100%;
  height: 96px;
  padding: 8px;
  text-align: left;
  background: ${(props) => props.theme.inputBackground};
  border: ${(props) => props.theme.inputBorder};
  color: ${(props) => props.theme.inputTextColor};
  padding: 6px 8px;
  border-radius: 4px;
  font-size: 14px;
  resize: none;
  i {
    font-size: 8px;
  }

  :focus {
    border: ${(props) => props.theme.inputBorderActive};
    outline: none;
  }
`;

export type TextInputData = {
  label: string;
  value: string;
  imageUrl?: string;
}[];

type TextInputProps = {
  label: string;
  data: TextInputData;
  type: 'selection' | 'image';
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
};

const TextInput = ({ label, value, onChange }: TextInputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const maxCharacters = 500;
  const isLimitWarningVisible = () => {
    const isOneThirdLessThanMax = value.length >= maxCharacters * 0.66;
    return isOneThirdLessThanMax && isFocused;
  };

  return (
    <Container>
      <Label>
        <LabelText>{label}</LabelText>
        {isLimitWarningVisible() && (
          <LimitWarning>
            {value.length}/{maxCharacters}
          </LimitWarning>
        )}
      </Label>
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        maxLength={maxCharacters}
      />
    </Container>
  );
};

export default TextInput;
