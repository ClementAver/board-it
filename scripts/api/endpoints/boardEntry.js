const boardEntryEndpoints = [
  {
    key: "createBoardEntry",
    method: "POST",
    pathname: "api/board_entry",
  },
  {
    key: "readBoardEntry",
    pathname: "api/board_entry",
  },
  {
    key: "updateBoardEntry",
    method: "PUT",
    pathname: "api/board_entry",
  },
  {
    key: "userUpdateBoardEntry",
    method: "PUT",
    pathname: "api/board_entry",
    timingStrategy: "debounce",
    timingDelay: 1000,
    timingOptions: { leading: true, trailing: true },
  },
  {
    key: "deleteBoardEntry",
    method: "DELETE",
    pathname: "api/board_entry",
  },
  {
    key: "userDeleteBoardEntry",
    method: "DELETE",
    pathname: "api/board_entry",
    timingStrategy: "debounce",
    timingDelay: 1000,
    timingOptions: { leading: true, trailing: true },
  },
  {
    key: "readBoardEntries",
    pathname: "api/board_entry",
  },
];

export default boardEntryEndpoints;
