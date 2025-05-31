import {Button} from "flowbite-react";
import { v4 as uuidv4 } from 'uuid';
import {useNavigate} from "react-router-dom";

const PresetItem = () => {
    return (<div className="border">
        Название
        дата создания
        активный
        дата активации
    </div>);
};

export const PresetsPage = () => {
    const navigate = useNavigate();
    const onCreatePresetClick = () => {
        navigate(`/presets/${uuidv4()}`);
    };
    return <>
        <div className="p-4">
            <Button size="xs" onClick={onCreatePresetClick}>Создать пресет</Button>
        </div>

        <div className="p-4 flex flex-col gap-2">
            <PresetItem />
            <PresetItem />
            <PresetItem />
            <PresetItem />
            <PresetItem />
            <PresetItem />
            <PresetItem />
            <PresetItem />
        </div>
    </>;
};