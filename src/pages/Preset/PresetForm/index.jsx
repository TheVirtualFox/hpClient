import {Button, HelperText, Label, Textarea, TextInput} from "flowbite-react";
import React, {memo, useCallback, useEffect, useId} from "react";
import {
    addNewTimeRange,
    descSelector, labelErrorSelector,
    labelSelector,
    onDescChange,
    onLabelChange, removeTimeRange,
    reset, setTimeRange,
    usePresetForm
} from "./usePresetForm.jsx";
import {AnimatedAccordion} from "../../../components/AccordionPanel/index.jsx";
import {FieldArray} from "formik";
import {RangeTimePickerItem} from "./RangeTimePickerItem.jsx";
import {TimePicker} from "./TimePicker.jsx";

const LabelComponent = memo(({id, label}) => {
    return (
        <div className="mb-2 block">
            <Label htmlFor={id}>
                {label}
            </Label>
        </div>
    );
});

const HelperTextComponent = memo(({error, children}) => (
    <HelperText color={error ? 'failure' : ''}>
        {error ? error : children}
    </HelperText>
));

const InputComponent = ({label, value, onChange, disabled, error}) => {
    const id = useId();
    return (
        <div>
            <LabelComponent id={id} label={label} />
            <TextInput
                id={id} placeholder="Bonnie Green"
                value={value} onChange={onChange} color={error ? 'failure' : ''} />
            <HelperTextComponent error={error}>Название пресета</HelperTextComponent>
        </div>
    );
};


const TextareaComponent = ({value, onChange}) => {
    const id = useId();
    console.log("TextareaComponent");
    return (
        <div className="max-w-md">
            <LabelComponent id={id} label={"Описание"} />
            <Textarea
                className="rounded-sm"
                value={value}
                onChange={onChange}
                id={id} placeholder="Leave a comment..." required rows={4} />
        </div>
    );
};
//////////////////
const LabelInput = () => {
    const label = usePresetForm(labelSelector);


    const error = usePresetForm(labelErrorSelector);
    console.log("LabelInput");
    return <InputComponent value={label} label={"Название"} onChange={onLabelChange} error={error} />;
};

const DescInput = () => {
    const desc = usePresetForm(descSelector);
    console.log("DescInput");
    return <TextareaComponent value={desc} onChange={onDescChange} />;
}

export const PresetForm = () => {

    useEffect(() => reset, []);
    return (
        <div className="flex flex-col gap-2 bg-white p-2">
            <LabelInput />
            <DescInput />
            <PumpAccordion device={DEVICES.pump} label={"Расписание работы насоса"} />
            <PumpAccordion device={DEVICES.light} label={"Расписание работы освещения"} />
            <PumpAccordion device={DEVICES.air} label={"Расписание работы аэратора"} />
            <PumpAccordion device={DEVICES.fan} label={"Расписание работы вентиляции"} />
        </div>
    );
};

const PumpAccordion = ({device, label}) => {
    const schedules = usePresetForm((state) => state[device]);
    return (
        <AnimatedAccordion label={label}>
            <ScheduleComponent device={device} />
        </AnimatedAccordion>
    );
};

const ScheduleComponent = ({device}) => {
    const onClick = useCallback(() => {
        addNewTimeRange(device);
    }, [device]);
    return (
        <>
            <Button
                type="button"
                onClick={onClick}
                size="sm"
                className="bg-blue-500 text-white rounded !ring-0"
            >
                Добавить
            </Button>
            <ArraySchedule device={device} />

        </>
    );
};

const ArraySchedule = ({device}) => {
    const schedules = usePresetForm((state) => state[device]);
    return (
        <>
            {/*{JSON.stringify(schedules)}*/}
            {schedules.map(({id, on, off}) => (
                <div key={id} className="flex items-center gap-3">
                    <TimePickerComponent value={on} device={device} id={id} type={'on'} />
                    <TimePickerComponent value={off} device={device} id={id} type={'off'} />
                    <DeleteRangeButton device={device} id={id} />
                </div>
            ) ) }
        </>

    );
}

const TimePickerComponent = ({device, id, type, value}) => {
    const onChange = useCallback((time) => {
        setTimeRange(device, id, type, time);
    }, [device, id, type]);

    const errors = usePresetForm((state) => state.errors?.[device]?.[id]);

    return (<><TimePicker value={value} onChange={onChange} error={errors} /></>);
};

const DeleteRangeButton = ({device, id}) => {
    const onClick = () => {
        removeTimeRange(device, id);
    };
    return (
        <button type="button" onClick={onClick} className="text-red-500">
            ✕
        </button>
    );
};

const DEVICES = {
    pump: 'pump',
    light: 'light',
    air: 'air',
    fan: 'fan'
}

// const AddRangeButton = ({onClick}) => {
//     return (
//
//     );
// }