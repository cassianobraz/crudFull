<template>
  <div class="flex flex-col items-center gap-4 justify-center w-full mt-5 mb-5">
    <form @submit.prevent="handleSubmit">
      <div class="space-x-4">
        <input type="text" v-model="name" placeholder="produto" class="text-center border" required />
        <input type="number" v-model="number" placeholder="valor" class="text-center border" required
          @keydown="validateNumber" />
        <button type="submit" :class="isEditing ? 'bg-blue-500' : 'bg-green-500'" class="text-white px-4 py-0.5">
          {{ isEditing ? "Atualizar" : "Enviar" }}
        </button>
      </div>
      <div v-if="message" class="mt-4 justify-center flex">{{ message }}</div>
    </form>
    <ul class="mt-4 flex flex-wrap justify-center">
      <li v-for="user in users" :key="user.id" class="flex justify-between items-center border p-4 gap-4 m-2">
        <span>{{ user.nome }} - R$ {{ user.preco }}</span>
        <div class="space-x-2">
          <button @click="editUser(user)" class="bg-blue-500 text-white px-2 py-1">
            Editar
          </button>
          <button @click="removeUser(user.id)" class="bg-red-500 text-white px-2 py-1">
            Deletar
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { fetchUsers, createUser, updateUser, deleteUser } from "../services/userService";

const name = ref("");
const number = ref(null);
const message = ref("");
const users = ref([]);
const isEditing = ref(false);
const editingId = ref(null);

const validateNumber = (event) => {
  const allowedKeys = [ 'Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', 'Delete' ];

  if (!allowedKeys.includes(event.key) && !/^\d$/.test(event.key)) {
    event.preventDefault();
  }
};

const handleSubmit = async () => {
  try {
    if (isEditing.value) {
      await updateUser(editingId.value, { nome: name.value, preco: number.value });
      message.value = "Produto atualizado com sucesso!";
      isEditing.value = false;
      editingId.value = null;
    } else {
      await createUser({ nome: name.value, preco: number.value });
      message.value = "Produto salvo com sucesso!";
    }

    name.value = "";
    number.value = null;
    fetchAllUsers();
  } catch (error) {
    message.value = error.message;
  }
};

const fetchAllUsers = async () => {
  try {
    users.value = await fetchUsers();
  } catch (error) {
    message.value = error.message;
  }
};

const editUser = (user) => {
  name.value = user.nome;
  number.value = user.preco;
  isEditing.value = true;
  editingId.value = user.id;
};

const removeUser = async (id) => {
  try {
    await deleteUser(id);
    message.value = "Produto deletado com sucesso!";
    fetchAllUsers();
  } catch (error) {
    message.value = error.message;
  }
};

onMounted(fetchAllUsers);
</script>

<style lang="scss" scoped></style>
