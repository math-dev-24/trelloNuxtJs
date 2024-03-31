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
                content: "",
                checkList: [ {id: nanoid(), content: 'Init git', state: true},{id: nanoid(), content: "Dépôt git", state: false}]
            },
            {
                id: nanoid(),
                title: "Mise en place environnement",
                createdAt: new Date(),
                stateId: LIST_STATE[0].id,
                content: "",
                checkList: [{id: nanoid(), content:'listing des dépendance', state: false}]
            },
            {
                id: nanoid(),
                title: "réfléxion sur ...",
                createdAt: new Date(),
                stateId: LIST_STATE[2].id,
                content: "",
                checkList: []
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
                content: "",
                checkList: []
            },
            {
                id: nanoid(),
                title: "Map()",
                createdAt: new Date(),
                stateId: LIST_STATE[3].id,
                content: `## Exemple d'un map : 
\`content.map(c => c.id == id)\`  `,
                checkList: []
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
                content: `# Lien utile :
- [VueJs officiel](https://vuejs.org/)
- [nuxtJs officiel](https://nuxt.com/)`,
                checkList: [{id: nanoid(), content: "checklist", state: true}]
            },
            {
                id: nanoid(),
                title: "NuxtJs",
                createdAt: new Date(),
                stateId: LIST_STATE[1].id,
                content: "",
                checkList: []
            }
        ]
    }
]