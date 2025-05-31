import {Controller, FormProvider, useFieldArray, useForm, useFormContext, useWatch} from "react-hook-form";
import {
    Accordion, AccordionContent,
    AccordionPanel, AccordionTitle,
    Button, createTheme,
    Drawer,
    DrawerHeader,
    DrawerItems,
    HelperText,
    Label,
    TextInput
} from "flowbite-react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {useEffect, useRef, useState} from "react";
import {
    dateToSecondsOfDay, HMSToSecondsOfDay,
    secondsOfDayToDate,
    secondsOfDayToHMS,
    secondsOfDayToString
} from "../../store/useGlobalStore.js";

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import {PumpForm} from "./Form.jsx";


const Input = ({label, value, onChange, disabled}) => (
    <div>
        <div className="mb-2 block">
            <Label htmlFor="username3" color="success">
                {label}
            </Label>
        </div>
        <TextInput id="username" placeholder="Bonnie Green" required color="success" value={value} onChange={onChange} />
        <HelperText>
            <span className="font-medium">Alright!</span> Username available!
        </HelperText>
    </div>
);

const InputControl = ({ name, control, label, disabled = false }) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <Input
                    label={label}
                    value={field.value}
                    onChange={field.onChange}
                    disabled={disabled}
                />
            )}
        />
    );
};

const schema = yup.object().shape({
    label: yup.string().required("Название обязательно").min(2, "Минимум 2 символа"),
    pump: yup.array().of(
        yup.object().shape({
            on: yup.number().required("Обязательно"),
            off: yup.number().required("Обязательно"),
        })
    ),
});


const PresetForm = () => {
    const methods = useForm({
        defaultValues: {
            label: "",
            pump: [{ on: 0, off: 0 }],
        },
        resolver: yupResolver(schema),
        mode: 'onChange',
        shouldFocusError: true
    });

    const {
        control,
        watch,
        handleSubmit,
        formState: { errors },
    } = methods;

    const { fields, append, remove } = useFieldArray({
        control,
        name: "pump",
    });

    const form = watch();

    const onSubmit = () => {};



    return (
        <div className="flex flex-col gap-4 max-w-sm p-4 bg-white rounded shadow">
            {JSON.stringify(errors)}
            {JSON.stringify(form)}

            <FormProvider {...methods}>
                <PumpValidator />
                <form onSubmit={handleSubmit(onSubmit)}>
                    <InputControl name="label" control={control} label="Название пресета" />

                    <div className="space-y-2">
                        <h3 className="font-semibold text-gray-700">Расписание насоса</h3>

                        {fields.map((field, index) => (


                            <div key={field.id} className="flex items-center gap-2">
                                 <TimeInputControl
                                     index={index}
                                     name={`pump.${index}.on`}
                                     control={control}
                                 />
                                 <TimeInputControl
                                     index={index}
                                     name={`pump.${index}.off`}
                                     control={control}
                                 />
                                <Button color="failure" size="xs" onClick={() => remove(index)} type="button">
                                    ✕
                                </Button>


                            </div>
                        ))}

                        <Button type="button" size="sm" onClick={() => append({ on: 0, off: 0 })}>
                            + Добавить интервал
                        </Button>
                    </div>



                </form>



            </FormProvider>




        </div>
    );
};
// value: 777

const TimeInputControl = ({ index, name, control, disabled = false }) => {
    const value = useWatch({ control, name });
    return (
        <Controller
            key={`pump-${index}-on`}
            name={`pump.${index}.on`}


            // name={name}
            control={control}
            render={({ field, fieldState }) => (
                <>
                    {JSON.stringify(fieldState?.error?.message)}
                    <TimePicker
                        value={field.value}
                        onChange={field.onChange}
                        disabled={disabled}
                        error={fieldState?.error}
                    />
                </>
            )}
        />
    );
};

const RangeTimeInput = ({name, control, error}) => {
    return (<>
        {/*{JSON.stringify(error)}*/}
        <div className="flex flex-col">
            <div className="flex gap-2 items-center">
                <TimeInputControl name={`${name}.on`} control={control} error={error?.on} />
                <TimeInputControl name={`${name}.off`} control={control} error={error?.off} />
            </div>
            {/*<div className={""}>{error?.on?.message}</div>*/}
        </div>
    </>);
};


