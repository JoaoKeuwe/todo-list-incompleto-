<template>
  <main id="app" class="container">
    <h1>Todo List</h1>

    <!-- Adicionando inpput e botão principal, onde o usuario irá escrever sua tarefa -->
    <form v-if="!editingTask">
      <input
        type="text"
        v-model="todo"
        class="input"
        placeholder="Digite sua tarefa aqui"
      />
      <input type="submit" value="Adicionar" @click="sendTask" class="button" />
    </form>

    <!-- caso o botão de editar seja acionado, irá renderizar o botão de editar -->
    <form v-else>
      <input type="text" v-model="todo" class="input" />
      <input type="submit" value="Editar" @click="updateTask" class="button" />
    </form>

    <!-- renderizando as listas com as tarefas juntamente com os botões de editar e de deletar -->
    <ol class="tasks">
      <li v-for="(task, index) in tasks" :key="index">
        <div class="tasks-li">
          {{ task.name }}
        </div>
        <button @click="editTask(task.name)" class="buttonEdit">
          <img src="../img/edit.svg" alt="" style="width: 20px" />
        </button>
        <button @click="removeTask(task)" class="buttonDelete">
          <img src="../img/trash-alt.svg" alt="" style="width: 20px" />
        </button>
      </li>
    </ol>
  </main>
</template>

<script>
import Historic from "../pages/Historic.vue";

// aqui está sendo feita a lógica através do methods e a transição de estados através do data

export default {
  name: "InputButtoon",
  components: {
    Historic,
  },
  watch: {
    "$store.state.tasks.tasks": {
      immediate: true,
      deep: true,
      handler(task) {
        this.tasks = task.filter((item) => item.status === "iniciado");
      },
    },
  },
  data() {
    return {
      editingTask: false,
      todo: "",
      tasks: [],
      selectedTodo: null,
      selectedIndex: null,
    };
  },
  methods: {
    // logica feita para caso não seja adicionada nenhuma tarefa, não renderize nada ou seja, continue vazio
    async sendTask(e) {
      e.preventDefault();
      if (this.todo.length > 0) {
        await this.$store.dispatch("addTasks", this.todo);
        this.todo = "";
      } else {
        // document.getElementById("app").innerText = 'adicione uma tarefa'
        this.todo = "";
      }
    },

    // logica para editar a tarefa já adicionada
    editTask(todo) {
      this.todo = todo;
      this.editingTask = true;
    },

    async updateTask(e) {
      // apagando uma posição e logo em seguida adicioanndo a nova task
      e.preventDefault();
      await this.$store.dispatch("editTask", this.todo);

      // caso a opção editar apareça, e você clique no botão, o input irá apagar, para evitar repetições

      this.todo = "";
      this.editingTask = false;
    },

    // removendo tarefa
    async removeTask(task) {
      await this.$store.dispatch("removeTask", task);
    },
  },

  async mounted() {
    const data = this.$store.state.tasks;
  },
};
</script>

<style>
h1 {
  color: #e95119;
  padding-bottom: 10px;
  font-size: 50px;
  letter-spacing: 1px;
}

.container {
  margin-top: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.input {
  border-radius: 6px;
  height: 45px;
  width: 320px;
  padding: 10px;
  font-size: 15px;
  border: 1px solid rgb(0, 0, 0);
}

.input::placeholder {
  color: #e95119;
  font-size: 16px;
  margin-left: 10px;
  letter-spacing: 1px;
}

.button {
  display: flex;
  margin-top: 10px;
  border-radius: 6px;
  font-size: 14px;
  width: 80px;
  padding: 10px;
  background-color: #e95119;
}

.button:hover {
  transform: scale(1.1);
  transition: 0.5s;
  color: #ffffff;
}

.buttonEdit {
  margin-left: 20px;
  width: 30px;
  height: 30px;
  display: inline-block;
  background-color: #e95119;
  border-radius: 6px;
}

.buttonEdit:hover {
  transform: scale(1.1);
  transition: 0.5s;
  color: #ffffff;
}

.buttonDelete {
  margin-left: 10px;
  width: 30px;
  height: 30px;
  display: inline-block;
  background-color: #e95119;
  border-radius: 6px;
}

.buttonDelete:hover {
  transform: scale(1.1);
  transition: 0.5s;
  color: #ffffff;
}
.tasks {
  margin-top: 60px;
}

.tasks-li {
  padding-bottom: 25px;
  font-size: 25px;
  width: 250px;
  display: inline-block;
  justify-content: center;
}
</style>
