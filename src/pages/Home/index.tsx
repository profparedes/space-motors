import { memo, useCallback, useEffect, useState } from 'react';

import { Col, Container, Row } from 'react-bootstrap';

import Xwing from 'assets/Xwing.gif';

import { useVehicles } from 'context/VehiclesContext';

import Footer from 'components/Footer';
import Header from 'components/Header';
import VehicleCard from 'components/VehicleCard';

import useTitle from 'hooks/useTitle';

import { Pagination } from 'styles/Pagitation';

import { BgPage, SearchContainer } from './style';

const Home: React.FC = () => {
  const setTitle = useTitle();
  const [search, setSearch] = useState('');
  const { vehicles, isLoading, error, currentPage, fetchVehicles } =
    useVehicles();

  const handlePageChange = useCallback(
    (page: number) => fetchVehicles(page, search),
    [fetchVehicles, search],
  );

  useEffect(() => {
    setTitle('SpaceMotors');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = useCallback(
    () => fetchVehicles(1, search),
    [fetchVehicles, search],
  );

  const handleClear = useCallback(() => {
    fetchVehicles(1);
    setSearch('');
  }, [fetchVehicles]);

  return (
    <>
      <Header />
      <BgPage className="flex-grow-1">
        <Container className="">
          <SearchContainer>
            <div className="d-flex flex-column flex-sm-row align-items-center">
              <input
                className="w-100 py-2"
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Procurar veículo"
                aria-label="Procurar veículo"
                aria-describedby="basic-addon2"
              />
              <div className="d-flex mt-2 mt-sm-0">
                <button type="submit" onClick={handleSearch} id="button-addon2">
                  Pesquisar
                </button>

                {search.length > 0 && (
                  <button
                    type="submit"
                    onClick={handleClear}
                    id="button-addon2"
                  >
                    Limpar
                  </button>
                )}
              </div>
            </div>
          </SearchContainer>
          <Row className="row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 justify-content-center g-3 my-3">
            {isLoading && (
              <div className="d-flex justify-content-center">
                <img src={Xwing} alt="Loading..." />
              </div>
            )}
            {error && <h2 className="text-center">{error}</h2>}
            {!isLoading &&
              !error &&
              vehicles.map((vehicle) => (
                <Col className="d-flex" key={vehicle.name}>
                  <VehicleCard vehicle={vehicle} />
                </Col>
              ))}
          </Row>
          <Pagination
            className="flex-wrap ps-0 my-5"
            forcePage={currentPage - 1}
            onPageChange={(p) => handlePageChange(p.selected + 1)}
            pageCount={4}
            nextLabel=">"
            previousLabel="<"
          />
        </Container>
      </BgPage>
      <Footer />
    </>
  );
};

export default memo(Home);
