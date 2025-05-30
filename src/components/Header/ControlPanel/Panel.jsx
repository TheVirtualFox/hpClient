import {ToggleSwitch} from "flowbite-react";

export const Panel = () => {
    return (
        <div className="flex flex-col gap-1">
            <div className="">
                <ToggleSwitch checked={true} label="Ручное управление" onChange={() => {} } />

                <div className="mb-2 mt-2 text-xs text-gray-500 dark:text-gray-400">
                    Все оборудование выключится и будет управляться
                    с панели управления
                </div>
                <div className="flex flex-col gap-3 border-t pt-3">
                    <ToggleSwitch checked={true} className="flex items-center" label="Насос" onChange={() => {} } />
                    <ToggleSwitch checked={true} className="flex items-center" label="Лампы" onChange={() => {} } />
                    <ToggleSwitch checked={true} className="flex items-center" label="Аэратор" onChange={() => {} } />
                    <ToggleSwitch checked={true} className="flex items-center" label="Вентиляция" onChange={() => {} } />
                </div>
            </div>
        </div>
    );
}