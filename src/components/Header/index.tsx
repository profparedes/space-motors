import { memo } from 'react';

import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import spaceMotorsLogo from 'assets/spaceMotorsLogo.png';
import spaceMotorsPicture from 'assets/spaceMotorsPicture.png';

import { BgContainer } from './style';

const Header: React.FC = () => (
  <>
    <BgContainer>
      <Container>
        <Link to="/">
          <img
            src={spaceMotorsLogo}
            className="img-fluid"
            alt="Space Motors Logo"
          />
        </Link>
      </Container>
    </BgContainer>
    <img src={spaceMotorsPicture} alt="Space Motors Img" />
  </>
);

export default memo(Header);
