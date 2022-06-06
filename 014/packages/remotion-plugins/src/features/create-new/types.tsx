export interface Schema {
  celebrant: {
    name: string;
    image: File;
    dateOfBirth: Date;
  };
  messages: Array<{
    id: string;
    body: string;
    author: string;
    image?: File;
  }>;
}
