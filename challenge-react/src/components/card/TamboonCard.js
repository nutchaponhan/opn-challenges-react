import React from 'react';

import Card from './Card';

const TamboonCard = ({
  payments,
  item,
  selectedAmount,
  handlePay,
  handleSelect,
}) => {
  const imgPath = `/images/${item.image}`;

  const paymentChoice = payments.map((amount, j) => (
    <label key={j}>
      <input type="radio" name="payment" onClick={() => handleSelect(amount)} />
      {amount}
    </label>
  ));

  return (
    <Card>
      <img src={imgPath} width={'100%'} />
      <p>{item.name}</p>
      {paymentChoice}
      <button onClick={() => handlePay(item.id, selectedAmount, item.currency)}>
        Pay
      </button>
    </Card>
  );
};

export default TamboonCard;
