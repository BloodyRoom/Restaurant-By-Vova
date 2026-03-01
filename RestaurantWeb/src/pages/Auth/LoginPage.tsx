import React from "react";
import { Button, Input } from "../../components/ui"
import { useNavigate } from "react-router";
import { IAccountLogin } from "../../types/account/IAccountLogin";
import { useLoginMutation } from "../../services/apiAccount";
import { useAppDispatch } from "../../store";
import { login } from "../../store/authSlice";



const LoginPage = () => {
  const navigator = useNavigate();
  const [loginRequest] = useLoginMutation();
  const dispatch = useAppDispatch();
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    if (!formData.get("email") || !formData.get("password")) {
      alert("Please fill in all fields");
      return;
    }
    const data: IAccountLogin = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };
    try {
      const result = await loginRequest(data).unwrap();
      dispatch(login(result.accessToken));
      navigator("/")
    } catch (error) {
      alert("Login failed. Please check your credentials and try again.");
    }

  }

  return (
    <form onSubmit={handleSubmit} className="w-2/4 mx-auto mt-40">
      <div className="flex flex-col gap-3">
        <Input label={"E-mail"} error={""} name="email" />
        <Input label={"Пароль"} error={""} name="password" type="password" />
        <Button variant={"primary"} size={"lg"} className="self-center">Увійти</Button>
      </div>
    </form>
  )
}

export default LoginPage