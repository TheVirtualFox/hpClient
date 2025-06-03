import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

const getInitState = () => ({
    isConnected: false,
    controlPanel: { isManualControl: false, pump: false, light: false, air: false, fan: false},
    relaysState: { pump: false, light: false, air: false, fan: false },
    serverTimestamp: null,
    presetsList: [],
    currentPreset: null,
    secondsOfDay: 0,
});

export const useGlobalStore = create(devtools(getInitState));

const get = useGlobalStore.getState;
const set = useGlobalStore.setState;

export const setIsConnected = (isConnected) => {
    set({isConnected});
};

export const setControlPanel = (controlPanel) => {
    set({controlPanel});
}

export const setPresetsList = (presetsList) => {
    console.log(presetsList);
    set({presetsList});
};

let secondsOfDayInterval = null;
export const setSecondsOfDay = (secondsOfDay) => {
    set({secondsOfDay});
    if (secondsOfDayInterval) {
        clearInterval(secondsOfDayInterval);
        secondsOfDayInterval = null;
    }
    secondsOfDayInterval = setInterval(() => {
        set({secondsOfDay: get().secondsOfDay + 1 });
    }, 1000);
}

export const setServerTimestamp = (serverTimestamp) => {
    set({serverTimestamp});
    setSecondsOfDay(serverTimestamp % 86400 + 1);
};

export const setRelaysState = (relaysState) => {
    set({relaysState});
};

export const setCurrentPreset = (currentPreset) => {
    set({currentPreset});
};

export const isConnectedSelector = (state) => state.isConnected;

export const controlPanelSelector = (state) => state.controlPanel;

export const serverTimestampSelector = (state) => state.serverTimestamp;

export const relaysStateSelector = (state) => state.relaysState;

export const currentPresetSelector = (state) => state.currentPreset;

export const secondsOfDaySelector = (state) => state.secondsOfDay;



export const secondsOfDayToHMS = (secondsOfDay) => {
    const h = Math.floor(secondsOfDay / 3600);
    const m = Math.floor((secondsOfDay % 3600) / 60);
    const s = secondsOfDay % 60;
    return {h,m,s};
}

export const secondsOfDayToString = (secondsOfDay) => {
    const {h,m,s} = secondsOfDayToHMS(secondsOfDay);
    const hStr = h.toString().padStart(2, '0');
    const mStr = m.toString().padStart(2, '0');
    const sStr = s.toString().padStart(2, '0');
    return `${hStr}:${mStr}:${sStr}`;
}
export const secondsOfDayToDate = (secondsOfDay) => {
    const {h,m,s} = secondsOfDayToHMS(secondsOfDay);
    const date = new Date();
    date.setUTCFullYear(0,0,0);
    date.setHours(h,m,s, 0);
    return date;
}
export const dateToSecondsOfDay = (date = new Date()) => {
    const h = date.getHours();
    const m = date.getMinutes();
    const s = date.getSeconds();
    return HMSToSecondsOfDay({h,m,s});
};
export const HMSToSecondsOfDay = ({h,m,s}) => {
    return h * 3600 + m * 60 + s;
};
export const secondsOfDayStringSelector = (state) => secondsOfDayToString(state.secondsOfDay);