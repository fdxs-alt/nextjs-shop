import React from 'react'
import { Field } from 'formik'
import { Input } from '@chakra-ui/input'
import { FormControl, FormLabel } from '@chakra-ui/form-control'
interface Props {
  name: string
  type: string
  label: string
  placeholder: string
  required?: boolean
  disabled: boolean
}
const FormikField: React.FC<Props> = ({
  name,
  type,
  label,
  placeholder,
  disabled,
  required = false,
}) => {
  return (
    <FormControl p="6px 0" id={name}>
      <FormLabel>{label}</FormLabel>
      <Field
        name={name}
        as={Input}
        type={type}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
      />
    </FormControl>
  )
}

export default FormikField
