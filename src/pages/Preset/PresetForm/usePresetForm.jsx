import {create} from 'zustand'
import {devtools} from 'zustand/middleware'
import {v4 as uuidv4} from 'uuid';
import {WsService} from "../../../service/WsService.js";

const getInitState = () => ({
    label: '',
    pump: [],
    light: [],
    air: [],
    fan: [],
    desc: '',
    errors: {}
});


export const usePresetForm = create(devtools(getInitState));

const get = usePresetForm.getState;
const set = usePresetForm.setState;

export const onLabelChange = (e) => {
    const value = e.target.value;
    set({
        label: value,
        errors: {
            ...get().errors,
            label: validateLabel(value)
        }
    });
};
export const labelErrorSelector = (state) => state.errors?.label;

const validateLabel = (value) => {
    if (!value.length) {
        return "Должен быть больше двух символов";
    }

    return null;
}

export const labelSelector = (state) => state.label;

export const onDescChange = (e) => {
    set({desc: e.target.value});
};
export const descSelector = (state) => state.desc;

const setDeviceSchedule = (device, schedule) => {
    set({
        [device]: schedule,
        errors: {
            ...get().errors,
            [device]: validateDevice(device, schedule)
        }
    });
};

const addTimeRange = (device, range) => {
    const schedule = get()[device];
    setDeviceSchedule(device, [...schedule, {...range, id: uuidv4() }]);
};
export const addNewTimeRange = (device) => {
    const schedule = get()[device];
    if (schedule.length) {
        const {on, off} = schedule[schedule.length - 1];
        addTimeRange(device, {on: on + 60 * 60 , off: off + 60 * 60});
    } else {
        addTimeRange(device, {on: 12 * 3600, off: 12 * 3600 + 60 * 60});
    }
};
export const removeTimeRange = (device, id) => {
    const schedule = get()[device];
    setDeviceSchedule(device, schedule.filter(({id: k}) => k !== id));
}
export const setTimeRange = (device, id, type, value) => {
    const schedule = get()[device];
    const range = schedule.find(({id: k}) => k === id);
    range[type] = value;
    setDeviceSchedule(device,[...schedule]);
};

// Поиск пересечений: возвращает массив конфликтных индексов
const findOverlappingIndices = (intervals) => {
    const overlapping = new Set();

    const valid = intervals
        .map(({ on, off, id }, index) => ({
            start: Math.min(on, off),
            end: Math.max(on, off),
            index,
            id
        }))
        .filter(({ start, end }) => !isNaN(start) && !isNaN(end));

    for (let i = 0; i < valid.length; i++) {
        for (let j = i + 1; j < valid.length; j++) {
            const a = valid[i];
            const b = valid[j];
            if (Math.max(a.start, b.start) < Math.min(a.end, b.end)) {
                overlapping.add(a.id);
                overlapping.add(b.id);
            }
        }
    }

    return Array.from(overlapping);
};

const isValid = () => {
    const errors = !!Object.values(get().errors).filter((error) => error && ( typeof error === "string" || Object.values(error).length > 0 )).length;

    return errors;
};


const ws = new WsService();
const getPreset = () => {
    const {label, pump, light,air,fan, desc} = get();
    const cleanSchedule = (schedule) => {
        return schedule.map(({on, off}) => ({on, off}));
    };
    return {
        label,

        pump: cleanSchedule(pump),
        light:  cleanSchedule(light),
        air:  cleanSchedule(air),
        fan:  cleanSchedule(fan),
        desc
    };
};

const validate = () => {
    const {label, pump, light,air,fan} = get();
    onLabelChange({target: {value: label}});
    setDeviceSchedule('pump', [...pump]);
    setDeviceSchedule('light', [...light]);
    setDeviceSchedule('air', [...air]);
    setDeviceSchedule('fan', [...fan]);
}

export const onSavePreset = async () => {
    validate();
    const errors = isValid();
    debugger
    if (errors) {
        console.log("Ошибки в форме");
        return;
    }
    const preset = getPreset();
    await ws.sendPromiseMessage({
        action: "SAVE_PRESET_REQ",
        payload: preset
    });

};

const validateDevice = (device, schedule) => {
    const errors = {};
    const overlaps = findOverlappingIndices(schedule);

    // Проверка пересечений
    if (overlaps.length > 0) {
        overlaps.forEach((id) => {
            errors[id] = {
                ...(errors[id] || {}),
                on: "Пересечение диапазона",
                off: "Пересечение диапазона",
            };
        });
    }

    // Проверка "on < off"
    schedule.forEach((item) => {
        if (item.on >= item.off) {
            errors[item.id] = {
                ...(errors[item.id] || {}),
                on: "Начало должно быть раньше конца",
                off: "Конец должен быть позже начала",
            };
        }
    });
    return errors;
}



export const reset = () => {
    set(getInitState());
};