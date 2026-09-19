const imageEndpoints = [
  {
    key: "createImage",
    method: "POST",
    pathname: "api/image",
    headers: new Headers({
      "Content-Type": "multipart/form-data",
    }),
    timingStrategy: "debounce",
    timingDelay: 1000,
  },
  {
    key: "readImage",
    pathname: "api/image",
    noConcurrency: true,
    timingStrategy: "debounce",
    timingDelay: 1000,
  },
  {
    key: "updateImage",
    method: "PUT",
    pathname: "api/image",
    headers: new Headers({
      "Content-Type": "multipart/form-data",
    }),
    noConcurrency: true,
    timingStrategy: "debounce",
    timingDelay: 1000,
  },
  {
    key: "deleteImage",
    pathname: "api/image",
    noConcurrency: true,
    timingStrategy: "debounce",
    timingDelay: 1000,
  },
  {
    key: "readImageByName",
    pathname: "api/image",
    noConcurrency: true,
    timingStrategy: "debounce",
    timingDelay: 1000,
  },
];

export default imageEndpoints;