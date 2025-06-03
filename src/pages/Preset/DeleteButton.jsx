import { Button, Drawer, DrawerHeader, DrawerItems } from "flowbite-react";
import { useState } from "react";
import {removePreset} from "./PresetForm/usePresetForm.jsx";
import {useNavigate} from "react-router-dom";
import {useRoute} from "../../service/useRoute.jsx";

export const DeleteButton = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleClose = () => setIsOpen(false);

    const navigate = useNavigate();

    const {back} = useRoute();
    const onClick = async () => {
        await removePreset();
        navigate(back);
    };

    return (
        <>

                <Button className="bg-pink-700" onClick={() => setIsOpen(true)}>Удалить</Button>

            <Drawer open={isOpen} onClose={handleClose} position="bottom">
                <DrawerHeader title="Внимение" />
                <DrawerItems>
                    <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
                        Вы действительно хлтите удалить пресет?
                    </p>
                    <div className="flex gap-2">
                        <a
                            href="#"
                            className="ml-auto rounded-lg border border-gray-200 bg-white px-4 py-2 text-center text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-cyan-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
                        >
                            Отмена
                        </a>
                        <Button
                            onClick={onClick}
                            className="inline-flex items-center rounded-lg bg-pink-700 px-4 py-2 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
                        >
                            Удалить
                        </Button>
                    </div>
                </DrawerItems>
            </Drawer>
        </>
    );
}