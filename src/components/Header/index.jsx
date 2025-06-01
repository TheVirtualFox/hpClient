import {Watch} from "./Watch.jsx";
import {ControlPanel} from "./ControlPanel/index.jsx";
import {Link, matchPath, useLocation} from "react-router-dom";
import {useRoute} from "../../service/useRoute.jsx";



export const Header = () => {

    const {back, label} = useRoute();



    return (<div className="h-full bg-gray-700 flex justify-center items-center">
            <div className="max-w-lg px-3 w-full flex justify-between items-center">
                <div
                    className={`animate-pulse1 w-52 bg-green-400 h-[50px] absolute top-0 -left-[50px] -skew-x-[25deg]`}
                ></div>

                <div className="flex gap-3 items-center z-1 relative">

                    {back && (<Link to={back} color="alternative">
                        на
                    </Link>)}



                    <span className="text-xl font-semibold text-white flex items-center">{label}</span>
                </div>
                <div className="flex gap-2 items-center">
                    <Watch/>
                    <ControlPanel/>
                </div>

            </div>
        </div>)
};