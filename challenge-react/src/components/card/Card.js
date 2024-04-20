import React from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div`
  margin: 10px;
  border: 1px solid #ccc;
`;

const Card = ({ children, ...props }) => {
  return <StyledDiv {...props}>{children}</StyledDiv>;
};

export default Card;
