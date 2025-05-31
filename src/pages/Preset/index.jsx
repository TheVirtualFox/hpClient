import {Controller, useFieldArray, useForm} from "react-hook-form";
import {Button, Drawer, DrawerHeader, DrawerItems, HelperText, Label, TextInput} from "flowbite-react";
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
            on: yup.string().required("Обязательно").matches(/^\d{2}:\d{2}$/, "Формат HH:MM"),
            off: yup.string().required("Обязательно").matches(/^\d{2}:\d{2}$/, "Формат HH:MM"),
        })
    ),
});


const PresetForm = () => {
    const {
        control,
        watch,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            label: "",
            pump: [{ on: "", off: "" }],
        },
        resolver: yupResolver(schema),
    });

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
            <form onSubmit={handleSubmit(onSubmit)}>
                <InputControl name="label" control={control} label="Название пресета" />

                <div className="space-y-2">
                    <h3 className="font-semibold text-gray-700">Расписание насоса</h3>

                    {fields.map((field, index) => (


                        <div key={field.id} className="flex items-center gap-2">
                            <RangeTimeInput
                                name={`pump.${index}`}
                                control={control}
                                error={errors.pump?.[index]}
                            />
                            {/*// <InputControl*/}
                            {/*//     name={`pump.${index}.from`}*/}
                            {/*//     control={control}*/}
                            {/*//     label="С"*/}
                            {/*//     type="time"*/}
                            {/*//     error={errors.pump?.[index]?.from?.message}*/}
                            {/*// />*/}
                            {/*// <InputControl*/}
                            {/*//     name={`pump.${index}.to`}*/}
                            {/*//     control={control}*/}
                            {/*//     label="До"*/}
                            {/*//     type="time"*/}
                            {/*//     error={errors.pump?.[index]?.to?.message}*/}
                            {/*// />*/}
                            <Button color="failure" size="xs" onClick={() => remove(index)} type="button">
                                ✕
                            </Button>


                        </div>
                    ))}

                    <Button type="button" size="sm" onClick={() => append({ on: "", off: "" })}>
                        + Добавить интервал
                    </Button>
                </div>



            </form>






        </div>
    );
};
// value: 777

const TimeInputControl = ({ name, control,error, disabled = false }) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <TimePicker
                    value={field.value}
                    onChange={field.onChange}
                    disabled={disabled}
                    error={error}
                />
            )}
        />
    );
};

const RangeTimeInput = ({name, control, error}) => {
    return (<>
        <TimeInputControl name={`${name}.on`} control={control} error={`${error}.on`} />
        <TimeInputControl name={`${name}.off`} control={control} error={`${error}.off`} />
    </>);
};


export const PresetPage = () => {
    return <>
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

const TimePicker = ({placeholder, onChange, value = 0, label = "Время"}) => {
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
    <TextInput placeholder={placeholder} onClick={() => setIsOpen(true) } value={inputValue} />
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
                                    <div className="flex items-center justify-center h-12 text-xl font-medium">
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
                                    <div className="flex items-center justify-center h-12 text-xl font-medium">
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
                                    <div className="flex items-center justify-center h-12 text-xl font-medium">
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