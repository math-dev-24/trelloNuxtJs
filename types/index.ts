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
    checkList: CheckList[]
}

export interface CheckList{
    id: string;
    content: string;
    state: boolean;
}

export interface State {
    id: string;
    label: string;
    colorId: string;
}

export interface ColorInterface {
    id: string,
    label: string,
    code: string
}