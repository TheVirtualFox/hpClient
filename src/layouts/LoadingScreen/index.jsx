import {useLottie} from "lottie-react";
import connectingIcon from "./wired-outline-726-wireless-connection-hover-pinch.json";

const connectingIconOptions = {
    animationData: connectingIcon,
    loop: true,
    autoplay: true,
};
export const LoadingScreen = () => {
    const { View  } = useLottie(connectingIconOptions);
    return (
        <div className="border flex flex-col items-center justify-center h-full">
            <div className="w-12 h-12">
                {View}
            </div>
            <div className="">Соединение...</div>
        </div>
    );
};