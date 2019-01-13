import React from 'react';

import FormBtn from './FormBtn';

function SaveBtn(props) {
  return (
    <FormBtn color="primary" {...props}>
      Uložiť
    </FormBtn>
  );
}

export default SaveBtn;
