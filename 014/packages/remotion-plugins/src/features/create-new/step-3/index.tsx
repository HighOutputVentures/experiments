import {useRouter} from "next/router";
import * as React from "react";
import {v4 as uuid} from "uuid";
import useStore, {Store} from "../../../hooks/use-store";
import birthdayCardService from "../../../services/birthday-card";
import IBirthdayCard from "../../../types/birthday-card";
import IMessage from "../../../types/message";
import {base64Encode} from "../../../utils/base64-encode";

export default function CreateNewStep3() {
  const store = useStore();
  const router = useRouter();

  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);
  const [data, setData] = React.useState<IBirthdayCard | null>(null);

  React.useEffect(() => {
    if (!store.data) {
      router.push("/create-new");
    } else {
      createBirthdayCard(store.data);
    }
  }, [router, store.data]);

  React.useEffect(() => {
    return () => {
      setLoading(true);
      setError(false);
      setData(null);
    };
  }, []);

  return (
    <div>
      {loading && <div>Loading...</div>}
      {error && <div>Something went wrong.</div>}
      {data && <div>http://localhost:3000/birthdayCards/{data.id}</div>}
    </div>
  );
}

const createBirthdayCard = async (data: NonNullable<Store["data"]>) => {
  try {
    const celebrant = {
      id: uuid(),
      name: data.celebrant.name,
      image: await base64Encode(data.celebrant.image),
      dateOfBirth: data.celebrant.dateOfBirth.toISOString(),
    };

    const promises = await Promise.allSettled(
      data.messages.map(async ({id, body, author, image}) => ({
        id,
        body,
        author,
        image: image ? await base64Encode(image) : undefined,
      })),
    );

    const messages = promises.reduce<IMessage[]>((array, promise) => {
      return promise.status === "fulfilled"
        ? [...array, promise.value]
        : [...array];
    }, []);

    return await birthdayCardService.create({celebrant, messages});
  } catch (error) {
    return null;
  }
};
