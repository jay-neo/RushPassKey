export const extractBaseDomain = (url: string): string => {
  url = url.replace(/(^\w+:|^)\/\//, "");
  url = url.replace(/^www\./, "");
  const baseDomain = url.split("/")[0];
  return baseDomain;
};
