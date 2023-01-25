export function blobToFileConvertor<
  GetFile extends { mime_type: string; file: string; name: string }
>(file: GetFile): File {
  let dataUrl: string = `data:${file.mime_type};base64,${file.file}`;
  let arr: Array<string> = dataUrl.split(",");
  let mime = arr[0].match(/:(.*?);/)![1];
  let bstr: string = atob(arr[1]);
  let n: number = bstr.length;
  let u8arr: Uint8Array = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], file.name, { type: mime });
}
