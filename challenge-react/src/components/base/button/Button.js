import React from 'react';
import styled from 'styled-components';

const ButtonStyled = styled.button`
  background: none repeat scroll 0 0 transparent;
  list-style: none outside none;
  text-decoration: none;

  color: #24a0ed;
  border: 2px solid #24a0ed;
  border-radius: 4px;

  &:hover {
    cursor: pointer;
  }
`;

const Button = (props) => {
  return <ButtonStyled {...props} />;
};

export default Button;
