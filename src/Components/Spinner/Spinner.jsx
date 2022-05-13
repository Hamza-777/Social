import React, { Fragment } from 'react';

const Spinner = () => {
  return (
    <Fragment>
      <img
        src='/assets/spinner.gif'
        style={{ width: '75%', margin: 'auto', display: 'block' }}
        alt='Loading...'
      />
    </Fragment>
  );
};

export default Spinner;
