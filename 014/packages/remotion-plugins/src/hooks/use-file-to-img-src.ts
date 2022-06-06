import * as React from "react";

const defaultSrc = "/robot.svg";

export default function useFileToImgSrc(file?: File, fallback?: string) {
  const [src, setSrc] = React.useState<string>(fallback ?? defaultSrc);
  const [loading, setLoading] = React.useState(true);

  const createPreview = React.useCallback(() => {
    if (!file) return setLoading(false);

    const reader = new FileReader();

    reader.addEventListener("load", () => {
      const result = reader.result;

      if (typeof result === "string") setSrc(result);
    });

    reader.addEventListener("loadend", () => {
      setLoading(false);
    });

    reader.readAsDataURL(file);
  }, [file]);

  React.useEffect(() => {
    createPreview();
  }, [createPreview]);

  React.useEffect(() => {
    return () => {
      setSrc(fallback ?? defaultSrc);
    };
  }, [fallback]);

  return {
    src,
    loading,
  };
}
