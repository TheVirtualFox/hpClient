import 'swiper/css';
import {PresetForm} from "./PresetForm/index.jsx";
import {Button} from "flowbite-react";
import {DeleteButton} from "./DeleteButton.jsx";
import {onSavePreset} from "./PresetForm/usePresetForm.jsx";


// value: 777


export const PresetPage = () => {
    console.log("PresetPage");


    return <div className="p-2">
        <PresetForm/>
        <Buttons/>
    </div>;
};

const Buttons = () => {
    const onClick = async () => {
        await onSavePreset();
    }
    return (
        <div className="flex p-4 px-2">
            <div className="flex gap-2">
                <Button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
                    Включить
                </Button>

                <DeleteButton/>
            </div>
            <div className="flex ml-auto">
                <Button onClick={onClick} type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
                    Сохранить
                </Button>
            </div>
        </div>
    );
};
