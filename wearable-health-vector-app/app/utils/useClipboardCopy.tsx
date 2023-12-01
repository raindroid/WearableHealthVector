import { useCallback, useEffect, useState } from "react";

export const useClipboardCopy = ({
  delay,
  onSuccess,
}: {
  delay?: number;
  onSuccess?: () => void;
}) => {
  const [copySuccess, setCopySuccess] = useState(false);

  const copyToClipboard = useCallback(
    (text: string) => {
      if (text.length > 0) {
        navigator.clipboard.writeText(text);
        setCopySuccess(true);
        if (onSuccess) onSuccess();
      }
    },
    [onSuccess]
  );

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (copySuccess) {
      timer = setTimeout(() => {
        setCopySuccess(false);
      }, delay ?? 5000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [copySuccess, delay]);

  return { copyToClipboard, copySuccess };
};

// In your component
// const { copyToClipboard, copySuccess } = useClipboardCopy();
