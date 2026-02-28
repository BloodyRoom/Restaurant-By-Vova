import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Input, Button } from "../../components/ui"

const RegisterPage = () => {
    const navigator = useNavigate();
    const [confirmPasswordError, setConfirmPasswordError] = useState("");

    function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
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

        const data = {
            email: formData.get("email"),
            firstName: formData.get("firstName"),
            lastName: formData.get("lastName"),
            password,
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