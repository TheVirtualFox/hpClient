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

                <div className="flex gap-2 items-center z-1 relative items-center">

                    {back && (<Link to={back} color="alternative">
                        <svg className="w-5 h-5 text-white" aria-hidden="true"
                             xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="m15 19-7-7 7-7"/>
                        </svg>
                    </Link>)}



                    <span className="text-lg font-semibold text-white flex items-center">{label}</span>
                </div>
                <div className="flex gap-2 items-center">
                    <Watch/>
                    <ControlPanel/>
                </div>

            </div>
        </div>)
};