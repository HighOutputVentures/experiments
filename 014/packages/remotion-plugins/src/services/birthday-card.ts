import {v4 as uuid} from "uuid";
import constants from "../config/constants";
import IBirthdayCard from "../types/birthday-card";

async function one(id: string | number): Promise<IBirthdayCard | null> {
  try {
    const response = await fetch(
      `${constants.apiEndpoint}/birthdayCards/${id}`,
      {
        cache: "no-cache",
      },
    );

    return await response.json();
  } catch (error) {
    return null;
  }
}

async function all(): Promise<IBirthdayCard[]> {
  try {
    const response = await fetch(`${constants.apiEndpoint}/birthdayCards`, {
      cache: "no-cache",
    });

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
  await fetch(`${constants.apiEndpoint}/birthdayCards/${id}`, {
    method: "delete",
  });
}

interface DownloadRespose {
  success: boolean;
  message: string;
}

async function download(id: string | number) {
  try {
    const response = await fetch(`/api/download/${id}`);

    const data: DownloadRespose = await response.json();

    if (data.success) {
      const anchor = document.createElement("a");
      anchor.setAttribute("href", `http://localhost:3000/downloads/${id}.mp4`);
      anchor.setAttribute("download", `${uuid()}.mp4`);
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
    }
  } catch (error) {
    // todo
  }
}

const birthdayCardService = {
  read: {
    one,
    all,
  },
  create,
  remove,
  download,
};

export default birthdayCardService;