export const PresetPage = () => {
    return <>
        {/*<Accordion alwaysOpen>*/}
        {/*    <AccordionPanel>*/}
        {/*        <AccordionTitle>Расписание работы насоса</AccordionTitle>*/}
        {/*        <AccordionContent>*/}
        {/*            <div className="transition-all duration-300 ease-in-out overflow-hidden">*/}
        {/*                Контент 1*/}
        {/*            </div>*/}
        {/*        </AccordionContent>*/}
        {/*    </AccordionPanel>*/}
        {/*    <AccordionPanel>*/}
        {/*        <AccordionTitle>Расписание работы лампы</AccordionTitle>*/}
        {/*        <AccordionContent>*/}
        {/*            <div className="transition-all duration-300 ease-in-out overflow-hidden">*/}
        {/*                Контент 2*/}
        {/*            </div>*/}
        {/*        </AccordionContent>*/}
        {/*    </AccordionPanel>*/}
        {/*</Accordion>*/}


        <PumpForm />
        <PresetForm />
        PresetPage</>;
};

const HOURS = new Array(24)
    .fill(0)
    .map((_, index) => index.toString().padStart(2, "0"));

const MINUTES = new Array(60)
    .fill(0)
    .map((_, index) => index.toString().padStart(2, "0"));
const SECONDS = MINUTES;

