import { Button, Drawer, DrawerHeader, DrawerItems } from "flowbite-react";
import { useState } from "react";
import {removePreset} from "./usePresetForm.jsx";
import {useNavigate, useParams} from "react-router-dom";
import {useRoute} from "../../../service/useRoute.jsx";

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

                <Button className="text-pink-700 bg-gray-50 border p-3 rounded-sm" onClick={() => setIsOpen(true)}>
                    <svg className="w-5 h-5" width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 7V18C6 19.1046 6.89543 20 8 20H16C17.1046 20 18 19.1046 18 18V7M6 7H5M6 7H8M18 7H19M18 7H16M10 11V16M14 11V16M8 7V5C8 3.89543 8.89543 3 10 3H14C15.1046 3 16 3.89543 16 5V7M8 7H16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </Button>

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