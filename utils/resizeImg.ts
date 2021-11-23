export function resizeImage(
  file: File,
  maxWidth: number,
  maxHeight: number
): Promise<null | string | ArrayBuffer> {
  return new Promise((resolve, reject) => {
    let image = new Image();
    image.src = URL.createObjectURL(file);
    image.onload = () => {
      let width = image.width;
      let height = image.height;

      if (width <= maxWidth && height <= maxHeight) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
          resolve(reader.result);
        };
      }

      let newWidth;
      let newHeight;

      if (width > height) {
        newHeight = height * (maxWidth / width);
        newWidth = maxWidth;
      } else {
        newWidth = width * (maxHeight / height);
        newHeight = maxHeight;
      }

      let canvas = document.createElement("canvas");
      canvas.width = newWidth;
      canvas.height = newHeight;

      let context = canvas.getContext("2d");

      if (context === null) {
        return reject();
      }
      context.drawImage(image, 0, 0, newWidth, newHeight);
      const imgEncoded = canvas.toDataURL("image/png", 1);
      resolve(imgEncoded);
    };
    image.onerror = reject;
  });
}
