import type {Column} from "~/types";
import {nanoid} from "nanoid";

export const COLUMNS_DATA =  ref<Column[]>([
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
    {
        id: nanoid(),
        title: "In Progress",
        tasks: []
    },
    {
        id: nanoid(),
        title: "QA",
        tasks: []
    },
    {
        id: nanoid(),
        title: "Complete",
        tasks: []
    },
    {
        id: nanoid(),
        title: "En dév",
        tasks: []
    },
    {
        id: nanoid(),
        title: "En dév",
        tasks: []
    }
]);
