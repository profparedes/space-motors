import { memo, useMemo } from 'react';

import { normalizeId, strToSlug } from 'helpers';

import { VehicleType } from 'types/VehicleType';

import { CardContainer, LinkTitle } from './style';

interface IVehicleCardProps {
  vehicle: VehicleType;
}

const VehicleCard: React.FC<IVehicleCardProps> = ({ vehicle }) => {
  const hasProduct = useMemo(
    () => vehicle.cost_in_credits !== 'unknown',
    [vehicle],
  );

  return (
    <CardContainer className="w-100 d-flex flex-column position-relative">
      <p className="text-muted">{vehicle.manufacturer}</p>
      {hasProduct ? (
        <LinkTitle
          to={`/${normalizeId(vehicle.url)}/${strToSlug(vehicle.name)}`}
          className="text-decoration-none h2 mb-0 stretched-link"
        >
          {vehicle.name}
        </LinkTitle>
      ) : (
        <h2>{vehicle.name}</h2>
      )}
      <p className="text-muted">{vehicle.model}</p>
      <div className="text-light mt-3 row-cols-1 flex-grow-1">
        <div className="d-flex justify-content-between">
          <p>Largura:</p>
          <p>{vehicle.length}</p>
        </div>
        <div className="d-flex justify-content-between">
          <p>Velocidade:</p>
          <p>{vehicle.max_atmosphering_speed}</p>
        </div>
        <div className="d-flex justify-content-between">
          <p>Equipe:</p>
          <p>{vehicle.crew}</p>
        </div>
        {vehicle.passengers === 0 && (
          <div className="d-flex justify-content-between">
            <p>Passageiros:</p>
            <p>{vehicle.passengers}</p>
          </div>
        )}
        {vehicle.cargo_capacity !== 'none' &&
          vehicle.cargo_capacity !== 'unknown' && (
            <div className="d-flex justify-content-between">
              <p>Capacidade de carga:</p>
              <p>{vehicle.cargo_capacity}</p>
            </div>
          )}
      </div>
      <h2 className="h3 mt-3">
        {vehicle.cost_in_credits === 'unknown'
          ? 'Produto indisponível'
          : `$${vehicle.cost_in_credits}`}
      </h2>
    </CardContainer>
  );
};

export default memo(VehicleCard);
