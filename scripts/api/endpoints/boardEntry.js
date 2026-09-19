const boardEntryEndpoints = [
  {
    key: "createBoardEntry",
    method: "POST",
    pathname: "api/board_entry",
    headers: new Headers({
      "Content-Type": "multipart/form-data",
      Accept: "application/json",
    }),
    timingStrategy: "debounce",
    timingDelay: 1000,
  },
  {
    key: "readBoardEntry",
    pathname: "api/board_entry",
    headers: new Headers({
      Accept: "application/json",
    }),
    noConcurrency: true,
    timingStrategy: "debounce",
    timingDelay: 1000,
  },
  {
    key: "updateBoardEntry",
    method: "PUT",
    pathname: "api/board_entry",
    headers: new Headers({
      "Content-Type": "multipart/form-data",
      Accept: "application/json",
    }),
    noConcurrency: true,
    timingStrategy: "debounce",
    timingDelay: 1000,
  },
  {
    key: "deleteBoardEntry",
    method: "DELETE",
    pathname: "api/board_entry",
    noConcurrency: true,
    timingStrategy: "debounce",
    timingDelay: 1000,
  },
  {
    key: "readBoardEntries",
    pathname: "api/board_entry",
    headers: new Headers({
      Accept: "application/json",
    }),
    noConcurrency: true,
    timingStrategy: "debounce",
    timingDelay: 1000,
  },
];

export default boardEntryEndpoints;
