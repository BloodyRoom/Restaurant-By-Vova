import './App.css'
import {Button, Card, Input} from "./components/ui";
import {Navbar} from "./components/ui/Navbar";

function App() {

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
