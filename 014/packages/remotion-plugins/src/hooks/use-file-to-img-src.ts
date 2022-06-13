import * as React from "react";

const defaultSrc = "/alien.svg";

interface CachedImage {
  name: string;
  src: string;
}

const cachedImages: CachedImage[] = [];
const findInCache = (file: File) => {
  return cachedImages.find(({name}) => file.name === name);
};

export default function useFileToImgSrc(
  file?: File,
  fallback: string = defaultSrc,
) {
  const [loading, setLoading] = React.useState(true);
  const [source, setSource] = React.useState<string>(
    (file ? findInCache(file)?.src : fallback) ?? fallback,
  );

  const createPreview = React.useCallback(() => {
    const usingCache = fallback !== source;

    if (!(file && !usingCache)) return setLoading(false);

    const reader = new FileReader();

    reader.addEventListener("load", () => {
      const result = reader.result;

      if (typeof result === "string") {
        setSource(result);

        cachedImages.push({
          name: file.name,
          src: result,
        });
      }
    });

    reader.addEventListener("loadend", () => {
      setLoading(false);
    });

    reader.readAsDataURL(file);
  }, [fallback, file, source]);

  React.useEffect(() => {
    createPreview();
  }, [createPreview]);

  React.useEffect(() => {
    return () => {
      setSource(fallback);
    };
  }, [fallback]);

  return {
    src: source,
    loading,
  };
}
