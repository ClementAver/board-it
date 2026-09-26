const imageEndpoints = [
  {
    key: "createImage",
    method: "POST",
    pathname: "api/image",
    headers: new Headers({
      "Content-Type": "multipart/form-data",
    }),
  },
  {
    key: "readImage",
    pathname: "api/image",
  },
  {
    key: "updateImage",
    method: "PUT",
    pathname: "api/image",
    headers: new Headers({
      "Content-Type": "multipart/form-data",
    }),
  },
  {
    key: "deleteImage",
    pathname: "api/image",
  },
  {
    key: "readImageByName",
    pathname: "api/image",
  },
  { key: "readImageBytes", pathname: "api/image/bytes" },
];

export default imageEndpoints;
