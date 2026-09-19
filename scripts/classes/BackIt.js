import { API } from "./API.js";

const backIt = new API({
  origin: "http://localhost:3001",
});

backIt.register({
  key: "createBoard",
  pathname: "api/board",
  headers: new Headers({
    "Content-Type": "application/json",
    Accept: "application/json",
  }),
  method: "POST",
  timingStrategy: "debounce",
  timingDelay: 1000,
});

backIt.register({
  key: "readBoard",
  pathname: "api/board",
  headers: new Headers({
    Accept: "application/json",
  }),
  noConcurrency: true,
  timingStrategy: "debounce",
  timingDelay: 1000,
});

backIt.register({
  key: "updateBoard",
  pathname: "api/board",
  headers: new Headers({
    "Content-Type": "application/json",
    Accept: "application/json",
  }),
  noConcurrency: true,
  timingStrategy: "debounce",
  timingDelay: 1000,
});

backIt.register({
  key: "deleteBoard",
  pathname: "api/board",
  noConcurrency: true,
  timingStrategy: "debounce",
  timingDelay: 1000,
});

backIt.register({
  key: "readBoards",
  pathname: "api/board",
  headers: new Headers({
    Accept: "application/json",
  }),
  noConcurrency: true,
  timingStrategy: "debounce",
  timingDelay: 1000,
});

const { request: createBoard, abort: abortCreateBoard } =
  backIt.registered("createBoard");
const { request: readBoard, abort: abortReadBoard } =
  backIt.registered("readBoard");
const { request: updateBoard, abort: abortUpdateBoard } =
  backIt.registered("updateBoard");
const { request: deleteBoard, abort: abortDeleteBoard } =
  backIt.registered("deleteBoard");
const { request: readBoards, abort: abortReadBoards } =
  backIt.registered("readBoards");

export {
  createBoard,
  abortCreateBoard,
  readBoard,
  abortReadBoard,
  updateBoard,
  abortUpdateBoard,
  deleteBoard,
  abortDeleteBoard,
  readBoards,
  abortReadBoards,
};
