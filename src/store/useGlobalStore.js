import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

const getInitState = () => ({
    isConnected: false,
    controlPanel: {isManualControl: false, pump: false, light: false, air: false, fan: false},
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

export const isConnectedSelector = (state) => state.isConnected;

export const controlPanelSelector = (state) => state.controlPanel;