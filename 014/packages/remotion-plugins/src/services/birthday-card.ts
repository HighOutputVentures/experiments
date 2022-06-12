import constants from "../config/constants";
import IBirthdayCard from "../types/birthday-card";

async function one(id: number): Promise<IBirthdayCard> {
  const response = await fetch(`${constants.apiEndpoint}/birthdayCards/${id}`);
  return await response.json();
}

async function all(): Promise<IBirthdayCard[]> {
  const response = await fetch(`${constants.apiEndpoint}/birthdayCards`);
  return await response.json();
}

async function create(data: Omit<IBirthdayCard, "id">): Promise<IBirthdayCard> {
  const response = await fetch(`${constants.apiEndpoint}/birthdayCards`, {
    method: "post",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

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
  remove,
};

export default birthdayCardService;
