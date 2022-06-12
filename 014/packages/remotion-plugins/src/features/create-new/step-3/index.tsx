import {useRouter} from "next/router";
import * as React from "react";
import invariant from "tiny-invariant";
import {v4 as uuid} from "uuid";
import useStore from "../../../hooks/use-store";
import birthdayCardService from "../../../services/birthday-card";
import IBirthdayCard from "../../../types/birthday-card";
import {base64Encode} from "../../../utils/base64-encode";

type Data =
  | {loading: true; data?: null}
  | {loading: false; data: IBirthdayCard};

export default function CreateNewStep3() {
  const store = useStore();
  const router = useRouter();

  const [data, setData] = React.useState<Data>({
    loading: true,
  });

  const createBirthdayCard = React.useCallback(async () => {
    invariant(store.data);

    try {
      const celebrant = {
        id: uuid(),
        name: store.data.celebrant.name,
        image: await base64Encode(store.data.celebrant.image),
        dateOfBirth: store.data.celebrant.dateOfBirth.toISOString(),
      };

      const messages = await Promise.all(
        store.data.messages.map(async ({id, body, author, image}) => ({
          id,
          body,
          author,
          image: image ? await base64Encode(image) : undefined,
        })),
      );

      const response = await birthdayCardService.create({celebrant, messages});

      setData({
        loading: false,
        data: response,
      });
    } catch (error) {
      // todo
    }
  }, [store.data]);

  React.useEffect(() => {
    if (!store.data) router.push("/create-new");
    else createBirthdayCard();
  }, [createBirthdayCard, router, store.data]);

  return (
    <div>
      {data.loading && <div>Loading...</div>}
      {!data.loading && (
        <div>http://localhost:3000/birthdayCards/{data.data.id}</div>
      )}
    </div>
  );
}
