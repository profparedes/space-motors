import { memo } from 'react';

import { Container } from 'react-bootstrap';

import spaceMotorsLogo from 'assets/spaceMotorsLogo.png';

import { BgContainer } from './style';

const Footer: React.FC = () => (
  <BgContainer>
    <Container className="d-flex justify-content-center">
      <img
        className="img-fluid"
        src={spaceMotorsLogo}
        alt="Space Motors Logo"
      />
    </Container>
    <div className="d-flex justify-content-center my-3">
      <p className="text-muted me-2">Site por:</p>
      <p className="text-light">Fábio Paredes</p>
    </div>
  </BgContainer>
);

export default memo(Footer);
