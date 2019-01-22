import React from 'react';
import Dropzone from 'react-dropzone';
import PropTypes from 'prop-types';

function DropzoneField({ onDrop, containerProps, ...restProps }) {
  return (
    <Dropzone onDrop={onDrop} {...restProps}>
      {({ getRootProps, getInputProps, isDragActive }) => {
        return (
          <div {...getRootProps()} {...containerProps}>
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Potiahni obrázok sem</p>
            ) : (
              <p>Potiahni obrázok sem alebo klikni na nahranie obrázku</p>
            )}
          </div>
        );
      }}
    </Dropzone>
  );
}

DropzoneField.propTypes = {
  onDrop: PropTypes.func.isRequired
};

export default DropzoneField;
