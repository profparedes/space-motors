import { memo, useEffect } from 'react';

import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

// import r2d2Loading from 'assets/r2d2Loading.gif';

import { useVehicles } from 'context/VehiclesContext';

import Footer from 'components/Footer';
import Header from 'components/Header';

import useTitle from 'hooks/useTitle';

import { BgPage } from './style';

const Cart: React.FC = () => {
  const { vehicle, isLoading, error, fetchVehicle } = useVehicles();
  const setTitle = useTitle();
  const { id, name } = useParams();

  useEffect(() => {
    setTitle(`Checkout | ${name}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name]);

  useEffect(() => {
    if (id) fetchVehicle(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <>
      <Header />
      <BgPage className="flex-grow-1">
        <Container className="mb-4">
          <div>CreditConfirmation</div>
        </Container>
      </BgPage>
      <Footer />
    </>
  );
};

export default memo(Cart);
