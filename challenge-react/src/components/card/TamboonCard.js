import React, { useState } from 'react';
import styled from 'styled-components';

import Card from './Card';

const TamboonCard = ({
  payments,
  item,
  selectedAmount,
  handlePay,
  handleSelect,
}) => {
  const [onDonate, setOnDonate] = useState(false);
  const imgPath = `/images/${item.image}`;

  const toggle = () => {
    setOnDonate(!onDonate);
  };

  const onDonateSubmit = () => {
    toggle();
    handlePay();
  };

  const onDonateChoiceSelect = (amount) => {
    handleSelect(amount);
  };

  return (
    <Card>
      <TamboonContent isDonate={onDonate}>
        <TamboonCharityImage src={imgPath} alt={item.name} />
        <TamboonActionBar name={item.name} onClick={toggle} />
      </TamboonContent>
      <TamboonDonate
        choice={payments}
        onDonate={onDonate}
        onSubmit={onDonateSubmit}
        onSelect={onDonateChoiceSelect}
      />
    </Card>
  );
};

export default TamboonCard;

const TamboonContent = styled.div`
  opacity: ${(props) => (props.isDonate ? 0.1 : 1)};
`;

const DonateLayout = styled.div`
  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  letter-spacing: 0.5px;

  display: ${(props) => (props.isDonate ? 'flex' : 'none')};
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
`;

const DonateChoiceSection = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 12px;
`;

const TamboonDonate = ({ onDonate, choice = [], onSubmit, onSelect }) => {
  const paymentChoice = choice.map((amount, j) => (
    <label key={j}>
      <input type="radio" name="payment" onClick={() => onSelect(amount)} />
      {amount}
    </label>
  ));

  return (
    <DonateLayout isDonate={onDonate}>
      <span>Select the amount to donate (USD)</span>
      <DonateChoiceSection>{paymentChoice}</DonateChoiceSection>
      <button onClick={onSubmit}>Pay</button>
    </DonateLayout>
  );
};

const StyledImage = styled.img`
  width: 100%;
  height: 300px;
`;

const TamboonCharityImage = ({ src, alt }) => {
  return <StyledImage src={src} alt={alt} />;
};

const ActionBarLayout = styled.div`
  display: flex;
  padding: 24px;
  justify-content: space-between;
`;

const ActionBarButton = styled.button`
  background: none repeat scroll 0 0 transparent;
  list-style: none outside none;
  text-decoration: none;

  color: #24a0ed;
  border: 2px solid #24a0ed;

  :hover {
    cursor: pointer;
  }
`;

const TamboonActionBar = ({ name, onClick }) => {
  return (
    <ActionBarLayout>
      <span>{name}</span>
      <ActionBarButton onClick={onClick}>Donate</ActionBarButton>
    </ActionBarLayout>
  );
};
