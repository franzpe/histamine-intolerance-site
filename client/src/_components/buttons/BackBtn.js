import React from 'react';

import FormBtn from './FormBtn';

function BackBtn({ ...props }) {
  return (
    <FormBtn color="secondary" {...props}>
      Späť
    </FormBtn>
  );
}

export default BackBtn;
