import { useFormContext } from 'react-hook-form';
import cls from './FormField.module.scss';

interface FormFieldProps {
  name: string;
  type: string;
  error?: string | undefined;
  value?: string;
  labelText?: string;
}
export const FormField: React.FC<FormFieldProps> = ({ name, type, error, value, labelText }) => {
  const { register } = useFormContext();
  return (
    <div className={cls.FormField}>
      <label htmlFor={name}>{labelText}</label>
      <input {...register(name, { required: 'Name is required' })} type={type} name={name} value={value} id={name} />

      <div className={cls.errorContainer}>
        <p className={`error-message${error ? ' show-error' : ''}`}>{error && error}</p>
      </div>
    </div>
  );
};
