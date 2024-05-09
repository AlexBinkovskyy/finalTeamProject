import Modal from 'react-modal';

export const modalWrapper = WrappedComponent => {
  return function ModalWrapper(props) {
    Modal.setAppElement('#root');

    return (
      <div>
        <WrappedComponent />
        <Modal
          isOpen={props.isOpen}
          onRequestClose={props.isClose}
          shouldCloseOnOverlayClick={true}
          shouldCloseOnEsc={true}
          contentLabel="modalWrapper"
        >
          {props.children}
        </Modal>
      </div>
    );
  };
};

const WrappedComponent = ({ children }) => {
  return <>{children}</>;
};

const ComponentWithModal = modalWrapper(WrappedComponent);

export default ComponentWithModal;
