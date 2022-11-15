import React from 'react';
import styled, { css, keyframes } from 'styled-components';

const confirmAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const animationRule = css`
  ${confirmAnimation} 2s linear infinite;
`;

const SavingContainer = styled.div`
  position: absolute;
  bottom: 0px;
  right: 0px;
  font-style: italic;
  align-self: flex-end;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  color: ${(props) => props.theme.labelText};
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
  gap: 8px;

  i {
    font-size: 20px;
    animation: ${animationRule};
  }
`;

type SavingProps = {
  isSaving: boolean;
};

const Saving = ({ isSaving }: SavingProps) => {
  return (
    <>
      {isSaving && (
        <SavingContainer>
          <i className='fa-solid fa-spinner'></i>
          Saving...
        </SavingContainer>
      )}
    </>
  );
};

export default Saving;
