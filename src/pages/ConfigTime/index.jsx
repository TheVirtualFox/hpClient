import 'swiper/css';
import {Button} from "flowbite-react";
import {TimePicker} from "../../components/Input/TimePicker.jsx";
import {LabelComponent} from "../../components/Input/LabelComponent.jsx";
import {HelperTextComponent} from "../../components/Input/HelperTextComponent.jsx";


export const ConfigTimePage = () => {
    return <div className="p-2">
        <TimeForm/>
        <Buttons/>
    </div>;
};

const TimeForm = () => {
    return (<div className="flex flex-col bg-white p-4">
        <div>
            <LabelComponent label="Время" />
            <TimePicker />
            <HelperTextComponent>Время</HelperTextComponent>
        </div>
    </div>);
};

const Buttons = () => {
    return (
        <div className="flex p-4 px-2">
            <div className="flex gap-2">
                <Button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
                    Установить системное
                </Button>
            </div>
            <div className="flex ml-auto">
                <Button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
                    Сохранить
                </Button>
            </div>
        </div>
    );
};
