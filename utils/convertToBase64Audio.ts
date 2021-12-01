export const convertToBase64Audio = async (
  blobURL: string,
  cb: (e: ProgressEvent<FileReader>) => void
) => {
  if (blobURL) {
    const reader = new FileReader();
    const blobFile = await fetch(blobURL).then((r) => r.blob());
    const audiofile = new File([blobFile], `Audio`, {
      type: "audio/wav",
    });
    reader.readAsDataURL(audiofile);
    reader.onload = cb;
  }
  return "";
};
