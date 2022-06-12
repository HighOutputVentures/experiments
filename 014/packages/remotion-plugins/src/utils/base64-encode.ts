export async function base64Encode(file: File) {
  const reader = new FileReader();
  return new Promise<string>((resolve, reject) => {
    reader.addEventListener("load", () => {
      const {result} = reader;

      if (typeof result === "string") return resolve(result);

      reject("Encoded file is not a string");
    });

    reader.addEventListener("error", function () {
      reject("Unable to encode file");
    });

    reader.readAsDataURL(file);
  });
}
