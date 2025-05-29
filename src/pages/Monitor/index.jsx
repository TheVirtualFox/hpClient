import {relaysStateSelector, useGlobalStore} from "../../store/useGlobalStore.js";

const RelaysMonitor = () => {
    const relaysState = useGlobalStore(relaysStateSelector);
    return <>
        {JSON.stringify(relaysState)}
        <div className="flex items-center justify-center text-gray-800 p-2 bg-gray-50">

            <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6 w-full max-w-6xl">

                <div className="flex items-center p-4 bg-white rounded">
                    <div className="flex flex-shrink-0 items-center justify-center bg-gray-100 h-16 w-16 rounded">
                        <svg className="w-6 h-6 fill-current text-green-700" xmlns="http://www.w3.org/2000/svg"
                             viewBox="0 0 20 20"
                             fill="currentColor">
                            <path fillRule="evenodd"
                                  d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z"
                                  clipRule="evenodd"/>
                        </svg>
                    </div>
                    <div className="flex-grow flex flex-col ml-4">
                        <span className="text-xl font-bold">Насос</span>
                        <div className="flex items-center justify-between">
                            <span className="text-gray-500">Customers last 30 days</span>
                            <span className="text-green-500 text-sm font-semibold ml-2">+28.4%</span>
                        </div>
                    </div>
                </div>


                <div className="flex items-center p-4 bg-white rounded">
                    <div className="flex flex-shrink-0 items-center justify-center bg-gray-100 h-16 w-16 rounded">
                        <svg className="w-6 h-6 fill-current text-green-700" xmlns="http://www.w3.org/2000/svg"
                             viewBox="0 0 20 20"
                             fill="currentColor">
                            <path fillRule="evenodd"
                                  d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z"
                                  clipRule="evenodd"/>
                        </svg>
                    </div>
                    <div className="flex-grow flex flex-col ml-4">
                        <span className="text-xl font-bold">Лампы</span>
                        <div className="flex items-center justify-between">
                            <span className="text-gray-500">Customers last 30 days</span>
                            <span className="text-green-500 text-sm font-semibold ml-2">+28.4%</span>
                        </div>
                    </div>
                </div>


                <div className="flex items-center p-4 bg-white rounded">
                    <div className="flex flex-shrink-0 items-center justify-center bg-gray-100 h-16 w-16 rounded">
                        <svg className="w-6 h-6 fill-current text-green-700" xmlns="http://www.w3.org/2000/svg"
                             viewBox="0 0 20 20"
                             fill="currentColor">
                            <path fillRule="evenodd"
                                  d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z"
                                  clipRule="evenodd"/>
                        </svg>
                    </div>
                    <div className="flex-grow flex flex-col ml-4">
                        <span className="text-xl font-bold">Аэратор</span>
                        <div className="flex items-center justify-between">
                            <span className="text-gray-500">Customers last 30 days</span>
                            <span className="text-green-500 text-sm font-semibold ml-2">+28.4%</span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center p-4 bg-white rounded">
                    <div className="flex flex-shrink-0 items-center justify-center bg-gray-100 h-16 w-16 rounded">
                        <svg className="w-6 h-6 fill-current text-green-700" xmlns="http://www.w3.org/2000/svg"
                             viewBox="0 0 20 20"
                             fill="currentColor">
                            <path fillRule="evenodd"
                                  d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z"
                                  clipRule="evenodd"/>
                        </svg>
                    </div>
                    <div className="flex-grow flex flex-col ml-4">
                        <span className="text-xl font-bold">Вентилятор</span>
                        <div className="flex items-center justify-between">
                            <span className="text-gray-500">Customers last 30 days</span>
                            <span className="text-green-500 text-sm font-semibold ml-2">+28.4%</span>
                        </div>
                    </div>
                </div>

            </div>


        </div>
    </>;
}

export const MonitorPage = () => {
    return <>
        <RelaysMonitor />
        MonitorPage</>;
};