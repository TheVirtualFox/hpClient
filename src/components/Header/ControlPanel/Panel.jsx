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

const wsService = new WsService();

const ToggleItem = ({checked, label, desc, onChange}) => (
    <div className="border-t pt-4">
        <ToggleSwitch checked={checked} className="flex items-center" label={label} onChange={onChange} />
        <div className=" mt-2 text-xs text-gray-500 dark:text-gray-400">
            {desc}
        </div>
    </div>
);

export const Panel = () => {

    const [isLoading, setIsLoading] = useState(null);
    const controlPanel = useGlobalStore(controlPanelSelector);

    const onIsManualControlChange = async (isManualControl) => {
        await updateControlPanel({...controlPanel, isManualControl});
    };
    const onPumpChange = (pump) => updateControlPanel({...controlPanel, pump});
    const onLightChange =  (light) => updateControlPanel({...controlPanel, light});
    const onAirChange = (air) => updateControlPanel({...controlPanel, air});
    const onFanChange = (fan) => updateControlPanel({...controlPanel, fan});

    const updateControlPanel = async (controlPanel) => {
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
            <div className={`${isLoading ? 'pointer-events-none' : ''} flex flex-col gap-3`}>
                <ToggleItem label="Ручное управление" checked={controlPanel?.isManualControl} onChange={onIsManualControlChange} desc="Все оборудование выключится и будет управляться
                    с панели управления" />

                    <ToggleItem label="Насос" checked={controlPanel?.pump} onChange={onPumpChange} desc="Подача питательного" />
                    <ToggleItem label="Лампы" checked={controlPanel?.light} onChange={onLightChange} desc="Включение освещения" />
                    <ToggleItem label="Аэратор" checked={controlPanel?.air} onChange={onAirChange} desc="Включение освещения" />
                    <ToggleItem label="Вентиляция" checked={controlPanel?.fan} onChange={onFanChange} desc="Включение освещения" />

            </div>
        </div>
    );
}
