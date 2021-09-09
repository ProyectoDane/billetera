import { string, object, number } from 'yup';

// Error Messages
const requiredField = 'CAMPO REQUERIDO';
const validNumber = 'POR FAVOR, INGRESE UN NUMERO VALIDO';
const validNumPositive = 'EL NUMERO TIENE QUE SER MAYOR A 1';

// Validations
export const WishSchema = object().shape({
  name: string().required(requiredField),
  value: number()
    .required(requiredField)
    .positive(validNumPositive)
    .typeError(validNumber),
});
