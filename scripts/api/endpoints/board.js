const boardEndpoints = [
  {
    key: "createBoard",
    method: "POST",
    pathname: "api/board",
    headers: new Headers({
      "Content-Type": "multipart/form-data",
      Accept: "application/json",
    }),
  },
  {
    key: "userCreateBoard",
    method: "POST",
    pathname: "api/board",
    headers: new Headers({
      "Content-Type": "multipart/form-data",
      Accept: "application/json",
    }),
    timigStrategy: "debounce",
    timingDelay: 1000,
  },
  {
    key: "readBoard",
    pathname: "api/board",
    headers: new Headers({
      Accept: "application/json",
    }),
  },
  {
    key: "updateBoard",
    method: "PUT",
    pathname: "api/board",
    headers: new Headers({
      "Content-Type": "multipart/form-data",
      Accept: "application/json",
    }),
  },
  {
    key: "userUpdateBoard",
    method: "PUT",
    pathname: "api/board",
    headers: new Headers({
      "Content-Type": "multipart/form-data",
      Accept: "application/json",
    }),
    timigStrategy: "debounce",
    timingDelay: 1000,
  },
  {
    key: "deleteBoard",
    method: "DELETE",
    pathname: "api/board",
  },
  {
    key: "readBoards",
    pathname: "api/board",
    headers: new Headers({
      Accept: "application/json",
    }),
  },
];

export default boardEndpoints;
