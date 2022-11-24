import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
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
  text-align: right;
`;

const TextArea = styled.textarea`
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
  transition: all 150ms ease-in-out;

  :focus {
    border: ${(props) => props.theme.inputBorderActive};
    outline: none;
  }
`;

const Input = styled.input`
  display: flex;
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
  resize: none;
  transition: all 150ms ease-in-out;

  :focus {
    border: ${(props) => props.theme.inputBorderActive};
    outline: none;
  }
`;

type TextInputProps = {
  label: string;
  type: 'single' | 'multi';
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
  maxCharacters: number;
};

const TextInput = ({
  label,
  value,
  onChange,
  type,
  maxCharacters,
  placeholder,
}: TextInputProps) => {
  const [isFocused, setIsFocused] = useState(false);

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
      {type === 'multi' && (
        <TextArea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          maxLength={maxCharacters}
          placeholder={placeholder}
        />
      )}
      {type === 'single' && (
        <Input
          value={value}
          type='text'
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          maxLength={maxCharacters}
          placeholder={placeholder}
        />
      )}
    </Container>
  );
};

export default TextInput;
