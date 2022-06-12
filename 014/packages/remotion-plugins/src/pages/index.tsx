import {GetStaticPropsResult} from "next";
import birthdayCardService from "../services/birthday-card";
import IBirthdayCard from "../types/birthday-card";

interface Props {
  data: IBirthdayCard[];
}

export async function getStaticProps(): Promise<GetStaticPropsResult<Props>> {
  const data = await birthdayCardService.read.all();

  return {
    revalidate: 60 * 60 * 24 * 3,
    props: {
      data,
    },
  };
}

export {default} from "../features/index";
