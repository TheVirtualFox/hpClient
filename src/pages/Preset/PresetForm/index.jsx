import React, {useEffect} from "react";
import {reset} from "./usePresetForm.jsx";
import {ScheduleAccordion} from "./ScheduleAccordion.jsx";
import {DescInput, LabelInput} from "./InputComponent.jsx";

export const PresetForm = () => {
    useEffect(() => reset, []);
    return (
        <div className="flex flex-col gap-2 bg-white p-2">
            <LabelInput />
            <DescInput />
            <ScheduleAccordion device={DEVICES.pump} label={"Расписание работы насоса"} />
            <ScheduleAccordion device={DEVICES.light} label={"Расписание работы освещения"} />
            <ScheduleAccordion device={DEVICES.air} label={"Расписание работы аэратора"} />
            <ScheduleAccordion device={DEVICES.fan} label={"Расписание работы вентиляции"} />
        </div>
    );
};

const DEVICES = {
    pump: 'pump',
    light: 'light',
    air: 'air',
    fan: 'fan'
}
