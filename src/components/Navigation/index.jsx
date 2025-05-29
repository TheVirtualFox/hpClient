import {Link} from "react-router-dom";

export const Navigation = () => {
    return <nav className="flex gap-4 mb-6">
        <Link to="/" className="text-blue-600 hover:underline">Монитор</Link>
        <Link to="/presets" className="text-blue-600 hover:underline">Пресеты</Link>
        <Link to="/config" className="text-blue-600 hover:underline">Настройки</Link>
    </nav>;
};