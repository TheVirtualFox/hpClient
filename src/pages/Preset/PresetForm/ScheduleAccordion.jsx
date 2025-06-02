import {addNewTimeRange, removeTimeRange, setTimeRange, usePresetForm} from "./usePresetForm.jsx";
import {AnimatedAccordion} from "../../../components/AccordionPanel/index.jsx";
import {Button} from "flowbite-react";
import {useCallback} from "react";
import {TimePicker} from "../../../components/Input/TimePicker.jsx";

export const ScheduleAccordion = ({device, label}) => {
    const schedules = usePresetForm((state) => state[device]);
    return (
        <AnimatedAccordion label={label} defaultOpen={true}>
            <ScheduleComponent device={device} />
        </AnimatedAccordion>
    );
};

const ScheduleComponent = ({device}) => {
    const onClick = useCallback(() => {
        addNewTimeRange(device);
    }, [device]);
    return (
        <div className="flex flex-col gap-2">
            <Button
                type="button"
                onClick={onClick}
                size="xs"
                className="bg-blue-500 text-white rounded-sm !ring-0 w-fit"
            >
                Добавить
            </Button>
            <ArraySchedule device={device} />
        </div>
    );
};

const ArraySchedule = ({device}) => {
    const schedules = usePresetForm((state) => state[device]);
    return (
        <div className="flex flex-col gap-2">
            {/*{JSON.stringify(schedules)}*/}
            {schedules.map(({id, on, off}) => (
                <div key={id} className="flex items-center gap-2">
                    <TimePickerComponent value={on} device={device} id={id} type={'on'} />
                    <TimePickerComponent value={off} device={device} id={id} type={'off'} />
                    <DeleteRangeButton device={device} id={id} />
                </div>
            ) ) }
        </div>
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
        <Button color="light" type="button" onClick={onClick} className="w-14 h-10 p-0 text-pink-500 rounded-sm">
            <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                 width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M6 18 17.94 6M18 18 6.06 6"/>
            </svg>
        </Button>
    );
};