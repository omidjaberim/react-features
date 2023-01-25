import { ChangeEvent, useCallback, useState } from "react";
import { useTus } from "use-tus";
const useFileUploader = () => {
  const { upload, setUpload, isSuccess, error, remove, isAborted } = useTus({});
  const [files, setFiles] = useState<File[]>([]);

  const handleSetUpload = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.item(0);
      if (!file) {
        return;
      }
      setFiles([...files, file]);
      setUpload(file, {
        endpoint: "https://tusd.tusdemo.net/files/",
        metadata: {
          filename: file.name,
          filetype: file.type,
        },
      });
    },
    [setUpload]
  );

  const handleStart = useCallback(() => {
    if (!upload) {
      return;
    }
    // Start to upload the file.
    upload.start();
  }, [upload]);

  return {
    handleSetUpload,
    handleStart,
    isSuccess,
    error,
    remove,
    files,
  };
};
export default useFileUploader;
