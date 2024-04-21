import React from 'react';
import styled from 'styled-components';

import { Button } from '../base';

const TamboonDonateSide = ({
  selected,
  choice = [],
  onDonate,
  onSubmit,
  onSelect,
  onClose,
}) => {
  return (
    <TamboonDonateLayout isDonate={onDonate}>
      <DonateSide>
        <span>Select the amount to donate (USD)</span>
        <DonateChoiceSection>
          {choice.map((amount) => (
            <ChoiceContainer key={amount}>
              <input
                type="radio"
                name="payment"
                className="choice"
                checked={amount === selected}
                onChange={() => onSelect(amount)}
              />
              <label>{amount}</label>
            </ChoiceContainer>
          ))}
        </DonateChoiceSection>
        <Button onClick={onSubmit}>Pay</Button>
        <IconX onClick={onClose}>X</IconX>
      </DonateSide>
    </TamboonDonateLayout>
  );
};

export default TamboonDonateSide;

const TamboonDonateLayout = styled.div`
  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  display: ${(props) => !props.isDonate && 'none'};

  font-weight: bold;
  letter-spacing: 1px;
`;

const DonateSide = styled.div`
  position: relative;

  display: flex;

  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: inherit;
  gap: 12px;
`;

const DonateChoiceSection = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 12px;
`;

const ChoiceContainer = styled.div`
  input {
    margin-right: 4px;

    &:hover {
      cursor: pointer;
    }
  }
`;

const IconX = styled.span`
  position: absolute;
  top: 24px;
  right: 24px;

  &:hover {
    cursor: pointer;
  }
`;
