import {nanoid} from "nanoid";
import {COLOR_LIST} from "~/data/ColorData";
import type {State} from "~/types";



export const LIST_STATE: State[] = [
    {
        id: nanoid(),
        label: "Ouvert",
        colorId: COLOR_LIST[0].id
    },
    {
        id: nanoid(),
        label: "En cours",
        colorId: COLOR_LIST[11].id
    },
    {
        id: nanoid(),
        label: "Bloqué",
        colorId: COLOR_LIST[8].id
    },
    {
        id: nanoid(),
        label: "Terminé",
        colorId: COLOR_LIST[6].id
    }
]

