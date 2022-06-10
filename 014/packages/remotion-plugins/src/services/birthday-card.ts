import constants from "../config/constants";

async function one(id: number) {
  const response = await fetch(`${constants.apiEndpoint}/birthday-cards/${id}`);
  return await response.json();
}

async function all() {
  const response = await fetch(`${constants.apiEndpoint}/birthday-cards`);
  return await response.json();
}

async function create(data: Record<string, unknown>) {
  const response = await fetch(`${constants.apiEndpoint}/birthday-cards`, {
    method: "post",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return await response.json();
}

async function update(id: number, data: Record<string, unknown>) {
  const response = await fetch(
    `${constants.apiEndpoint}/birthday-cards/${id}`,
    {
      method: "patch",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  return await response.json();
}

async function remove(id: number) {
  await fetch(`${constants.apiEndpoint}/birthday-cards/${id}`, {
    method: "delete",
  });
}

const birthdayCardService = {
  read: {
    one,
    all,
  },
  create,
  update,
  remove,
};

export default birthdayCardService;
