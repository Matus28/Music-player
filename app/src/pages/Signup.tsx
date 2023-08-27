import * as React from "react";
import { useNavigate } from "react-router-dom";
import { BlueStyledButton } from "../components/Button/CustomizedButton";
import { Card } from "../components/Card/Card";
import { CustomizedTextField } from "../components/Input/CustomizedTextField";
import { PasswordTextField } from "../components/Input/PasswordTextField";
import { useSignup } from "../hooks/useSignup";
import Footer from "../components/Footer/Footer";
import { Container } from "../components/Container/Container";
import { NavBar } from "../components/NavBar/NavBar";
import styles from "./Signup.module.scss";

const Signup = (): JSX.Element => {
  const [username, setUsername] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [confirmPassword, setConfirmPassword] = React.useState<string>("");
  const [isNotSame, setIsNotSame] = React.useState<boolean | null>(null);
  const { error, isLoading, mutateAsync: signup } = useSignup();

  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setIsNotSame(true);
      return;
    }
    setIsNotSame(false);

    await signup({ username, email, password });

    navigate("/");
  };

  return (
    <Container>
      <NavBar />
      <Card>
        <form
          id="signup-form"
          className={styles.signup}
          onSubmit={handleSubmit}
        >
          <h1>Sign up</h1>
          <label htmlFor="username">Username:</label>
          <CustomizedTextField
            type={"text"}
            onChange={setUsername}
            value={username}
            name={"username"}
            isError={error ? true : false}
          />

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
          {error ? (
            <div className={styles.error}>{`${error}`}</div>
          ) : (
            <div></div>
          )}
        </form>
        <div className={styles.text}>
          By clicking the Submit button, you agree to our{" "}
          <a href="">Terms and Conditions</a> and <a href="">Policy Privacy</a>
        </div>
      </Card>
      <Footer />
    </Container>
  );
};

export default Signup;
