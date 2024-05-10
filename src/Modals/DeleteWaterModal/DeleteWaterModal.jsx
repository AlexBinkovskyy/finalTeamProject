// import React, { useState } from 'react';




// export const DeleteWaterModal = () => {
//   const [modalIsOpen, setIsOpen] = useState(false);

//   const openModal = () => {
//     setIsOpen(true);
//   };

//   const closeModal = () => {
//     setIsOpen(false);
//   };

//   // Функция handleDelete
//   const handleDelete = () => {
//     // Здесь можно добавить логику для удаления записи
//     closeModal();
//   };

//   return (
//     <>
//       <button onClick={openModal}>Open Modal</button>
//       <ComponentWithModal isOpen={modalIsOpen} isClose={closeModal}>
//         <div className={css.modalOverlay}>
//           <div className={css.modalContent}>
//             <button className={css.closeButton} onClick={closeModal}> a
//               {/* <svg className={css.iconClose}>
//                 <use href={`${IconX}#icon`}></use>
//               </svg> */}
//             </button>
//             <h2 className={css.modalTitle}>Delete entry</h2>
//             <p className={css.modalQuestion}>
//               Are you sure you want to delete the entry?
//             </p>
//             <div className={css.buttonContainer}>
//               <button className={css.deleteButton} onClick={handleDelete}>
//                 Delete
//               </button>
//               <button className={css.cancelButton} onClick={closeModal}>
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       </ComponentWithModal>
//     </>
//   );
// };
import ComponentWithModal from '../Modal/Modal';
import css from './DeleteWaterModal.module.css';
import IconX from '../../image/sprite.svg';

export const DeleteWaterModal = ({ isOpen, isClose }) => {
  // Функция handleDelete
  const handleDelete = () => {
    // Здесь можно добавить логику для удаления записи
    isClose();
  };

  return (
    <>
      <ComponentWithModal isOpen={isOpen} isClose={isClose}>
        <div className={css.modalOverlay}>
            <button className={css.closeButton} onClick={isClose}> 
              <svg className={css.iconClose}>
                <use href={`${IconX}#IconX`}></use>
              </svg>
            </button>
            <h2 className={css.modalTitle}>Delete entry</h2>
            <p className={css.modalQuestion}>
              Are you sure you want to delete the entry?
            </p>
            <div className={css.buttonContainer}>
              <button className={css.deleteButton} onClick={handleDelete}>
                Delete
              </button>
              <button className={css.cancelButton} onClick={isClose}>
                Cancel
              </button>
            </div>
          </div>
      </ComponentWithModal>
    </>
  );
};