import type {Column} from "~/types";
import {nanoid} from "nanoid";

export const COLUMNS_DATA =  useLocalStorage<Column[]>("trelloBoard", [
    {
        id: nanoid(),
        title: "Projet 1",
        tasks : [
            {
                id: nanoid(),
                title: "Faire ceci",
                createdAt: new Date(),
                content: "",
                state: "En cours"
            },
            {
                id: nanoid(),
                title: "Faire ca",
                createdAt: new Date(),
                content: "",
                state: "Terminé"
            }
        ]
    },
    {
        id: nanoid(),
        title: "Selected for Dev",
        tasks: []
    },
]
);
