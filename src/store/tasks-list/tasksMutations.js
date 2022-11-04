export default {
    SET_TASKS(state, task) {
        state.tasks.push({name: task, status:'iniciado'})
        console.log(state.tasks);
    },

    REMOVE_TASK(state, task) {
        const itens = state.tasks.filter((item) => item.name !== task.name )
        state.tasks = [...itens, {name: task.name, status: 'deletado'}]
    },

    EDIT_TASK(state, task) {
        const index = state.tasks.findIndex((item) => item.name === task )
        const itens = state.tasks.filter((item) => item.name !== task )
        console.log(index);
        state.tasks = [...itens, {name: task, status: 'iniciado'}]
        console.log(state.tasks);
    }
}