import { API } from "./API.js";

class BoardAPI extends API {}

const boardAPI = new BoardAPI({ origin: "http://localhost:3001" });

boardAPI.register({
  key: "getBoards",
  pathname: "/api/boards",
  noConcurrency: true,
  headers: new Headers({
    "Content-Type": "application/json",
  }),
});

export default boardAPI;
