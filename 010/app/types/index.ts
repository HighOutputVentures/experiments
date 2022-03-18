export type Person = {
  id: string;
  featuredImage: {
    node: {
      sourceUrl: string;
    };
  };
  attributes: {
    name: string;
    position: string;
  };
};

export type Response = {
  pageProps: {
    teamMembers: Person[];
  };
  __N_SSG: boolean;
};
