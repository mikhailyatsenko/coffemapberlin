import { useFormContext } from 'react-hook-form';
import cls from './FormField.module.scss';

interface FormFieldProps {
  fieldName: string;
  type?: string;
  error?: string | undefined;
  value?: string;
  labelText?: string;
}
export const FormField: React.FC<FormFieldProps> = ({ fieldName, type, value, error, labelText }) => {
  const { register } = useFormContext();
  const parameters = {
    placeholder: fieldName,
    type,
    value,
    id: fieldName,
    ...register(fieldName, { required: `${labelText} is required` }),
  };
  return (
    <div className={`${cls.formGroup} ${type === 'hidden' ? cls.hiddenGroup : ''}`}>
      {!(fieldName === 'message') ? (
        <input className={`${cls.formField}  ${error ? cls.error : ''}`} {...parameters} />
      ) : (
        <textarea className={`${cls.formField} ${error ? cls.error : ''}`} rows={3} {...parameters} />
      )}

      <label className={cls.formLabel} htmlFor={fieldName}>
        {labelText}
      </label>

      {/* <div className={cls.errorContainer}>
        <p className={`error-message${error ? ' show-error' : ''}`}>{error && error}</p>
      </div> */}
    </div>
  );
};
