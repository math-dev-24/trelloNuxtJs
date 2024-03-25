export type ID = string;

export interface Column {
    id: ID;
    title: string;
    tasks: Task[]
}

export interface  Task{
    id: ID;
    title: string;
    stateId: string;
    createdAt: Date;
    content: string;
}

export interface State {
    id: string;
    name: string;
    colorId: string;
}

export interface ColorInterface {
    id: string,
    name: string,
    code: string
}