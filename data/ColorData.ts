import {nanoid} from "nanoid";
import type {ColorInterface} from "~/types";


export const COLOR_LIST: ColorInterface[] = [
    {
        id: nanoid(),
        name: "Gris foncé",
        color: "color_1"
    },
    {
        id: nanoid(),
        name: "Orange",
        color: "color_2"
    },
    {
        id: nanoid(),
        name: "Vert",
        color: "color_3"
    },
    {
        id: nanoid(),
        name: "Amber",
        color: "color_4"
    },
    {
        id: nanoid(),
        name: "Emerald",
        color: "color_5"
    },
    {
        id:  nanoid(),
        name: "Sky",
        color: "color_6"
    }
]