
import styled from 'styled-components';
import {COLORS} from '../styles/colors';
import ButtonComponent from './button.component';

const ModalOverlay = styled('div')`
  width: 100%;
  height: 100vh;
  position: absolute;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: rgba(0,0,0,0.5);
  top: 0;
  left: 0;
`;

const ModalCard = styled('div')`
  width: 50%;
  height: auto;
  background: ${COLORS.light0};
  border-radius: 20px;
  overflow: hidden;
  @media(max-width: 767px){
    width: 90%; 
  }
`;

const ModalTitle = styled('div')`
  background: ${COLORS.secondary};
  color: ${COLORS.light0};
  padding: 16px 24px;
  h2{
    font-size: 20px !important;
  }
`
const ModalContent = styled('div')`
  padding: 16px 24px;
  max-height: 60vh;
  overflow-y: auto;
`
const ModalFooter = styled('div')`
  width: 100%;
  padding: 16px 24px;
  background: ${COLORS.light1};
  display: flex;
  justify-content: space-between;
`

const Modal = ({
  show,
  setShow,
  actionModal,
  actionModalLabel,
  modalTitle,
  children
}) => {
  return show && (
    <ModalOverlay>
      <ModalCard>
        <ModalTitle>
          <h2>{modalTitle}</h2>
        </ModalTitle>
        <ModalContent>
          {children}
        </ModalContent>
        <ModalFooter>
          <ButtonComponent
            variant="outlined"
            color="secondary"
            type="submit"
            id="loginButton"
            label="Fechar"
            size="small"
            format="inputv2"
            onClick={() => setShow(!show)}
          />
          {actionModalLabel && (
            <ButtonComponent
              variant="contained"
              color="primary"
              type="submit"
              id="loginButton"
              size="small"
              format="input"
              label={actionModalLabel}
              onClick={actionModal}
            />
          )}
          
        </ModalFooter>
      </ModalCard>
    </ModalOverlay>
  )
};

export default Modal;