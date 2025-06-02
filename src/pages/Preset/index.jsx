import 'swiper/css';
import {PumpForm} from "./Form.jsx";
import {PresetForm} from "./PresetForm/index.jsx";
import {Button} from "flowbite-react";
import {DeleteButton} from "./DeleteButton.jsx";


// value: 777



export const PresetPage = () => {
    console.log("PresetPage");


    return <div className="p-2">
        <PresetForm />

        <Buttons />
        {/*<PumpForm />*/}
        </div>;
};

const Buttons = () => {
    return (
        <div className="flex p-4 px-2">
            <div className="flex gap-2">
                <Button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
                    Включить
                </Button>

                <DeleteButton />
            </div>
            <div className="flex ml-auto">
                <Button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
                    Сохранить
                </Button>
            </div>
        </div>
    );
};
