import React from 'react';

function SemiBold(props) {
  return (
    <span style={{ fontWeight: 600 }} {...props}>
      {props.children}
    </span>
  );
}

export default SemiBold;
