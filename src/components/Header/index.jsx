import {Watch} from "./Watch.jsx";
import {ControlPanel} from "./ControlPanel/index.jsx";


export const Header = () => {
    return (<div className="h-full bg-gray-700 flex justify-center items-center">
            <div className="max-w-lg px-3 w-full flex justify-between items-center">
                <div
                    className={`animate-pulse1 w-52 bg-green-400 h-[50px] absolute top-0 -left-[50px] -skew-x-[25deg]`}
                ></div>

                <div className="flex gap-3 items-center z-1 relative">
                    {/*{#if config[$page.route.id]?.backUrl}*/}
                    {/*<a href={config[$page.route.id]?.backUrl ?? "/"} color="alternative">*/}
                    {/*    <ArrowLeftOutline size="lg" color="white"/>*/}
                    {/*</a>*/}
                    {/*{/if}*/}

                    <span className="text-xl font-semibold text-white flex items-center">Монитор</span>
                </div>
                <div className="flex gap-2 items-center">
                    <Watch/>
                    <ControlPanel/>
                </div>

            </div>
        </div>)
};