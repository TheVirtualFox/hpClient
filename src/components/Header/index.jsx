import {
    isConnectedSelector,
    secondsOfDaySelector,
    secondsOfDayStringSelector,
    serverTimestampSelector,
    useGlobalStore
} from "../../store/useGlobalStore.js";
import {useState} from "react";
import { Button, Drawer, DrawerHeader, DrawerItems, ToggleSwitch } from "flowbite-react";

const KeyboardOutline = () => (
    <svg className="w-6 h-6 text-gray-800 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
         width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" strokeLinecap="square" strokeWidth="1" d="M8 15h7.01v.01H15L8 15Z"/>
        <path stroke="currentColor" strokeLinecap="square" strokeWidth="1"
              d="M20 6H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1Z"/>
        <path stroke="currentColor" strokeLinecap="square" strokeWidth="1"
              d="M6 9h.01v.01H6V9Zm0 3h.01v.01H6V12Zm0 3h.01v.01H6V15Zm3-6h.01v.01H9V9Zm0 3h.01v.01H9V12Zm3-3h.01v.01H12V9Zm0 3h.01v.01H12V12Zm3 0h.01v.01H15V12Zm3 0h.01v.01H18V12Zm0 3h.01v.01H18V15Zm-3-6h.01v.01H15V9Zm3 0h.01v.01H18V9Z"/>
    </svg>
);

const Watch = () => {
    const secondsOfDayString = useGlobalStore(secondsOfDayStringSelector);

    return <div className="text-sm text-white">{secondsOfDayString}</div>;
}

const ControlPanel = () =>  {
    const [isOpen, setIsOpen] = useState(false);
    const handleClose = () => setIsOpen(false);
    return (
        <>

                <button
                    onClick={() => setIsOpen(true)}
                    className="text-white"
                >
                    <KeyboardOutline/>
                </button>

                <Drawer open={isOpen} onClose={handleClose} position={"right"} edge className="duration-700 ease-in-out">
                    <DrawerHeader title="Панель управления" />
                    <DrawerItems>

                        <div className="flex flex-col gap-1">
                            <div className="border p-2">
                                <ToggleSwitch checked={true} label="Ручное управление" onChange={() => {} } />

                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                    Все оборудование выключится и будет управляться
                                    с панели управления
                                </p>
                            </div>


                            <div className="flex flex-col gap-1 border p-2">
                                <ToggleSwitch checked={true} className="flex items-center" sizing="sm" label="Насос" onChange={() => {} } />
                                <ToggleSwitch checked={true} className="flex items-center" sizing="sm" label="Лампы" onChange={() => {} } />
                                <ToggleSwitch checked={true} className="flex items-center" sizing="sm" label="Аэратор" onChange={() => {} } />
                                <ToggleSwitch checked={true} className="flex items-center" sizing="sm" label="Вентиляция" onChange={() => {} } />
                            </div>
                        </div>

                    </DrawerItems>
                </Drawer>



        </>);
};

export const Header = () => {
    const serverTimestamp = useGlobalStore(serverTimestampSelector);
    const secondsOfDayString = useGlobalStore(secondsOfDayStringSelector);
    const isConnected = useGlobalStore(isConnectedSelector);

    return (
        <div className="h-12 bg-gray-700 flex justify-center items-center">
            <div className="max-w-lg px-3 w-full flex justify-between items-center">
                <div
                    className={`animate-pulse1 w-52 ${isConnected ? "bg-green-400" : "bg-pink-400"} h-12 absolute top-0 -left-[50px] -skew-x-[25deg]`}
                ></div>

                <div className="flex gap-3 items-center z-1 relative">
                    {/*{#if config[$page.route.id]?.backUrl}*/}
                    {/*<a href={config[$page.route.id]?.backUrl ?? "/"} color="alternative">*/}
                    {/*    <ArrowLeftOutline size="lg" color="white"/>*/}
                    {/*</a>*/}
                    {/*{/if}*/}

                    <span className="text-xl font-semibold text-white flex items-center">
                Монитор
                    </span>
                </div>
                <div className="flex gap-2 items-center">
                    <Watch />
                    <ControlPanel />
                </div>

            </div>
        </div>

        )


};