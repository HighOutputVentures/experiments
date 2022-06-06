import {ChevronRightIcon} from "@heroicons/react/outline";
import {useRouter} from "next/router";
import * as React from "react";
import FileField from "~/components/file-field";
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
      messages: [],
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

          <FileField
            required
            className="mt-4"
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
