import React, {useEffect, useRef, useState} from "react";
import {Field, FieldArray, Form, Formik} from "formik";
import * as Yup from "yup";
import {HMSToSecondsOfDay, secondsOfDayToHMS, secondsOfDayToString} from "../../store/useGlobalStore.js";
import {Button, Drawer, DrawerHeader, DrawerItems, HelperText, Label, Textarea, TextInput} from "flowbite-react";
import {Swiper, SwiperSlide} from "swiper/react";
import {DeleteButton} from "./DeleteButton.jsx";
import {AnimatedAccordion} from "../../components/AccordionPanel/index.jsx";


// Поиск пересечений: возвращает массив конфликтных индексов
const findOverlappingIndices = (intervals) => {
    const overlapping = new Set();

    const valid = intervals
        .map(({ on, off }, index) => ({
            start: Math.min(on, off),
            end: Math.max(on, off),
            index,
        }))
        .filter(({ start, end }) => !isNaN(start) && !isNaN(end));

    for (let i = 0; i < valid.length; i++) {
        for (let j = i + 1; j < valid.length; j++) {
            const a = valid[i];
            const b = valid[j];
            if (Math.max(a.start, b.start) < Math.min(a.end, b.end)) {
                overlapping.add(a.index);
                overlapping.add(b.index);
            }
        }
    }

    return Array.from(overlapping);
};

const Input = ({label, value, onChange, disabled}) => (
    <div>
        <div className="mb-2 block">
            <Label htmlFor="username3">
                {label}
            </Label>
        </div>
        <TextInput
            id="username" placeholder="Bonnie Green"d
            value={value} onChange={onChange} />
        <HelperText>
            <span className="font-medium">Alright!</span> Username available!
        </HelperText>
    </div>
);


const TextareaComponent = () =>{
    return (
        <div className="max-w-md">
            <div className="mb-2 block">
                <Label htmlFor="comment">Описание</Label>
            </div>
            <Textarea
                className="rounded-sm"
                id="comment" placeholder="Leave a comment..." required rows={4} />
        </div>
    );
}

export const PumpForm = () => {
    return (
        <Formik
            initialValues={{
                label: "",
                pump: [{ on: 0, off: 3600 }],
                light: [{ on: 0, off: 3600 }],
            }}
            validationSchema={Yup.object({
                label: Yup.string().required("Название обязательно"),
            })}
            validate={(values) => {
                const errors = {};
                const overlaps = findOverlappingIndices(values.pump);

                // Проверка пересечений
                if (overlaps.length > 0) {
                    errors.pump = [];
                    overlaps.forEach((index) => {
                        errors.pump[index] = {
                            ...(errors.pump[index] || {}),
                            on: "Пересечение диапазона",
                            off: "Пересечение диапазона",
                        };
                    });
                }

                // Проверка "on < off"
                values.pump.forEach((item, index) => {
                    if (item.on >= item.off) {
                        if (!errors.pump) errors.pump = [];
                        errors.pump[index] = {
                            ...(errors.pump[index] || {}),
                            on: "Начало должно быть раньше конца",
                            off: "Конец должен быть позже начала",
                        };
                    }
                });

                return errors;
            }}

            onSubmit={(values) => {
                console.log("Отправлено:", values);
            }}
        >
            {({ values, setFieldValue }) => (
                <Form className="bg-white rounded shadow max-w-md">

                    <div className="p-4 flex flex-col gap-2">
                        <Input label={"Название"} value={values.label} onChange={(e) => {
                            setFieldValue(`label`, e?.target?.value)
                        }
                        } />

                        <TextareaComponent />
                    </div>


                    {/*<div>*/}
                    {/*    <label>Название</label>*/}
                    {/*    <Field name="label" className="border px-2 py-1 w-full" />*/}
                    {/*    <ErrorMessage name="label" component="div" className="text-red-500 text-sm" />*/}
                    {/*</div>*/}


                    <div>
                        <AnimatedAccordion label="Расписание работы насоса">
                            <FieldArray name="pump">
                                {({ push, remove }) => (
                                    <RangeTimePicker name={"pump"} values={values.pump} remove={remove} push={push} setFieldValue={setFieldValue}  />
                                )}
                            </FieldArray>
                        </AnimatedAccordion>
                        <AnimatedAccordion label="Расписание работы лампы">
                            <FieldArray name="light">
                                {({ push, remove }) => (
                                    <RangeTimePicker name={"light"} values={values.light} remove={remove} push={push} setFieldValue={setFieldValue}  />
                                )}
                            </FieldArray>
                        </AnimatedAccordion>
                        <AnimatedAccordion label="Расписание работы аэратора">
                            <FieldArray name="air">
                                {({ push, remove }) => (
                                    <RangeTimePicker name={"air"} values={values.air} remove={remove} push={push} setFieldValue={setFieldValue}  />
                                )}
                            </FieldArray>
                        </AnimatedAccordion>
                        <AnimatedAccordion label="Расписание работы вентиляции">
                            <FieldArray name="fan">
                                {({ push, remove }) => (
                                    <RangeTimePicker name={"fan"} values={values.fan} remove={remove} push={push} setFieldValue={setFieldValue}  />
                                )}
                            </FieldArray>
                        </AnimatedAccordion>
                    </div>

                    <div className="flex p-4">
                        <div className="flex gap-2">
                            <Button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
                                Включить
                            </Button>

                            <DeleteButton />
                        </div>
                        <div className="flex ml-auto">
                            <Button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
                                Сохранить
                            </Button>
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

const RangeTimePicker = ({name, push, remove, values = [], setFieldValue}) => {
    return (<>
        <div className="space-y-3">
            {values.map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                    <Field name={`${name}.${index}.on`}>
                        {({ field, meta }) => (
                            <>

                                <TimePicker onChange={
                                    (e) =>
                                        setFieldValue(`${name}.${index}.on`, e)
                                } value={field.value} error={meta.error} />



                            </>
                        )}
                    </Field>
                    <Field name={`${name}.${index}.off`}>
                        {({ field, meta }) => (
                            <>
                                <TimePicker onChange={
                                    (e) =>
                                        setFieldValue(`${name}.${index}.off`, e)
                                } value={field.value} error={meta.error} />
                            </>
                        )}
                    </Field>
                    <button type="button" onClick={() => remove(index)} className="text-red-500">
                        ✕
                    </button>
                </div>
            ))}

            <Button
                type="button"
                onClick={() => {
                    if (values.length) {
                        const {on, off} = values[values.length - 1];
                        push({ on: off + 30 * 60, off: off + 60 * 60 });
                    } else {
                        push({ on: 30 * 60, off: 12 * 3600 + 30 * 60 })
                    }
                }}
                size="sm"
                className="bg-blue-500 text-white rounded !ring-0"
            >
                Добавить
            </Button>
        </div>
    </>);
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

