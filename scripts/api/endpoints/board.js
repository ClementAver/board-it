const boardEndpoints = [
  {
    key: "createBoard",
    method: "POST",
    pathname: "api/board",
  },
  {
    key: "userCreateBoard",
    method: "POST",
    pathname: "api/board",
    timigStrategy: "debounce",
    timingDelay: 1000,
    timingOptions: { leading: true, trailing: true },
  },
  {
    key: "readBoard",
    pathname: "api/board",
  },
  {
    key: "updateBoard",
    method: "PUT",
    pathname: "api/board",
  },
  {
    key: "userUpdateBoard",
    method: "PUT",
    pathname: "api/board",
    timigStrategy: "debounce",
    timingDelay: 1000,
    timingOptions: { leading: true, trailing: true },
  },
  {
    key: "deleteBoard",
    method: "DELETE",
    pathname: "api/board",
  },
  {
    key: "userDeleteBoard",
    method: "DELETE",
    pathname: "api/board",
    timingStrategy: "debounce",
    timingDelay: 1000,
    timingOptions: { leading: true, trailing: true },
  },
  {
    key: "readBoards",
    pathname: "api/board",
  },
];

export default boardEndpoints;
