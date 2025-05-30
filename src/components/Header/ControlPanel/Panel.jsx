import {ToggleSwitch} from "flowbite-react";
import { Controller, useForm } from "react-hook-form";
import {controlPanelSelector, useGlobalStore} from "../../../store/useGlobalStore.js";
import {useEffect, useState} from "react";
import {WsService} from "../../../service/WsService.js";

const FormToggle = ({ name, control, label, disabled = false }) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <ToggleSwitch
                    label={label}
                    checked={field.value}
                    onChange={field.onChange}
                    disabled={disabled}
                />
            )}
        />
    );
};

const Form = () => {
    const controlPanel = useGlobalStore(controlPanelSelector);



    const { control, watch, setValue,  } = useForm({
        defaultValues: {isManualControl: false, pump: false, light: false, air: false, fan: false},
        values: controlPanel
    });
    const isManualControl = watch("isManualControl");

    // useEffect(() => {}, []);

    return (
        <div className="flex flex-col gap-4 max-w-sm p-4 bg-white rounded shadow">
            <FormToggle name="isManualControl" control={control} label="Включить опции" />

            {["pump", "light", "air", "fan"].map((name, i) => (
                <FormToggle
                    key={name}
                    name={name}
                    control={control}
                    label={`Опция ${i + 1} ${name}`}
                    disabled={!isManualControl}
                />
            ))}
        </div>
    );
};

const wsService = new WsService();


export const Panel = () => {

    const [isLoading, setIsLoading] = useState(null);
    const controlPanel = useGlobalStore(controlPanelSelector);

    const onIsManualControlChange = async (isManualControl) => {
        await updateControlPanel({...controlPanel, isManualControl});
    };
    const onPumpChange = async (pump) => {
        await updateControlPanel({...controlPanel, pump});
    };
    const onLightChange = async (light) => {
        await updateControlPanel({...controlPanel, light});
    };
    const onAirChange = () => {};
    const onFanChange = () => {};

    const updateControlPanel = async (controlPanel) => {
        debugger
        try {
            setIsLoading(true);
            await wsService.sendPromiseMessage({
                action: 'SET_CONTROL_PANEL_REQ',
                payload: controlPanel
            });
        } catch(err) {
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col gap-1">
            <div className="">
                <ToggleSwitch checked={controlPanel?.isManualControl} label="Ручное управление" onChange={onIsManualControlChange}
                disabled={isLoading}
                />

                <div className="mb-2 mt-2 text-xs text-gray-500 dark:text-gray-400">
                    Все оборудование выключится и будет управляться
                    с панели управления
                </div>
                <div className="flex flex-col gap-3 border-t pt-3">
                    <ToggleSwitch checked={controlPanel?.pump} className="flex items-center" label="Насос" onChange={onPumpChange} />
                    <ToggleSwitch checked={controlPanel?.light} className="flex items-center" label="Лампы" onChange={onLightChange} />
                    <ToggleSwitch checked={true} className="flex items-center" label="Аэратор" onChange={() => {} } />
                    <ToggleSwitch checked={true} className="flex items-center" label="Вентиляция" onChange={() => {} } />
                </div>

            </div>
        </div>
    );
}
