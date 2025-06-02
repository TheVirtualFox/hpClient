import React, {memo} from "react";
import {useFormikContext} from "formik";
import {Button} from "flowbite-react";
import {TimePicker} from "./TimePicker.jsx";

export const RangeTimePickerItem = memo(({name, push, remove}) => {
    const { values: val, setFieldValue } = useFormikContext();
    const values = val?.[name];

    return (<>
        <div className="">
            {values.map((item, index) => (



                <div key={index} className="flex items-center gap-3">
                    <TimePicker  />
                    <TimePicker  />
                    <button type="button" onClick={() => remove(index)} className="text-red-500">
                        ✕
                    </button>
                </div>
            ))}

        </div>
    </>);
});
