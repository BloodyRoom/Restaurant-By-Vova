import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Input, Button } from "../../components/ui"
import { useRegisterMutation } from "../../services/apiAccount";
import { useAppDispatch } from "../../store";
import { login } from "../../store/authSlice";
import { IAccountRegister } from "../../types/account/IAccountRegister";

const RegisterPage = () => {
    const navigator = useNavigate();
    const [confirmPasswordError, setConfirmPasswordError] = useState("");
    const [registerRequest] = useRegisterMutation();
    const dispatch = useAppDispatch();

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>): Promise<void> {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const password = formData.get("password");
        const confirmPassword = formData.get("confirmPassword");

        if (password !== confirmPassword) {
            setConfirmPasswordError("Паролі не співпадають");
            return;
        }
        if (password != null && password.toString().length < 6) {
            setConfirmPasswordError("Пароль має бути не менше 6 символів");
            return;
        }

        setConfirmPasswordError("");

        const data: IAccountRegister = {
            email: formData.get("email") as string,
            firstName: formData.get("firstName") as string,
            lastName: formData.get("lastName") as string,
            password: password as string,
        };
        try {
            await registerRequest(data).unwrap();
            navigator("/")
        } catch (error) {
            alert("Registration failed. Please check your credentials and try again.");
        }
    }

    return (
        <form onSubmit={handleSubmit} className="w-2/4 mx-auto mt-20">
            <div className="flex flex-col gap-3">
                <Input label={"Email"} error={""} name="email" type="email" />
                <Input label={"First Name"} error={""} name="firstName" />
                <Input label={"Last Name"} error={""} name="lastName" />
                <Input label={"Password"} error={""} name="password" type="password" />
                <Input label={"Confirm Password"} error={confirmPasswordError} name="confirmPassword" type="password" />
                <Button variant={"primary"} size={"lg"}>Register</Button>
            </div>
        </form>
    )
}

export default RegisterPage