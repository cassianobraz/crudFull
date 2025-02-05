const API_URL = "http://localhost:3000/user";

export const fetchUsers = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error("Erro ao buscar usuários");
  return response.json();
};

export const createUser = async (user) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  if (!response.ok) throw new Error("Erro ao criar usuário");
  return response.json();
};

export const updateUser = async (id, user) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  if (!response.ok) throw new Error("Erro ao atualizar usuário");
  return response.json();
};

export const deleteUser = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) throw new Error("Erro ao deletar usuário");
};
