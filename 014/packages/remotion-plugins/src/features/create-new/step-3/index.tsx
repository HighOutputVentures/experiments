import {useRouter} from "next/router";
import * as React from "react";
import invariant from "tiny-invariant";
import {v4 as uuid} from "uuid";
import Spinner from "../../../components/spinner";
import useStore, {Store} from "../../../hooks/use-store";
import birthdayCardService from "../../../services/birthday-card";
import IBirthdayCard from "../../../types/birthday-card";
import IMessage from "../../../types/message";
import {base64Encode} from "../../../utils/base64-encode";
import Layout from "../layout";
import Failed from "./failed";
import Success from "./success";

export default function CreateNewStep3() {
  const store = useStore();
  const router = useRouter();

  const [data, setData] = React.useState<IBirthdayCard | null>(null);
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  const startCreating = React.useCallback(async () => {
    invariant(store.data);

    try {
      const response = await createBirthdayCard(store.data);

      await fetch("/api/revalidate", {
        method: "post",
        body: JSON.stringify({pathname: "/"}),
        headers: {
          "Content-type": "application/json",
        },
      });

      setData(response);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [store.data]);

  React.useEffect(() => {
    if (!store.data) router.push("/create-new");
    else startCreating();
  }, [startCreating, router, store.data]);

  React.useEffect(() => {
    return () => {
      setLoading(true);
      setError(false);
      setData(null);
    };
  }, []);

  return (
    <Layout>
      <div>
        {data && <Success data={data} />}
        {error && <Failed />}
        {loading && <Spinner />}
      </div>
    </Layout>
  );
}

const createBirthdayCard = async (data: NonNullable<Store["data"]>) => {
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

  const createdAt = new Date().toISOString();

  return await birthdayCardService.create({
    celebrant,
    messages,
    createdAt,
  });
};
