import React from 'react';
import { ThreeDots } from 'react-loader-spinner';
import css from './Loader.module.css';

export default function Loader() {
  return (
    <div className={css.loaderOverlay}>
      <div className={css.loader}>
        <ThreeDots
          height={80}
          width={80}
          radius={9}
          color="green"
          ariaLabel="three-dots-loading"
        />
      </div>
    </div>
  );
}
