export interface ErrorMessageProps {
  error?: string;
  touched?: boolean;
}

const FormValidationError: React.FC<ErrorMessageProps> = ({
  error,
  touched,
}) =>
  error && touched ? <p className="text-sm text-red-500">{error}</p> : null;

export default FormValidationError;
