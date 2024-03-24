import type {Column} from "~/types";
import {nanoid} from "nanoid";
import {LIST_STATE} from "~/data/StateData";

export const COLUMNS_DATA =  useLocalStorage<Column[]>("trelloBoard", [
    {
        id: nanoid(),
        title: "Projet 1",
        tasks : [
            {
                id: nanoid(),
                title: "Faire ceci",
                createdAt: new Date(),
                stateId: LIST_STATE[1].id
            },
            {
                id: nanoid(),
                title: "Faire ca",
                createdAt: new Date(),
                stateId: LIST_STATE[0].id
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
