import {nanoid} from "nanoid";
import {COLOR_LIST} from "~/data/ColorData";
import type {State} from "~/types";



export const LIST_STATE: State[] = [
    {
        id: nanoid(),
        name: "Ouvert",
        colorId: COLOR_LIST[0].id
    },
    {
        id: nanoid(),
        name: "En cours",
        colorId: COLOR_LIST[11].id
    },
    {
        id: nanoid(),
        name: "Bloqué",
        colorId: COLOR_LIST[8].id
    },
    {
        id: nanoid(),
        name: "Terminé",
        colorId: COLOR_LIST[6].id
    }
]

