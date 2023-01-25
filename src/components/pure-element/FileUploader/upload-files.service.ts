import axios from "axios";

axios.create({
  baseURL: process.env.REACT_APP_APIS_URL + "/media-management", //// TODO reacd from env upload URL
  headers: {
    "Content-type": "application/json",
  },
});


class UploadFilesService {
    upload(file: File, onUploadProgress: any) {
      let formData = new FormData();
  
      formData.append("file", file);
  
      return axios.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress,
      });
    }
  
    getFiles() {
      return axios.get("/files");
    }
  }
  
  export default new UploadFilesService();
  