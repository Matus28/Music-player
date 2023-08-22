import * as React from "react";
import { CustomizedTextField } from "../components/Input/CustomizedTextField";
import { PasswordTextField } from "../components/Input/PasswordTextField";
import { useLogin } from "../hooks/useLogin";
import { BlueStyledButton } from "../components/Button/CustomizedButton";
import { Card } from "../components/Card/Card";
import { Container } from "../components/Container/Container";
import { Header } from "../components/Header/Header";

const Login = (): JSX.Element => {
  const [email, setEmail] = React.useState<string>("matus28@gmail.com");
  const [password, setPassword] = React.useState<string>("ABCabc123!");
  const { error, isLoading, mutateAsync: login } = useLogin();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await login({ email, password });
  };

  return (
    <Container>
      <Header />
      <div className="login">
        <Card class="login">
          <form id="login-form" className="login" onSubmit={handleSubmit}>
            <h1>Login</h1>
            <label htmlFor="email">Email:</label>
            <CustomizedTextField
              type={"email"}
              onChange={setEmail}
              value={email}
              name={"email"}
            />

            <label htmlFor="password">Password:</label>
            <PasswordTextField
              onChange={setPassword}
              value={password}
              name={"password"}
            />

            <BlueStyledButton
              variant="text"
              type="submit"
              form="login-form"
              disabled={isLoading}
            >
              Submit
            </BlueStyledButton>
            {error ? <div className="error">{`${error}`}</div> : <div></div>}
            <div className="anchor-signup">
              If you do not have account, you can <a href="/signup">Sign up</a>
            </div>
          </form>
        </Card>
      </div>
    </Container>
  );
};

export default Login;
