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
