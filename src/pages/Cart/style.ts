import Modal from 'react-modal';
import styled from 'styled-components';

interface Props {
  isActive: boolean;
}

export const BgPage = styled.div`
  background-color: #282a36;
`;

export const FormContainer = styled.div`
  background-color: #000;
  padding: 14px;
  border-radius: 8px;

  h2 {
    color: #f6e41f;
    font-size: 24px;
  }

  p {
    color: #fff;
  }

  .error-text {
    color: #f00;
  }

  input {
    background-color: #333;
    border: none;
    border-radius: 6px;
    color: #eee;
    padding: 4px 0px 4px 10px;
    width: 100%;
    margin-top: 8px;
  }

  button.check-button {
    background-color: #f6e41f;
    border: none;
    font-weight: bold;
    font-size: 22px;
    padding: 10px 14px 10px 14px;
    border-radius: 6px;
  }
`;

export const ModalStyle = styled(Modal)`
  background-color: #000;
  border-radius: 10px;
  margin-top: 220px;
  margin-left: auto;
  margin-right: auto;
  max-width: 90%;
  padding: 40px 20px 40px 20px;

  h2 {
    color: #f6e41f;
  }

  button {
    background-color: #f00;
    border: none;
    font-weight: bold;
    padding: 6px 12px 6px 12px;
    border-radius: 26px;
  }
`;

export const ButtonPayment = styled.button<Props>`
  background-color: ${(props) => (props.isActive ? '#f6e41f' : '#ccc')};
  border: none;
  font-weight: bold;
  font-size: 16px;
  padding: 10px 14px 10px 14px;
  border-radius: 6px;
`;
