import Modal from 'react-modal';

export const modalWrapper = WrappedComponent => {
  return function ModalWrapper(props) {
    Modal.setAppElement('#root');
    const customStyles = {
      content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        borderRadius: '15px',
        padding: '40px 40px',
        transform: 'translate(-50%, -50%)',
      },
    };

    return (
      <div>
        <WrappedComponent />
        <Modal
          isOpen={props.isOpen}
          onRequestClose={props.isClose}
          style={customStyles}
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
