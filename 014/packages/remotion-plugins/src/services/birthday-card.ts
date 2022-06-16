import constants from "../config/constants";
import IBirthdayCard from "../types/birthday-card";

async function one(id: string | number): Promise<IBirthdayCard | null> {
  const endpoint = `${constants.apiEndpoint}/birthdayCards/${id}`;

  try {
    const response = await fetch(endpoint, {cache: "no-cache"});

    return await response.json();
  } catch (error) {
    return null;
  }
}

async function all(): Promise<IBirthdayCard[]> {
  const endpoint = `${constants.apiEndpoint}/birthdayCards?_sort=createdAt&_order=desc`;

  try {
    const response = await fetch(endpoint, {cache: "no-cache"});

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
  const endpoints = [
    `/api/download/${id}`,
    `${constants.apiEndpoint}/birthdayCards/${id}`,
  ];

  await Promise.allSettled(
    endpoints.map((endpoint) =>
      fetch(endpoint, {
        method: "delete",
      }),
    ),
  );
}

interface DownloadRespose {
  success: boolean;
  message: string;
}

async function download(id: string | number, skipDownload?: boolean) {
  try {
    const response = await fetch(`/api/download/${id}`);

    const data: DownloadRespose = await response.json();

    if (data.success && !skipDownload) {
      const anchor = document.createElement("a");

      anchor.href = `${constants.hostname}/api/videos/${id}.mp4`;
      anchor.download = "video.mp4";

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
