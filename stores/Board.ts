import {LIST_STATE} from "~/data/StateData";
import type {ColorInterface, Column, ID, State, Task} from "~/types";
import {COLUMNS_DATA} from "~/data/ColumnsData";
import {nanoid} from "nanoid";
import {COLOR_LIST} from "~/data/ColorData";

interface BoardInterface {
    columns_list: Column[],
    state_list: State[],
    color_list: ColorInterface[]
}


export const useBoard = defineStore("board", {
    state: (): BoardInterface => ({
        columns_list: COLUMNS_DATA,
        state_list: LIST_STATE,
        color_list: COLOR_LIST
    }),
    actions: {
        delete_column(column_id: ID): void {
            this.columns_list = this.columns_list.filter(c => c.id != column_id)
        },
        add_column(new_col: Column): void {
            this.columns_list.push(new_col)
        },
        edit_column(edit_column: Column): void {
            const index: number = this.columns_list.findIndex(c => c.id == edit_column.id)
            this.columns_list[index] = edit_column
        },
        delete_task(task_id: string): void {
            this.columns_list.forEach( c => {
                c.tasks = c.tasks.filter((t: Task) => t.id !== task_id)
            })
        },
        get_state_task(state_id: string): State {
            return this.state_list.filter((s: State) => s.id == state_id)[0]
        },
        get_color(colorId: string): ColorInterface {
            return this.color_list.filter((c: ColorInterface) => c.id == colorId)[0]
        },
        add_state(): void{
            this.state_list.push({
                id: nanoid(), name: "new state", colorId: this.color_list[0].id
            })
        },
        add_task(col_id: string, new_task: Task): void {
            const index: number = this.columns_list.findIndex((c: Column) => c.id == col_id)
            this.columns_list[index].tasks.push(new_task)
        },
        delete_state(state_id: string): void {
            this.columns_list.forEach((c: Column) => {
                c.tasks.map((t: Task) => {
                    if (t.stateId ==  state_id){
                        t.stateId = this.state_list[0].id
                    }
                })
            })
            this.state_list = this.state_list.filter((s: State) => s.id !== state_id)
        },
        duplicate_column(column: Column): void {
            const task_duplicated: Task[] = column.tasks.map((t: Task) => {
                return {
                    id: nanoid(),
                    title: t.title,
                    stateId: t.stateId,
                    createdAt: new Date(),
                    content: t.content,
                    checkList: [...t.checkList]
                }
            })
            const column_duplicated: Column = {
                title: `${column.title}_1`,
                id: nanoid(),
                tasks: task_duplicated
            }
            this.add_column(column_duplicated)
        }
    }
})