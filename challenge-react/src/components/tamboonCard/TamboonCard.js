import React, { useState } from 'react';

import { Card } from '../base';
import TamboonContentSide from './TamboonContentSide';
import TamboonDonateSide from './TamboonDonateSide';
import styled from 'styled-components';

const TamboonCard = ({ payments, item, total, handlePay }) => {
  const [onDonate, setOnDonate] = useState(false);
  const [selectAmount, setSelectAmount] = useState(null);

  const toggle = () => {
    setOnDonate(!onDonate);
  };

  const resetSelectAmount = () => {
    setSelectAmount(null);
  };

  const onDonateSubmit = () => {
    handlePay(item, selectAmount);
    resetSelectAmount();
    toggle();
  };

  const onDonateChoiceSelect = (amount) => {
    setSelectAmount(amount);
  };

  const onDonateClose = () => {
    resetSelectAmount();
    toggle();
  };

  const { name, image, currency } = item;

  const imgPublicSrcPath = `/images/${image}`;

  return (
    <CardCenterLayout>
      <Card style={{ maxWidth: 500, flex: 1 }}>
        <TamboonContentSide
          image={imgPublicSrcPath}
          name={name}
          currency={currency}
          total={total}
          onDonate={onDonate}
          onClick={toggle}
        />
        <TamboonDonateSide
          selected={selectAmount}
          choice={payments}
          onDonate={onDonate}
          onSubmit={onDonateSubmit}
          onSelect={onDonateChoiceSelect}
          onClose={onDonateClose}
        />
      </Card>
    </CardCenterLayout>
  );
};

export default TamboonCard;

const CardCenterLayout = styled.div`
  display: flex;
  justify-content: center;
`;
