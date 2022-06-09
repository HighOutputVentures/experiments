import {ChevronRightIcon} from "@heroicons/react/outline";
import {useRouter} from "next/router";
import * as React from "react";
import FileField from "../../../components/file-field";
import IconButton from "../../../components/icon-button";
import Textfield from "../../../components/textfield";
import useStore from "../../../hooks/use-store";
import Layout from "../layout";
import {Schema} from "../types";

const defaultValues: Partial<Schema["celebrant"]> = {
  name: "",
  dateOfBirth: new Date(),
};

export default function CreateNewStep1() {
  const store = useStore();
  const router = useRouter();
  const [values, setValues] = React.useState(defaultValues);
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
      setValues(defaultValues);
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
          value={values.dateOfBirth ? formatter.format(values.dateOfBirth) : ""}
          onChange={(e) =>
            setValues((o) => ({
              ...o,
              dateOfBirth: e.target.valueAsDate ?? undefined,
            }))
          }
        />

        <FileField
          required
          label="Photo"
          className="mt-6"
          onChange={(e) => {
            const files = e.target.files;

            setValues((o) => ({
              ...o,
              image: files && files.length > 0 ? files[0] : undefined,
            }));
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

const formatter = new Intl.DateTimeFormat("fr-CA", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});
