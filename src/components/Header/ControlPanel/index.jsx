import {Drawer, DrawerHeader, DrawerItems} from "flowbite-react";
import {KeyboardIcon} from "./KeyboardIcon.jsx";
import {useState} from "react";
import {Panel} from "./Panel.jsx";

export const ControlPanel = () => {
    const [isOpen, setIsOpen] = useState(false);
    const handleClose = () => setIsOpen(false);
    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="text-white"
            >
                <KeyboardIcon/>
            </button>
            <Drawer open={isOpen} onClose={handleClose} position={"right"} edge className="duration-300 ease-in-out">
                <DrawerHeader title="Панель управления" titleIcon={ () => null } />
                {/*<div className={"mb-2 -mt-2 p-1 text-md  text-gray-700 font-medium "}>Панель управления</div>*/}
                <DrawerItems>
                    <Panel/>
                </DrawerItems>
            </Drawer>
        </>);
};
