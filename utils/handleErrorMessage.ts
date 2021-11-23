export const handleErrorMessage = (error: any) => {
  if (error.response) {
    if (error.response.status === 500) {
      const duplicateKey = error.response.data.message
        .split(" ")
        .some((text: string) => text === "E11000");
      if (duplicateKey) {
        return "The email is already registered";
      } else {
        return error.response.data.message;
      }
    }
    if (error.response.status === 404) {
      return "Not found";
    }
    if (error.response.status === 401) {
      return error.response.data.message;
    }
  }
  return error.message;
};
