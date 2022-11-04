export default {
    addTasks({commit}, task) {
        console.log(task);
        commit('SET_TASKS', task)
    },

    removeTask({commit}, task) {
        console.log(task);
        commit('REMOVE_TASK', task)
    },

    editTask({commit}, task) {
        commit('EDIT_TASK', task)
    }
}