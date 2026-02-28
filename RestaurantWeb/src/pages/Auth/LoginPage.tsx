import React from "react";
import { Button, Input } from "../../components/ui"
import { useNavigate } from "react-router";



const LoginPage = () => {
  const navigator = useNavigate();
  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = {
      login: formData.get("login"),
      password: formData.get("password"),
    };
    console.log(data);
    try {
      // тут queryRTK
      navigator("/")
    } catch (error) {

    }

  }

  return (
    <form onSubmit={handleSubmit} className="w-2/4 mx-auto mt-20">
      <div className="flex flex-col gap-3">
        <Input label={"Login"} error={""} name="login" />
        <Input label={"Password"} error={""} name="password" type="password" />
        <Button variant={"primary"} size={"lg"}>Login</Button>
      </div>
    </form>
  )
}

export default LoginPage