const TimePicker = ({placeholder, onChange, value = 0, error, label = "Время"}) => {
    // const [h, setH] = useState(0);
    // const [m, setM] = useState(0);
    // const [s, setS] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const [inputValue, setInputValue] = useState(secondsOfDayToString(value));

    const swiperHRef = useRef(null);
    useEffect(() => {
        const val = Number(value ?? 0);
        setInputValue(secondsOfDayToString(val));

        // setTimeout(() => {
        //     swiperHRef.current?.update?.();
        //     swiperHRef.current?.updateSlides?.();
        // },100);

        const {h,m,s} = secondsOfDayToHMS(val);
        setSlideH(h);
        setSlideM(m);
        setSlideS(s);



    }, [value, isOpen]);

    const onHourChange = ({activeIndex: hour}) => {
        console.log(hour);
        //setH(hour);
    };
    const onMinuteChange = ({activeIndex: minute}) => {
        console.log(minute);
        //setM(minute);
    };
    const onSecondChange = ({activeIndex: second}) => {
        console.log(second);
        //setS(second);
    };

    const onChangeClick = () => {
        const h = swiperHRef.current.realIndex;
        const m = swiperMRef.current.realIndex;
        const s = swiperSRef.current.realIndex;
        const value = HMSToSecondsOfDay({h,m,s});
        onChange(value);
        setInputValue(secondsOfDayToString(value));
        onClose();
    }

    const onClose = () => {
        setIsOpen(false);
    };

    const setSlideH = (h) => {
        if (swiperHRef.current) {
            swiperHRef.current.slideToLoop(h); // Используй slideToLoop для корректной работы с loop
        }
    }

    const swiperMRef = useRef(null);
    const setSlideM = (m) => {
        if (swiperMRef.current) {
            swiperMRef.current.slideToLoop(m); // Используй slideToLoop для корректной работы с loop
        }
    }

    const swiperSRef = useRef(null);
    const setSlideS = (s) => {
        if (swiperSRef.current) {
            swiperSRef.current.slideToLoop(s); // Используй slideToLoop для корректной работы с loop
        }
    }

    const {h, m, s} = secondsOfDayToHMS(value);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (swiperHRef.current && swiperHRef.current.slideToLoop) {
                swiperHRef.current.slideToLoop(h, 0); // моментальный переход без анимации
            }
            if (swiperMRef.current && swiperMRef.current.slideToLoop) {
                swiperMRef.current.slideToLoop(m, 0); // моментальный переход без анимации
            }
            if (swiperSRef.current && swiperSRef.current.slideToLoop) {
                swiperSRef.current.slideToLoop(s, 0); // моментальный переход без анимации
            }
        }, 50); // задержка позволяет инициализировать loop

        return () => clearTimeout(timer);
    }, [isOpen]);

    return (
<>
    <TextInput placeholder={placeholder} size={"sm"} onClick={() => setIsOpen(true)}
               color={error ? 'failure' : '' }
               value={inputValue} />
    <Drawer open={isOpen} onClose={onClose} position="bottom">
        <DrawerHeader title={label} titleIcon={() => null} />
        <DrawerItems>
            {isOpen && (
                <div className="flex flex-col gap-2">
                    <div className="relative h-72 max-h-72 border overflow-hidden flex gap-1">
                        <div
                            className="h-14 border border-green-500 w-full absolute top-1/2 -translate-y-1/2"></div>

                        <Swiper
                            direction="vertical"
                            centeredSlides={true}
                            slidesPerView={5}
                            spaceBetween={10}
                            // initialSlide={h}

                            className="h-full"
                            onSlideChange={onHourChange}


                            loop={true}
                            onSwiper={(swiper) => {
                                swiperHRef.current = swiper;
                            }}

                        >
                            {HOURS.map((h) => (
                                <SwiperSlide key={h}>
                                    <div className="flex items-center justify-center h-12 text-md font-medium">
                                        {h}
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>

                        <div className="flex items-center justify-center items-center text-xl font-medium">:</div>

                        <Swiper
                            direction="vertical"
                            centeredSlides={true}
                            slidesPerView={5}
                            spaceBetween={10}
                            initialSlide={m}
                            loop={true}
                            className="h-full"
                            onSlideChange={onMinuteChange}
                            onSwiper={(swiper) => (swiperMRef.current = swiper)}
                        >
                            {MINUTES.map((h) => (
                                <SwiperSlide key={h}>
                                    <div className="flex items-center justify-center h-12 text-md font-medium">
                                        {h}
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                        <div className="flex items-center justify-center items-center text-xl font-medium">:</div>
                        <Swiper
                            direction="vertical"
                            centeredSlides={true}
                            slidesPerView={5}
                            spaceBetween={10}
                            initialSlide={s}
                            loop={true}
                            className="h-full"
                            onSlideChange={onSecondChange}
                            onSwiper={(swiper) => (swiperSRef.current = swiper)}
                        >
                            {SECONDS.map((h) => (
                                <SwiperSlide key={h}>
                                    <div className="flex items-center justify-center h-12 text-md font-medium">
                                        {h}
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>


                    </div>

                    <div className="flex gap-1 justify-end">
                        <Button size="sm" onClick={onClose}>Отмена</Button>
                        <Button size="sm" onClick={onChangeClick}>Ок</Button>
                    </div>

                </div>

            )}



        </DrawerItems>
    </Drawer>
</>
    );
};


function PumpValidator() {
    const { control, setError, clearErrors, trigger } = useFormContext();
    const pump = useWatch({ control, name: "pump" });

    useEffect(() => {
        const errors = [];
        // const pump = [...pumpControl].sort(({on: onA}, {on: onB}) => onA - onB);
        for (let i = 0; i < pump.length; i++) {
            const a = pump[i];
            if (typeof a?.on !== "number" || typeof a?.off !== "number" ) continue;

            const aStart = Math.min(a.on, a.off);
            const aEnd = Math.max(a.on, a.off);

            for (let j = 0; j < pump.length; j++) {
                if (i === j) continue;

                const b = pump[j];
                if (typeof b?.on !== "number" || typeof b?.off !== "number" ) continue;

                const bStart = Math.min(b.on, b.off);
                const bEnd = Math.max(b.on, b.off);

                const isOverlap = Math.max(aStart, bStart) < Math.min(aEnd, bEnd);
                if (isOverlap) {
                    errors.push(j);
                    break;
                }
            }
        }

        pump.forEach((_, i) => {
            clearErrors([`pump.${i}.on`, `pump.${i}.off`]);
        });

        pump.forEach((_, i) => {
            if (errors.includes(i)) {
                setError(`pump.${i}.on`, { type: "manual", message: "Пересечение диапазона" });
                setError(`pump.${i}.off`, { type: "manual", message: "Пересечение диапазона" });
            }
        });

        // trigger(["pump", `pump.0.on`, `pump.0.off`, `pump.1.on`, `pump.1.off`]);

    }, [pump, setError, clearErrors, trigger]);

    return null; // Компонент-валидатор ничего не рендерит
}