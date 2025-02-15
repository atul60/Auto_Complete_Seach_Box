import { useMemo, useState } from "react";

export const useDebounceSearch = (timeoutInMS: number = 500) => {
  const [text, setText] = useState<string>("");

  function debounceSearchText(timeoutInMS: number = 500): (t: string) => void {
    let timeId: ReturnType<typeof setTimeout> | null = null;

    return (text: string) => {
      if (timeId) {
        clearTimeout(timeId);
      }

      timeId = setTimeout(() => {
        setText(text);
      }, timeoutInMS);
    };
  }

  const debounceText = useMemo(() => debounceSearchText(timeoutInMS), []);

  return { text, debounceText };
};
