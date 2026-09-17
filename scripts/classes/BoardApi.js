import { API } from "./API.js";

class BoardAPI extends API {
  constructor({ origin } = {}) {
    super({ origin });
  }
}

const boardAPI = new BoardAPI({ origin: "https://perdu.com/" });

boardAPI.register("getBoards");

export default boardAPI;
