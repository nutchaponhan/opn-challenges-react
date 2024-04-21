import React from 'react';
import styled from 'styled-components';

import { Button } from '../base';

const TamboonContentSide = ({
  image,
  name,
  currency,
  total,
  onDonate,
  onClick,
}) => {
  return (
    <TamboonContentLayout isDonate={onDonate}>
      <BackgroundImage src={image} />
      <ActionBar>
        <div>
          <p>{name}</p>
          <p>{`Total donate: (${total} ${currency})`}</p>
        </div>
        <Button onClick={onClick}>Donate</Button>
      </ActionBar>
    </TamboonContentLayout>
  );
};

export default TamboonContentSide;

const TamboonContentLayout = styled.div`
  opacity: ${(props) => (props.isDonate ? 0.075 : 1)};

  font-weight: bold;
  letter-spacing: 1px;
`;

const BackgroundImage = styled.div`
  background-image: ${(props) => `url(${props.src})`};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 100%;
  height: 300px;
`;

const ActionBar = styled.div`
  display: flex;
  padding: 24px;
  justify-content: space-between;
`;
