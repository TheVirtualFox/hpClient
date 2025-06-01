import {Button} from "flowbite-react";
import { v4 as uuidv4 } from 'uuid';
import {Link, useNavigate} from "react-router-dom";

const PresetItem = ({label, timestamp, id = '804c3d0f-2158-437c-8f1d-dd678d7c8727', isActive}) => {
    return (<Link to={`/presets/${id}`} className={`flex flex-col border ${isActive ? 'border-green-500' : ''} bg-white p-2 rounded-sm shadow-sm w-full gap-1`}>
        <div className="flex gap-1 justify-between border-b">
            <div className="text-sm text-gray-500">Название:</div>
            <div className="text-sm font-semibold">{label}</div>
        </div>
        <div className="flex gap-1 justify-between border-b">
            <div className="text-sm text-gray-500">Дата создание:</div>
            <div className="text-sm font-semibold">{timestamp}</div>
        </div>
    </Link>);
};

export const PresetsPage = () => {
    const navigate = useNavigate();
    const onCreatePresetClick = () => {
        navigate(`/presets/${uuidv4()}`);
    };
    return <>
        <div className="p-2">
            <Button size="sm" className="bg-green-500 rounded-sm px-3 py-1 h-8" onClick={onCreatePresetClick}>Создать пресет</Button>
        </div>

        <div className="p-2 flex flex-col gap-2">
            <PresetItem isActive={true} />
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