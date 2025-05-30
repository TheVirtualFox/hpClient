import {Link} from "react-router-dom";
import {useLottie} from "lottie-react";
import presetIcon from './system-regular-44-folder-hover-folder.json';
import monitorIcon from './system-regular-15-ratio-hover-ratio.json';
import configIcon from './system-regular-63-settings-cog-hover-cog-1.json';
import debugIcon from './system-regular-34-code-hover-code.json';











const presetIconOptions = {
    animationData: presetIcon,
    loop: false,
    autoplay: false,
};
const monitorIconOptions = {
    animationData: monitorIcon,
    loop: false,
    autoplay: false,
};
const configIconOptions = {
    animationData: configIcon,
    loop: false,
    autoplay: false,
};
const debugIconOptions = {
    animationData: debugIcon,
    loop: false,
    autoplay: false,
};

const NavigationItem = ({ label, icon, to }) => {
    const { View, playSegments  } = useLottie(icon);

    return (
        <Link
            to={to}
            type="button"
            onClick={() => playSegments([0, icon.animationData.op], true)}
            className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 group"
        >
            <div className="h-7 w-7">
                {View}
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400 ">
        {label}
      </span>
        </Link>
    );
};

export const Navigation = () => {
    return <>
        <nav
            className="fixed bottom-0 left-0 z-20 w-full h-16 bg-white border-t border-gray-200 dark:bg-gray-700 dark:border-gray-600">
            <div className="grid h-full max-w-lg grid-cols-4 mx-auto font-medium">
                <NavigationItem to="/" label={'Монитор'} icon={monitorIconOptions} />
                <NavigationItem to="/presets" label={'Пресеты'} icon={presetIconOptions} />
                <NavigationItem to="/config" label={'Настройки'} icon={configIconOptions} />
                <NavigationItem to="/debug" label={'Отладка'} icon={debugIconOptions} />
            </div>
        </nav>
    </>;
};