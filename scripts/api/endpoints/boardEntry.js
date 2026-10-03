const boardEntryEndpoints = [
  {
    key: "createBoardEntry",
    method: "POST",
    pathname: "api/board_entry",
    headers: new Headers({
      "Content-Type": "multipart/form-data",
      Accept: "application/json",
    }),
  },
  {
    key: "readBoardEntry",
    pathname: "api/board_entry",
    headers: new Headers({
      Accept: "application/json",
    }),
  },
  {
    key: "updateBoardEntry",
    method: "PUT",
    pathname: "api/board_entry",
    headers: new Headers({
      "Content-Type": "multipart/form-data",
      Accept: "application/json",
    }),
  },
  {
    key: "userUpdateBoardEntry",
    method: "PUT",
    pathname: "api/board_entry",
    headers: new Headers({
      "Content-Type": "multipart/form-data",
      Accept: "application/json",
    }),
    timingStrategy: "debounce",
    timingDelay: 1000,
  },
  {
    key: "deleteBoardEntry",
    method: "DELETE",
    pathname: "api/board_entry",
  },
  {
    key: "readBoardEntries",
    pathname: "api/board_entry",
    headers: new Headers({
      Accept: "application/json",
    }),
  },
];

export default boardEntryEndpoints;
