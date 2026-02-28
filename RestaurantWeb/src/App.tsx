import './App.css'
import {Button, Card, Input} from "./components/ui";
import {Navbar} from "./components/ui/Navbar";
import {useLoginMutation} from "./services/apiAccount";
import {useEffect} from "react";
import {IAccountLogin} from "./types/account/IAccountLogin";
import {useAppDispatch} from "./store";
import {login} from "./store/authSlice";

function App() {

    const [loginRequest] = useLoginMutation();
    const dispatch = useAppDispatch();

    const test = async () => {
        const user: IAccountLogin = {
            email: "admin@gmail.com",
            password: "123123",
        }
        const result = await loginRequest(user).unwrap();
        dispatch(login(result.accessToken));
    }

    useEffect(() => {
        test();
    }, [])

  return (
    <>
        <div className="flex flex-col gap-3">
            <div className="flex gap-3">
                <Button variant={"primary"} size={"lg"}>кнопка1</Button>
                <Button variant={"primary-link"} size={"lg"}>кнопка2</Button>
                <Button variant={"secondary"} size={"lg"}>кнопка3</Button>
                <Button variant={"secondary-link"} size={"lg"}>кнопка4</Button>
            </div>

            <div className="flex gap-3">
                <Button variant={"primary"} size={"md"}>кнопка1</Button>
                <Button variant={"primary-link"} size={"md"}>кнопка2</Button>
                <Button variant={"secondary"} size={"md"}>кнопка3</Button>
                <Button variant={"secondary-link"} size={"md"}>кнопка4</Button>
            </div>

            <div className="flex gap-3">
                <Button variant={"primary"} size={"sm"}>кнопка1</Button>
                <Button variant={"primary-link"} size={"sm"}>кнопка2</Button>
                <Button variant={"secondary"} size={"sm"}>кнопка3</Button>
                <Button variant={"secondary-link"} size={"sm"}>кнопка4</Button>
            </div>
        </div>

        <div className={"p-4"}>
            <Card image={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoFl-t4AKV1-EkKxk1uCkG8oXszb8p_dyNog&s"}>asd</Card>
        </div>

        <div className={"p-4 w-[400px]"}>
            <Input label={"Input"} error={"hahaha"}/>
        </div>

        <Navbar />
    </>
  )
}

export default App
