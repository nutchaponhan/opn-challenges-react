import React from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div`
  margin: 10px;
  border: 1px solid #ccc;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 2px 4px, rgba(0, 0, 0, 0.1) 0px 2px 4px;
  position: relative;
`;

const Card = ({ children, ...props }) => {
  return <StyledDiv {...props}>{children}</StyledDiv>;
};

export default Card;
