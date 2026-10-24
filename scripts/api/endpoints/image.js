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
    key: "userUpdateImage",
    method: "PUT",
    pathname: "api/image",
    headers: new Headers({
      "Content-Type": "multipart/form-data",
    }),
    timingStrategy: "debounce",
    timingDelay: 1000,
    timingOptions: { leading: true, trailing: true },
  },
  {
    key: "deleteImage",
    method: "DELETE",
    pathname: "api/image",
  },
  {
    key: "userDeleteImage",
    method: "DELETE",
    pathname: "api/image",
    timingStrategy: "debounce",
    timingDelay: 1000,
    timingOptions: { leading: true, trailing: true },
  },
  {
    key: "readImageByName",
    pathname: "api/image",
  },
  { key: "readImageBytes", pathname: "api/image/bytes" },
  {
    key: "readImagesSelection",
    pathname: "api/image",
    headers: new Headers({
      Accept: "application/json",
    }),
    timingStrategy: "thottle",
    timingDelay: 1000,
    noConcurrency: true,
  },
];

export default imageEndpoints;
