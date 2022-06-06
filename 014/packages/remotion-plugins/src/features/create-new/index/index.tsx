import {ChevronRightIcon} from "@heroicons/react/outline";
import {useRouter} from "next/router";
import * as React from "react";
import FileField from "~/components/file-field";
import IconButton from "~/components/icon-button";
import Textfield from "~/components/textfield";
import Layout from "../layout";
import useStore from "../use-store";

export default function CreateNewStep1() {
  const store = useStore();
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
    <Layout className="w-[375px]">
      <form onSubmit={handleSubmit} noValidate autoComplete="off">
        <Textfield
          label="Celebrant"
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
          label="Date of birth"
          required
          className="mt-6"
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
          label="Photo"
          className="mt-6"
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
    </Layout>
  );
}
