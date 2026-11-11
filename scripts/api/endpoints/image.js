const imageEndpoints = [
  {
    key: "createImage",
    method: "POST",
    pathname: "api/image",
  },
  {
    key: "readImage",
    pathname: "api/image",
  },
  {
    key: "updateImage",
    method: "PUT",
    pathname: "api/image",
  },
  {
    key: "userUpdateImage",
    method: "PUT",
    pathname: "api/image",
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
    timingStrategy: "thottle",
    timingDelay: 1000,
    noConcurrency: true,
  },
];

export default imageEndpoints;
