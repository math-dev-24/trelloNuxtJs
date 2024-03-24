export interface State {
    id: string;
    name: string;
    color: string;
}

export const LIST_STATE: State[] = [
    {
        id: "state_1",
        name: "Ouvert",
        color: "gray-800"
    },
    {
        id: "state_2",
        name: "En cours",
        color: "orange-400"
    },
    {
        id: "state_3",
        name: "Terminé",
        color: "green-600"
    }
]