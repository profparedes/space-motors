import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const CardContainer = styled.div`
  background-color: #000;
  padding: 14px;
  border-radius: 10px;
  transition: 300ms;

  h2 {
    color: #f5e423;
  }

  &:hover {
    box-shadow: 0 0 10px #f5e423;
  }
`;

export const LinkTitle = styled(Link)`
  color: #f5e423;

  &:hover {
    color: #f5e423;
  }
`;
