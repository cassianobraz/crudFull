import { randomUUID } from "crypto";

let items = [];

// Funções do controlador
export const getUsers = (req, res) => res.json(items);

export const getUserById = (req, res) => {
  const item = items.find((i) => i.id === req.params.id);
  item
    ? res.json(item)
    : res.status(404).json({ error: "Item não encontrado" });
};

export const createUser = (req, res) => {
  const item = { id: randomUUID(), ...req.body };
  items.push(item);
  res.status(201).json(item);
};

export const updateUser = (req, res) => {
  const index = items.findIndex((i) => i.id === req.params.id);
  if (index === -1)
    return res.status(404).json({ error: "Item não encontrado" });
  items[index] = { id: items[index].id, ...req.body };
  res.json(items[index]);
};

export const deleteUser = (req, res) => {
  const index = items.findIndex((i) => i.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({ error: "Item não encontrado" });
  }

  items.splice(index, 1);
  res.status(200).json({ message: "Usuário deletado com sucesso!" });
};
