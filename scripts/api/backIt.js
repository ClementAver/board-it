import { API } from "../classes/API.js";
import boardEndpoints from "./endpoints/board.js";
import imageEndpoints from "./endpoints/image.js";
import boardEntryEndpoints from "./endpoints/boardEntry.js";

const backIt = new API({
  origin: "http://localhost:3001",
});

backIt.register(boardEndpoints);
backIt.register(imageEndpoints);
backIt.register(boardEntryEndpoints);

export default backIt;
