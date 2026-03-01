import {Button, Card} from "../components/ui";
import {useGetCategoriesQuery} from "../services/apiCategory";
import APP_ENV from "../env";
import {useNavigate} from "react-router";

const IndexPage = () => {
    const navigate = useNavigate();

    const {data: categories} = useGetCategoriesQuery();

    return (
        <>
            <div className="w-full h-[100vh] flex justify-center">
                <div className="z-1 flex justify-center items-center flex-col w-[1000px] h-[90%] gap-6">
                    <h1 className={"text-[64px] font-bold w-1/2 text-white text-center leading-15"}>Найкраща піца тільки у Вови</h1>
                    <Button onClick={() => {navigate(`/menu`)}} variant={"primary-link"}>Переглянути меню</Button>
                </div>

                <div className={"w-full h-[90%] absolute z-0 top-0"}>
                    <img src="/bg.png" alt="" className="select-none w-full h-full object-cover 2xl:rounded-b-[120px] rounded-b-2xl" />
                </div>
            </div>

            <div className="w-full flex flex-col items-center">
                <div className="w-[1200px] px-4">
                    <h1 className="text-[50px] mb-6 font-bold text-white leading-15">
                        Категорії
                    </h1>

                    <div className="grid grid-cols-3 gap-6">
                        {categories?.map((category) => (
                            <Card
                                onClick={() => {navigate(`/menu?category=${category.id}`)}}
                                key={category.id}
                                image={`${
                                    category.image
                                        ? APP_ENV.API_IMAGE_MEDIUM_URL
                                        : APP_ENV.API_URL + "/images/"
                                }${category.image ? category.image : "noimage.jpg"}`}
                            >
                                {category.name}
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </>
      )
}

export default IndexPage;