import {ChevronRightIcon} from "@heroicons/react/outline";
import {useRouter} from "next/router";
import * as React from "react";
import IconButton from "~/components/icon-button";
import Textfield from "~/components/textfield";
import useCreateCardStore from "~/hooks/use-create-card-store";
import Layout from "../layout";

export default function CreateNewStep1() {
  const store = useCreateCardStore();
  const router = useRouter();

  const [values, setValues] = React.useState<{
    name: string | null;
    image: File | null;
    dateOfBirth: Date | null;
  }>({
    name: null,
    image: null,
    dateOfBirth: null,
  });

  const isValid = !!(values.name && values.image && values.dateOfBirth);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const {name, image, dateOfBirth} = values;

    if (!(name && image && dateOfBirth)) return;

    store.update({
      celebrant: {
        name,
        image,
        dateOfBirth,
      },
    });

    router.push("/create-new/step-2");
  };

  React.useEffect(() => {
    return () => {
      setValues({
        name: null,
        image: null,
        dateOfBirth: null,
      });
    };
  }, []);

  return (
    <Layout>
      <div className="w-[350px]">
        <form onSubmit={handleSubmit} noValidate autoComplete="off">
          <Textfield
            autoFocus
            required
            value={values.name ?? ""}
            placeholder="Celebrant"
            onChange={(e) =>
              setValues((o) => ({
                ...o,
                name: e.target.value,
              }))
            }
          />

          <Textfield
            type="date"
            required
            className="mt-4"
            placeholder="Date of Birth"
            onChange={(e) =>
              setValues((o) => ({
                ...o,
                dateOfBirth: e.target.valueAsDate,
              }))
            }
          />

          <input
            type="file"
            required
            className="mt-4 block w-full text-sm text-gray-500 outline-none file:mr-4 file:rounded-full file:border-0 file:bg-blue-50 file:py-2 file:px-4 file:text-sm file:font-semibold file:text-blue-600 hover:file:bg-blue-100"
            accept="image/png,image/jpg,image/jpeg"
            onChange={(e) => {
              const filelist = e.target.files;

              if (filelist && filelist.length > 0) {
                setValues((o) => ({
                  ...o,
                  image: filelist[0],
                }));
              } else {
                setValues((o) => ({
                  ...o,
                  image: null,
                }));
              }
            }}
          />

          <div className="mt-16 flex justify-center">
            <IconButton
              type="submit"
              icon={ChevronRightIcon}
              disabled={!isValid}
            />
          </div>
        </form>
      </div>
    </Layout>
  );
}
