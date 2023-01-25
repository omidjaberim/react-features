// library
import { useEffect, useState } from "react";
import Dropzone from "react-dropzone";
import { Alert, Button } from "@mui/material";
import { useTranslation } from "react-i18next";
// custom
import UploadService from "./upload-files.service";
import { ProgressLinear } from "components";

interface CustomFile {
  selectedFiles?: any;
  progressInfos?: any;
  message?: any;
  fileInfos?: any;
}

const CustomFileUploader = () => {
  const [state, setState] = useState<CustomFile>({
    selectedFiles: undefined,
    progressInfos: [],
    message: [],
    fileInfos: [],
  });
  const { t, i18n } = useTranslation();

  useEffect(() => {
    UploadService.getFiles().then((response) => {
      setState({ ...state, fileInfos: response.data });
    });
  }, []);

  const upload = (idx: any, file: File) => {
    let _progressInfos = [...state.progressInfos];

    UploadService.upload(file, (event: any) => {
      _progressInfos[idx].percentage = Math.round(
        (100 * event.loaded) / event.total
      );
      setState({ ...state, progressInfos: _progressInfos });
    })
      .then((response: any) => {
        setState((prev: CustomFile) => {
          let nextMessage = [
            ...prev.message,
            "Uploaded the file successfully: " + file.name,
          ];
          return { ...prev, message: nextMessage };
        });

        return UploadService.getFiles();
      })
      .then((files) => {
        setState({ ...state, fileInfos: files.data });
      })
      .catch(() => {
        _progressInfos[idx].percentage = 0;
        setState((prev: CustomFile) => {
          let nextMessage = [
            ...prev.message,
            "Could not upload the file: " + file.name,
          ];
          return {
            ...state,
            progressInfos: _progressInfos,
            message: nextMessage,
          };
        });
      });
  };

  const uploadFiles = () => {
    const selectedFiles = { ...state.selectedFiles };

    let _progressInfos = [];

    for (let i = 0; i < selectedFiles.length; i++) {
      _progressInfos.push({ percentage: 0, fileName: selectedFiles[i].name });
    }

    setState({ ...state, progressInfos: _progressInfos, message: [] });
    for (let i = 0; i < selectedFiles.length; i++) {
      upload(i, selectedFiles[i]);
    }
  };
  const onDrop = (files: File[]) => {
    if (files.length > 0) {
      setState({ ...state, selectedFiles: files });
    }
  };
  const { selectedFiles, progressInfos, message, fileInfos } = state;

  return (
    <div className="w-96 flex items-center justify-center">
      {progressInfos &&
        progressInfos.map((progressInfo: any, index: number) => (
          <div className="mb-2" key={index}>
            <span>{progressInfo.fileName}</span>
            <ProgressLinear progress={progressInfo.percentage} />
          </div>
        ))}

      <div className="m-4">
        <Dropzone onDrop={onDrop}>
          {({ getRootProps, getInputProps }) => (
            <section>
              <div {...getRootProps({ className: "dropzone" })}>
                <input {...getInputProps()} />
                {selectedFiles &&
                Array.isArray(selectedFiles) &&
                selectedFiles.length ? (
                  <div className="text-txtDark font-bold">
                    {selectedFiles.length > 3
                      ? `${selectedFiles.length} files`
                      : selectedFiles.map((file) => file.name).join(", ")}
                  </div>
                ) : (
                  t("DragAndDrop")
                )}
              </div>
              <aside className="flex justify-center items-center">
                <Button
                  className="btn btn-success"
                  disabled={!selectedFiles}
                  onClick={uploadFiles}
                >
                  Upload
                </Button>
              </aside>
            </section>
          )}
        </Dropzone>
      </div>
      {message.length > 0 && (
        <Alert severity="success">
          <ul>
            {message.map((item: any, i: number) => {
              return <li key={i}>{item}</li>;
            })}
          </ul>
        </Alert>
      )}

      {fileInfos.length > 0 && (
        <div className="card">
          <div className="card-header">List of Files</div>
          <ul className="list-group list-group-flush">
            {fileInfos &&
              fileInfos.map((file: any, index: number) => (
                <li className="list-group-item" key={index}>
                  <a href={file.url}>{file.name}</a>
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CustomFileUploader;
