import { useNavigate } from "react-router";
import { Button } from "../../components/ui";

const IndexAdminPage = () => {
     const navigator = useNavigate();

    return (
        <div className="flex min-h-screen justify-center items-center">
            <div className="flex flex-col items-center">    
                <h2 className="text-3xl font-semibold mb-6 tracking-wide text-zinc-300">Ласкаво просимо!</h2>
                <div className="flex gap-1">
                    <Button variant="secondary" onClick={() => navigator("/admin/categories")} size="md" className={"rounded-l-3xl rounded-r-lg"}>Категорії</Button>
                    <Button variant="secondary" onClick={() => navigator("/admin/menu")} size="md" className={"rounded-l-lg rounded-r-lg"}>Меню</Button>
                    <Button variant="secondary" onClick={() => navigator("/admin/orders")} size="md" className={"rounded-l-lg rounded-r-3xl"}>Замовлення</Button>
                </div>
            </div>
        </div>
    )
}

export default IndexAdminPage;