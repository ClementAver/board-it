import { API } from "../classes/API.js";

const backIt = new API({
  origin: "http://localhost:3001",
});

backIt.register({
  key: "createBoard",
  method: "POST",
  pathname: "api/board",
  headers: new Headers({
    "Content-Type": "multipart/form-data",
    Accept: "application/json",
  }),
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
  method: "PUT",
  pathname: "api/board",
  headers: new Headers({
    "Content-Type": "multipart/form-data",
    Accept: "application/json",
  }),
  noConcurrency: true,
  timingStrategy: "debounce",
  timingDelay: 1000,
});
backIt.register({
  key: "deleteBoard",
  method: "DELETE",
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

backIt.register({
  key: "createBoardEntry",
  method: "POST",
  pathname: "api/board_entry",
  headers: new Headers({
    "Content-Type": "multipart/form-data",
    Accept: "application/json",
  }),
  timingStrategy: "debounce",
  timingDelay: 1000,
});
backIt.register({
  key: "readBoardEntry",
  pathname: "api/board_entry",
  headers: new Headers({
    Accept: "application/json",
  }),
  noConcurrency: true,
  timingStrategy: "debounce",
  timingDelay: 1000,
});
backIt.register({
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
});
backIt.register({
  key: "deleteBoardEntry",
  method: "DELETE",
  pathname: "api/board_entry",
  noConcurrency: true,
  timingStrategy: "debounce",
  timingDelay: 1000,
});
backIt.register({
  key: "readBoardEntries",
  pathname: "api/board_entry",
  headers: new Headers({
    Accept: "application/json",
  }),
  noConcurrency: true,
  timingStrategy: "debounce",
  timingDelay: 1000,
});

backIt.register({
  key: "createImage",
  method: "POST",
  pathname: "api/image",
  headers: new Headers({
    "Content-Type": "multipart/form-data",
  }),
  timingStrategy: "debounce",
  timingDelay: 1000,
});
backIt.register({
  key: "readImage",
  pathname: "api/image",
  noConcurrency: true,
  timingStrategy: "debounce",
  timingDelay: 1000,
});
backIt.register({
  key: "updateImage",
  method: "PUT",
  pathname: "api/image",
  headers: new Headers({
    "Content-Type": "multipart/form-data",
  }),
  noConcurrency: true,
  timingStrategy: "debounce",
  timingDelay: 1000,
});
backIt.register({
  key: "deleteImage",
  pathname: "api/image",
  noConcurrency: true,
  timingStrategy: "debounce",
  timingDelay: 1000,
});
backIt.register({
  key: "readImageByName",
  pathname: "api/image",
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

const { request: createBoardEntry, abort: abortCreateBoardEntry } =
  backIt.registered("createBoardEntry");
const { request: readBoardEntry, abort: abortReadBoardEntry } =
  backIt.registered("readBoardEntry");
const { request: updateBoardEntry, abort: abortUpdateBoardEntry } =
  backIt.registered("updateBoardEntry");
const { request: deleteBoardEntry, abort: abortDeleteBoardEntry } =
  backIt.registered("deleteBoardEntry");
const { request: readBoardEntries, abort: abortReadBoardEntries } =
  backIt.registered("readBoardEntries");

const { request: createImage, abort: abortCreateImage } =
  backIt.registered("createImage");
const { request: readImage, abort: abortReadImage } =
  backIt.registered("readImage");
const { request: updateImage, abort: abortUpdateImage } =
  backIt.registered("updateImage");
const { request: deleteImage, abort: abortDeleteImage } =
  backIt.registered("deleteImage");
const { request: readImageByName, abort: abortReadImageByName } =
  backIt.registered("readImageByName");

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
  createBoardEntry,
  abortCreateBoardEntry,
  readBoardEntry,
  abortReadBoardEntry,
  updateBoardEntry,
  abortUpdateBoardEntry,
  deleteBoardEntry,
  abortDeleteBoardEntry,
  readBoardEntries,
  abortReadBoardEntries,
  createImage,
  abortCreateImage,
  readImage,
  abortReadImage,
  updateImage,
  abortUpdateImage,
  deleteImage,
  abortDeleteImage,
  readImageByName,
  abortReadImageByName,
};
