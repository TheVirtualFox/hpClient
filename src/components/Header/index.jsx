import {serverTimestampSelector, useGlobalStore} from "../../store/useGlobalStore.js";

export const Header = () => {
    const serverTimestamp = useGlobalStore(serverTimestampSelector);
    return <>Header {serverTimestamp}</>;
};