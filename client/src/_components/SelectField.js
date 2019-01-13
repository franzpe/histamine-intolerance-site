import React from 'react';
import Select from 'react-select';
import { Fragment } from 'react';
import { withStyles } from '@material-ui/core';
import './SelectField.scss';

const styles = theme => ({
  label: {
    color: 'rgba(0,0,0,0.54)',
    padding: 0,
    fontSize: '0.75rem',
    lineHeight: '1px',
    marginBottom: '16px'
  }
});

function SelectField({ classes, label, ...restProps }) {
  return (
    <Fragment>
      {label && <div className={classes.label}>{label}</div>}
      <Select {...restProps} />
    </Fragment>
  );
}

export default withStyles(styles)(SelectField);
