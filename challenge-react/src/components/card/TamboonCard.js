import React, { useState } from 'react';
import styled from 'styled-components';

import Card from './Card';

const StyledImage = styled.img`
  width: 100%;
  height: 250px;
`;

const ActionBarLayout = styled.div`
  display: flex;
  padding: 10px;
  justify-content: space-between;
`;

const TamboonCharityImage = ({ src, alt }) => {
  return <StyledImage src={src} alt={alt} />;
};

const TamboonActionBar = ({ name, onClick }) => {
  return (
    <ActionBarLayout>
      <span>{name}</span>
      <button onClick={onClick}>Donate</button>
    </ActionBarLayout>
  );
};

const TamboonCard = ({
  payments,
  item,
  selectedAmount,
  handlePay,
  handleSelect,
}) => {
  const [onDonate, setOnDonate] = useState(false);
  const imgPath = `/images/${item.image}`;

  const paymentChoice = payments.map((amount, j) => (
    <label key={j}>
      <input type="radio" name="payment" onClick={() => handleSelect(amount)} />
      {amount}
    </label>
  ));

  return (
    <Card>
      <div>
        <TamboonCharityImage src={imgPath} alt={item.name} />
        <TamboonActionBar name={item.name} onClick={() => setOnDonate(true)} />
      </div>
    </Card>
  );
};

export default TamboonCard;
