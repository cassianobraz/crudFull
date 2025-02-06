<template>
  <div class="flex flex-col items-start gap-4 justify-start w-full mt-5 md:items-center">
    <form @submit.prevent="handleSubmit">
      <div class="flex flex-col gap-1">
        <input type="text" v-model="name" placeholder="produto" class="text-center border" required />
        <input type="text" v-model="number" placeholder="valor" class="text-center border" required
          @keydown="validateNumber" />
        <button type="submit" :class="isEditing ? 'bg-blue-500' : 'bg-green-500'" class="text-white px-4 py-0.5">
          {{ isEditing ? "Atualizar" : "Enviar" }}
        </button>
      </div>
      <div v-if="message" class="mt-4 justify-center flex">{{ message }}</div>
    </form>
    <ul class="mt-4 flex flex-wrap justify-start">
      <li v-for="user in users" :key="user.id" class="flex justify-between items-center border p-4 gap-4">
        <span>{{ user.nome }} - R$ {{ user.preco }}</span>
        <div class="gap-4">
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

  if (!allowedKeys.includes(event.key)) {
    const inputValue = event.target.value;
    const isDot = event.key === '.';

    if (!/^\d$/.test(event.key) && !isDot) {
      event.preventDefault();
    }

    if (isDot && inputValue.includes('.')) {
      event.preventDefault();
    }
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
