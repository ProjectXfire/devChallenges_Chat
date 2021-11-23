export const expireCookieDate = (): Date => {
  const getDate: Date = new Date();
  getDate.setMinutes(getDate.getMinutes() + 10);
  return getDate;
};
