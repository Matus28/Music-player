import * as React from "react";
import { BlueStyledButton } from "../components/Button/CustomizedButton";
import { Card } from "../components/Card/Card";
import { CustomizedTextField } from "../components/Input/CustomizedTextField";
import { PasswordTextField } from "../components/Input/PasswordTextField";

import "./Signup.css";
import { useSignup } from "../hooks/useSignup";

const Signup = (): JSX.Element => {
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [confirmPassword, setConfirmPassword] = React.useState<string>("");
  const [isNotSame, setIsNotSame] = React.useState<boolean | null>(null);
  const { error, isLoading, mutateAsync: signup } = useSignup();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setIsNotSame(true);
      return;
    }
    setIsNotSame(false);

    await signup({ email, password });
  };

  return (
    <div className="signup">
      <Card class="signup">
        <form id="signup-form" className="signup" onSubmit={handleSubmit}>
          <h1>Sign up</h1>
          <label htmlFor="email">Email:</label>
          <CustomizedTextField
            type={"email"}
            onChange={setEmail}
            value={email}
            name={"email"}
            isError={error ? true : false}
          />

          <label htmlFor="password">Password:</label>
          <PasswordTextField
            onChange={setPassword}
            value={password}
            name={"password"}
          />

          <label htmlFor="confirm-password">Confirm Password:</label>
          <PasswordTextField
            onChange={setConfirmPassword}
            value={confirmPassword}
            name={"confirm-password"}
            isNotSame={isNotSame ?? undefined}
          />

          <BlueStyledButton
            variant="text"
            type="submit"
            form="signup-form"
            disabled={isLoading}
          >
            Submit
          </BlueStyledButton>
          {error ? <div className="error">{`${error}`}</div> : <div></div>}
        </form>
        <div className="terms-and-conditions">
          By clicking the Submit button, you agree to our{" "}
          <a href="">Terms and Conditions</a> and <a href="">Policy Privacy</a>
        </div>
      </Card>
    </div>
  );
};

export default Signup;
