const boardEndpoints = [
  {
    key: "createBoard",
    method: "POST",
    pathname: "api/board",
    headers: new Headers({
      "Content-Type": "multipart/form-data",
      Accept: "application/json",
    }),
    timingStrategy: "debounce",
    timingDelay: 1000,
  },
  {
    key: "readBoard",
    pathname: "api/board",
    headers: new Headers({
      Accept: "application/json",
    }),
    noConcurrency: true,
    timingStrategy: "debounce",
    timingDelay: 1000,
  },
  {
    key: "updateBoard",
    method: "PUT",
    pathname: "api/board",
    headers: new Headers({
      "Content-Type": "multipart/form-data",
      Accept: "application/json",
    }),
    noConcurrency: true,
    timingStrategy: "debounce",
    timingDelay: 1000,
  },
  {
    key: "deleteBoard",
    method: "DELETE",
    pathname: "api/board",
    noConcurrency: true,
    timingStrategy: "debounce",
    timingDelay: 1000,
  },
  {
    key: "readBoards",
    pathname: "api/board",
    headers: new Headers({
      Accept: "application/json",
    }),
    noConcurrency: true,
    timingStrategy: "debounce",
    timingDelay: 1000,
  },
];

export default boardEndpoints;
