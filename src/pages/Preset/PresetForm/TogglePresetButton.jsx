import {useParams} from "react-router-dom";
import {Button} from "flowbite-react";
import React from "react";
import {currentPresetSelector, useGlobalStore} from "../../../store/useGlobalStore.js";
import {togglePreset} from "./usePresetForm.jsx";
import "./togglePresetButton.css";

export const TogglePresetButton = () => {
    const {id} = useParams();
    const currentPreset = useGlobalStore(currentPresetSelector);
    const onClick = async () => {
        await togglePreset();
    };
    const isActive = id === currentPreset?.id;
    return (
        <>
            {/*<Button onClick={onClick} type="submit" className="bg-green-600 text-white px-4 py-2 rounded">*/}
            {/*    {isActive ? 'Выкл' : 'Включить'}*/}
            {/*</Button>*/}

            <input checked={isActive} onChange={onClick} className="tgl tgl-skewed" id="cb3" type="checkbox" />
            <label className="tgl-btn" data-tg-off="Не активирован" data-tg-on="Активирован" htmlFor="cb3"></label>
            </>

            );

            };