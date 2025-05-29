import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

const getInitState = () => ({
    isConnected: false,
    controlPanel: { isManualControl: false, pump: false, light: false, air: false, fan: false},
    relaysState: { pump: false, light: false, air: false, fan: false },
    serverTimestamp: null,
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

export const setServerTimestamp = (serverTimestamp) => {
    set({serverTimestamp});
};

export const setRelaysState = (relaysState) => {
    set({relaysState});
};

export const isConnectedSelector = (state) => state.isConnected;

export const controlPanelSelector = (state) => state.controlPanel;

export const serverTimestampSelector = (state) => state.serverTimestamp;

export const relaysStateSelector = (state) => state.relaysState;