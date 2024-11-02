import { AuthPageProps, LoginFormTypes, RegisterFormTypes, UseFormProps } from '@refinedev/core';

import { LoginPage } from './LoginPage';

export interface FormPropsType extends UseFormProps {
  onSubmit?: (values: RegisterFormTypes | LoginFormTypes) => void;
}

export type AuthProps = AuthPageProps<object, object, FormPropsType>;

export const AuthPage: React.FC<AuthProps> = (props) => {
  const renderView = () => {
    return <LoginPage {...props} />;
  };

  return <>{renderView()}</>;
};
