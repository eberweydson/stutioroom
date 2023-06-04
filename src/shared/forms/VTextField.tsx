import { useState, useEffect } from 'react';
import { TextField, TextFieldProps } from '@mui/material';
import { useField } from '@unform/core';

type TVTextFieldProps = TextFieldProps & {
  name: string;
}
/* eslint-disable react/prop-types */
export const VTextField: React.FC<TVTextFieldProps> = ({ name , ...rest }) => {
/* eslint-enable react/prop-types */

  const { fieldName, registerField, defaultValue, error, clearError } = useField(name);
  const [ value, setValue ] = useState(defaultValue || '');

  useEffect(() => {
    registerField({
      name: fieldName,
      getValue: () => value,
      setValue: (_, newValue) => setValue(newValue)
    });
  }, [registerField, fieldName, value]);

  return (
    <TextField 
      {...rest}

      error={!!error}
      helperText={error}
      defaultValue={defaultValue}
      onKeyDown={() => error ? clearError() : undefined}

      value={value}
      onChange={e => setValue(e.target.value)}
    />
  );
};