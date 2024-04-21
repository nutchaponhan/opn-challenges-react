import React, { useState } from 'react';
import styled from 'styled-components';

import Card from './Card';

const TamboonCard = ({ payments, item, total, handlePay }) => {
  const [onDonate, setOnDonate] = useState(false);
  const [selectAmount, setSelectAmount] = useState(null);

  const imgPath = `/images/${item.image}`;

  const toggle = () => {
    setOnDonate(!onDonate);
  };

  const onDonateSubmit = () => {
    toggle();
    handlePay(item, selectAmount);
    setSelectAmount(null);
  };

  const onDonateChoiceSelect = (amount) => {
    setSelectAmount(amount);
  };

  const onDonateClose = () => {
    setSelectAmount(null);
    toggle();
  };

  return (
    <Card>
      <TamboonContentSide isDonate={onDonate}>
        <TamboonCharityImage src={imgPath} alt={item.name} />
        <TamboonActionBar
          name={item.name}
          currency={item.currency}
          total={total}
          onClick={toggle}
        />
      </TamboonContentSide>
      <TamboonDonateSide
        selected={selectAmount}
        choice={payments}
        onDonate={onDonate}
        onSubmit={onDonateSubmit}
        onSelect={onDonateChoiceSelect}
        onClose={onDonateClose}
      />
    </Card>
  );
};

export default TamboonCard;

const TamboonContentSide = styled.div`
  opacity: ${(props) => (props.isDonate ? 0.1 : 1)};
`;

const DonateLayout = styled.div`
  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  display: ${(props) => !props.isDonate && 'none'};
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

const XIcon = styled.span`
  position: absolute;
  top: 24px;
  right: 24px;

  &:hover {
    cursor: pointer;
  }
`;

const TamboonDonateSide = ({
  selected,
  choice = [],
  onDonate,
  onSubmit,
  onSelect,
  onClose,
}) => {
  const paymentChoice = choice.map((amount, j) => (
    <label key={j}>
      <input
        type="radio"
        name="payment"
        checked={amount === selected}
        onChange={() => onSelect(amount)}
      />
      {amount}
    </label>
  ));

  return (
    <DonateLayout isDonate={onDonate}>
      <DonateSide>
        <span>Select the amount to donate (USD)</span>
        <DonateChoiceSection>{paymentChoice}</DonateChoiceSection>
        <button onClick={onSubmit}>Pay</button>
        <XIcon onClick={onClose}>X</XIcon>
      </DonateSide>
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

const TamboonActionBar = ({ name, currency, total, onClick }) => {
  return (
    <ActionBarLayout>
      <span>{`${name} (${total} ${currency})`}</span>
      <ActionBarButton onClick={onClick}>Donate</ActionBarButton>
    </ActionBarLayout>
  );
};
