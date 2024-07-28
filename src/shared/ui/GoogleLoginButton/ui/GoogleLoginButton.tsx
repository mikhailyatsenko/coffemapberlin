import './GoogleLoginButton.scss';

interface GoogleLoginButtonProps {
  buttonHandler: () => void;
}

export const GoogleLoginButton = ({ buttonHandler }: GoogleLoginButtonProps) => {
  return (
    <button onClick={buttonHandler} type="button" className="login-with-google-btn">
      Sign in
    </button>
  );
};
