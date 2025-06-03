import 'swiper/css';
import {PresetForm} from "./PresetForm/index.jsx";
import {Button} from "flowbite-react";
import {DeleteButton} from "./DeleteButton.jsx";
import {onSavePreset} from "./PresetForm/usePresetForm.jsx";
import {useParams} from "react-router-dom";


// value: 777


export const PresetPage = () => {
    console.log("PresetPage");


    return <div className="p-2">
        <PresetForm />
    </div>;
};

