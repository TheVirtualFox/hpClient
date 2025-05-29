import {Outlet} from 'react-router-dom'
import {Navigation} from '../components/Navigation'
import {Header} from '../components/Header'
import {isConnectedSelector, useGlobalStore} from '../store/useGlobalStore'

export const MainLayout = () => {
    const isConnected = useGlobalStore(isConnectedSelector);
    if (!isConnected) {
        return <div>соединение...</div>;
    }
    return (
        <div className="p-4">
            <Header />
            <Outlet />
            <Navigation />
        </div>
    )
}
