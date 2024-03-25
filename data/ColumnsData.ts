import type {Column} from "~/types";
import {nanoid} from "nanoid";
import {LIST_STATE} from "~/data/StateData";

export const COLUMNS_DATA: Column[]  = [
    {
        id: nanoid(),
        title: "Projet 1",
        tasks : [
            {
                id: nanoid(),
                title: "Initialisation du projet",
                createdAt: new Date(),
                stateId: LIST_STATE[1].id,
                content: ""
            },
            {
                id: nanoid(),
                title: "Mise en place environnement",
                createdAt: new Date(),
                stateId: LIST_STATE[0].id,
                content: ""
            },
            {
                id: nanoid(),
                title: "réfléxion sur ...",
                createdAt: new Date(),
                stateId: LIST_STATE[2].id,
                content: ""
            }
        ]
    },
    {
        id: nanoid(),
        title: "Selected for Dev",
        tasks: [
            {
                id: nanoid(),
                title: "Intégration maquette",
                createdAt: new Date(),
                stateId: LIST_STATE[0].id,
                content: ""
            },
            {
                id: nanoid(),
                title: "Mise à jours librairie",
                createdAt: new Date(),
                stateId: LIST_STATE[3].id,
                content: ""
            }
        ]
    },
    {
        id: nanoid(),
        title: "Documentations",
        tasks: [
            {
                id: nanoid(),
                title: "VueJs",
                createdAt: new Date(),
                stateId: LIST_STATE[2].id,
                content: "Lien de la documentation :"
            },
            {
                id: nanoid(),
                title: "NuxtJs",
                createdAt: new Date(),
                stateId: LIST_STATE[1].id,
                content: ""
            }
        ]
    }
]