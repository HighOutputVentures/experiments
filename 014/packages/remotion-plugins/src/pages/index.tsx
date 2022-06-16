import {GetServerSidePropsResult} from "next";
import birthdayCardService from "../services/birthday-card";
import IBirthdayCard from "../types/birthday-card";

interface Props {
  data: IBirthdayCard[];
}

export async function getServerSideProps(): Promise<
  GetServerSidePropsResult<Props>
> {
  const data = await birthdayCardService.read.all();

  return {
    props: {
      data,
    },
  };
}

export {default} from "../features/index";
