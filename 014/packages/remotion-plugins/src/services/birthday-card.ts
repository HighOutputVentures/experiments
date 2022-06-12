import constants from "../config/constants";
import IBirthdayCard from "../types/birthday-card";

async function one(id: string | number): Promise<IBirthdayCard | null> {
  try {
    const response = await fetch(
      `${constants.apiEndpoint}/birthdayCards/${id}`,
    );

    return await response.json();
  } catch (error) {
    return null;
  }
}

async function all(): Promise<IBirthdayCard[]> {
  try {
    const response = await fetch(`${constants.apiEndpoint}/birthdayCards`);
    return await response.json();
  } catch (error) {
    return [];
  }
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

async function remove(id: string | number) {
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
