import { memo, useCallback, useEffect, useMemo, useState } from 'react';

import { Col, Container, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import InputMask from 'react-input-mask';
import Modal from 'react-modal';
import { Link, useParams } from 'react-router-dom';

import r2d2Loading from 'assets/r2d2Loading.gif';

import { useAddress } from 'context/AddressContext';
import { useVehicles } from 'context/VehiclesContext';

import Footer from 'components/Footer';
import Header from 'components/Header';

import useTitle from 'hooks/useTitle';

import { BgPage, ButtonPayment, FormContainer, ModalStyle } from './style';

type FormType = {
  name: string;
  email: string;
  tel: string;
  CPF: string;
  CEP: string;
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  estado: string;
  titular: string;
  cartao: string;
  validade: string;
  code: string;
};

Modal.setAppElement('#root');

const Cart: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isDirty },
  } = useForm<FormType>();
  const { vehicle, isLoading, error, fetchVehicle } = useVehicles();
  const { address, fetchAddress } = useAddress();
  const setTitle = useTitle();
  const { id, name } = useParams();
  const [lastCep, setLastCep] = useState('');
  const [payment, setPayment] = useState('credit');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [formRegistration, setFormRegistration] = useState<FormType>();

  const handleFormSubmit = useCallback(
    (data: FormType) => {
      setFormRegistration(data);
      // eslint-disable-next-line no-console
      console.log('Form:', formRegistration);
    },
    [formRegistration],
  );

  const hasErrors = useMemo(() => Object.keys(errors).length > 0, [errors]);

  const cepValue = watch('CEP');

  useEffect(() => {
    setTitle(`Checkout | ${name}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name]);

  useEffect(() => {
    if (id) fetchVehicle(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    const sanitizedCEP = cepValue?.replaceAll(/\D/g, '');

    if (sanitizedCEP?.length === 8 && cepValue !== lastCep) {
      setLastCep(cepValue);
      fetchAddress(sanitizedCEP);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cepValue]);

  setValue('logradouro', address?.logradouro ?? '');
  setValue('bairro', address?.bairro ?? '');
  setValue('estado', address?.uf ?? '');
  setValue('cidade', address?.localidade ?? '');
  // eslint-disable-next-line no-console
  console.log('errors', errors, isDirty);
  return (
    <>
      <Header />
      <BgPage className="flex-grow-1">
        <Container className="mb-4">
          <div className="d-flex align-items-center mt-3">
            <Link
              to="/"
              className="me-2 text-decoration-none fw-bolder text-light mb-2"
            >
              &lt;
            </Link>
            <h2 className="text-light">Checkout</h2>
          </div>
          {isLoading && (
            <div className="mt-3 d-flex flex-column align-items-center">
              <img src={r2d2Loading} alt="Loading..." />
              <p className="ms-5 h2 text-light mt-3">Carregando veículo...</p>
            </div>
          )}
          {error && <h2 className="text-center">{error}</h2>}
          {!isLoading && !error && vehicle && (
            <form onSubmit={handleSubmit(handleFormSubmit)}>
              <Row className="row-cols-1 row-cols-md-2 row-cols-lg-3 g-2 mt-2">
                <Col>
                  <FormContainer>
                    <h2>Informações Pessoais</h2>
                    <div className="mb-2">
                      <p>Nome</p>
                      <input
                        type="text"
                        {...register('name', {
                          required: 'O campo Nome está vazio',
                          minLength: {
                            value: 3,
                            message: 'O nome não atende o mínimo de caracteres',
                          },
                        })}
                      />
                      {errors.name && (
                        <p className="error-text">{errors.name.message}</p>
                      )}
                    </div>
                    <div className="mb-2">
                      <p>E-mail</p>
                      <input
                        type="email"
                        {...register('email', {
                          required: 'O campo E-mail está vazio',
                        })}
                      />
                      {errors.email && (
                        <p className="error-text">{errors.email.message}</p>
                      )}
                    </div>
                    <div className="mb-2">
                      <p>Telefone</p>
                      <InputMask
                        mask="(99)99999-9999"
                        type="tel"
                        {...register('tel', {
                          required: 'O campo Telefone está vazio',
                        })}
                      />
                      {errors.tel && (
                        <p className="error-text">{errors.tel.message}</p>
                      )}
                    </div>
                    <div>
                      <p>CPF</p>
                      <InputMask
                        mask="999.999.999-99"
                        type="text"
                        {...register('CPF', {
                          required: 'O campo Telefone está vazio',
                        })}
                      />
                      {errors.CPF && (
                        <p className="error-text">{errors.CPF.message}</p>
                      )}
                    </div>
                  </FormContainer>
                </Col>
                <Col>
                  <FormContainer>
                    <h2>Endereço</h2>
                    <div className="mb-2">
                      <div className="d-flex">
                        <p>CEP</p>
                        {address?.erro && (
                          <span className="ms-3 error-text">CEP Inválido</span>
                        )}
                      </div>
                      <InputMask
                        mask="99999-999"
                        type="text"
                        {...register('CEP', {
                          required: 'O campo CEP está vazio',
                        })}
                      />
                      {errors.CEP && (
                        <p className="error-text">{errors.CEP.message}</p>
                      )}
                    </div>
                    <div className="mb-2">
                      <p>Logradouro</p>
                      <input
                        type="text"
                        {...register('logradouro', {
                          required: 'O campo Logradouro está vazio',
                        })}
                      />
                      {errors.logradouro && (
                        <p className="error-text">
                          {errors.logradouro.message}
                        </p>
                      )}
                    </div>
                    <div className="d-sm-flex justify-content-between mb-2">
                      <div className="me-2">
                        <p>Número</p>
                        <input
                          type="number"
                          {...register('numero', {
                            required: 'O campo numero está vazio',
                          })}
                        />
                        {errors.numero && (
                          <p className="error-text">{errors.numero.message}</p>
                        )}
                      </div>
                      <div>
                        <p>Complemento</p>
                        <input type="text" {...register('complemento')} />
                      </div>
                    </div>
                    <div className="mb-2">
                      <p>Bairro</p>
                      <input
                        type="text"
                        {...register('bairro', {
                          required: 'O campo bairro está vazio',
                        })}
                      />
                      {errors.bairro && (
                        <p className="error-text">{errors.bairro.message}</p>
                      )}
                    </div>
                    <div className="mb-2">
                      <p>Cidade</p>
                      <input
                        type="text"
                        {...register('cidade', {
                          required: 'O campo cidade está vazio',
                        })}
                      />
                      {errors.cidade && (
                        <p className="error-text">{errors.cidade.message}</p>
                      )}
                    </div>
                    <div className="mb-2">
                      <p>Estado</p>
                      <input
                        type="text"
                        {...register('estado', {
                          required: 'O campo estado está vazio',
                        })}
                      />
                      {errors.estado && (
                        <p className="error-text">{errors.estado.message}</p>
                      )}
                    </div>
                  </FormContainer>
                </Col>
                <Col>
                  <FormContainer>
                    <h2>Forma de pagamento</h2>
                    <div className="d-flex justify-content-around mt-3">
                      <ButtonPayment
                        type="button"
                        onClick={() => setPayment('credit')}
                        isActive={payment === 'credit'}
                      >
                        Cartão de crédito
                      </ButtonPayment>
                      <ButtonPayment
                        type="button"
                        onClick={() => setPayment('ticket')}
                        isActive={payment === 'ticket'}
                      >
                        Boleto Bancário
                      </ButtonPayment>
                    </div>
                    {payment === 'credit' && (
                      <div className="mt-3">
                        <div className="mb-2">
                          <p>Nome do titular do cartão</p>
                          <input
                            type="text"
                            {...register('titular', {
                              required: 'O campo titular está vazio',
                            })}
                          />
                          {errors.titular && (
                            <p className="error-text">
                              {errors.titular.message}
                            </p>
                          )}
                        </div>
                        <div className="mb-2">
                          <p>Número do cartão</p>
                          <InputMask
                            mask="9999 9999 9999 9999"
                            {...register('cartao', {
                              required: 'O campo numero do cartão está vazio',
                            })}
                          />
                          {errors.cartao && (
                            <p className="error-text">
                              {errors.cartao.message}
                            </p>
                          )}
                        </div>
                        <div className="d-flex">
                          <div className="me-2">
                            <p>Validade</p>
                            <InputMask
                              mask="99/9999"
                              type="text"
                              {...register('validade', {
                                required: 'O campo validade está vazio',
                              })}
                            />
                            {errors.validade && (
                              <p className="error-text">
                                {errors.validade.message}
                              </p>
                            )}
                          </div>
                          <div>
                            <p>Código de segurança</p>
                            <input
                              type="number"
                              {...register('code', {
                                required:
                                  'O campo código de segurança está vazio',
                              })}
                            />
                            {errors.code && (
                              <p className="error-text">
                                {errors.code.message}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </FormContainer>
                  <FormContainer className="mt-2">
                    <p className="text-muted">{vehicle.manufacturer}</p>
                    <h2>{vehicle.name}</h2>
                    <h2 className="mt-5">$ {vehicle.cost_in_credits}</h2>
                    <button
                      className="w-100 check-button"
                      type="submit"
                      onClick={() => setModalIsOpen(true)}
                      disabled={hasErrors || !isDirty}
                    >
                      Finalizar compra
                    </button>
                  </FormContainer>
                </Col>
              </Row>
            </form>
          )}
        </Container>
      </BgPage>
      <Footer />
      {payment === 'credit' && (
        <ModalStyle
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
        >
          <div className="d-flex justify-content-around">
            <div>
              <p className="text-muted">{vehicle?.manufacturer}</p>
              <h2>{vehicle?.name}</h2>
            </div>
            <div>
              <button type="button" onClick={() => setModalIsOpen(false)}>
                X
              </button>
            </div>
          </div>
          <div className="d-flex flex-column align-items-center mt-5">
            <h2 className="h3">
              Parabéns {formRegistration?.name?.split(' ')[0]}, Compra realizada
              com sucesso!
            </h2>
            <p className="text-light">
              Confirmamos o seu pedido. Em breve você receberá um e-mail com o
              status do processo de entrega.
            </p>
            <p className="text-success mt-3">
              E-mail enviado para: {formRegistration?.email}
            </p>
          </div>
        </ModalStyle>
      )}
      {payment === 'ticket' && (
        <ModalStyle
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
        >
          <div className="d-flex justify-content-around">
            <div>
              <p className="text-muted">{vehicle?.manufacturer}</p>
              <h2>{vehicle?.name}</h2>
            </div>
            <div>
              <button type="button" onClick={() => setModalIsOpen(false)}>
                X
              </button>
            </div>
          </div>
          <div className="d-flex flex-column align-items-center mt-5">
            <h2 className="h3">
              Parabéns {formRegistration?.name?.split(' ')[0]}, pedido realizado
              com sucesso!
            </h2>
            <p className="text-light">
              Em breve você receberá um e-mail com o seu boleto para pagamento.
            </p>
            <p className="text-success mt-3">
              E-mail enviado para: {formRegistration?.email}
            </p>
          </div>
        </ModalStyle>
      )}
    </>
  );
};

export default memo(Cart);
