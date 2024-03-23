export type ID = string;

export interface Column {
    id: ID;
    title: string;
    tasks: Task[]
}

export interface  Task{
    id: ID;
    title: string;
    state: state;
    content: string;
    createdAt: Date;
}

export type state = "En cours" | "Terminé" | "Ouvert"