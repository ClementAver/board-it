import backIt from "../api/backIt.js";
import Board from "../classes/Board.js";
import CustomizableFileInput from "../classes/CustomizableFileInput.js";
import debug from "../utilities/debug.js";
import Details from "../classes/Details.js";
import Dialog from "../classes/Dialog.js";
import DragAndDrop from "../classes/DragAndDrop.js";
import DragSorter from "../classes/DragSorter.js";
import Gallery from "../classes/Gallery.js";
import initAnchors from "../utilities/initAnchors.js";
import initDrawers from "../utilities/initDrawer.js";
import Pagination from "../classes/Pagination.js";
import Svg from "../classes/Svg.js";
import ThemeSwitch from "../classes/ThemeSwitch.js";
import Thumbnail from "../classes/Thumbnail.js";
import Tooltip from "../classes/Tooltip.js";
import UploadImageForm from "../classes/UploadImageForm.js";
import insertSibling from "../utilities/insertSibling.js";
import handleError from "../utilities/handleError.js";

initAnchors();
initDrawers();

const addBoardButton = document.getElementById("add-board");
addBoardButton.addEventListener("click", () => {
  insertSibling(new Board({ dragLevel: 1 }), addBoardButton, "before");
});

const { request: readBoards } = backIt.registered("readBoards");
const { request: readBoardEntries } = backIt.registered("readBoardEntries");
const { request: readImage } = backIt.registered("readImage");
const { request: readImageBytes } = backIt.registered("readImageBytes");

const boards = await new Promise(async (resolve, reject) => {
  try {
    const response = await readBoards();
    const result = await response.json();
    resolve(result.boards.sort((a, b) => a.position < b.position));
  } catch (error) {
    handleError({
      text: `Une Erreur est survenue lors de la récupération des tableaux.`,
      error,
    });
    reject("couldn't fetch boards");
  }
});

console.info(boards);

let insertedBoards = [];
boards.forEach(async (board) => {
  try {
    insertedBoards.push({
      instance: board,
      element: insertSibling(
        new Board({ title: board.title, dragLevel: 1 }),
        addBoardButton,
        "before",
      ),
    });
  } catch (error) {
    handleError({
      text: `Une erreur est survenue lors de l'insertion du tableau portant l'identifiant n°${board.id} au sein de la page.`,
      error,
    });
  }
});

let boardEntries = await new Promise((resolve, reject) => {
  insertedBoards.forEach(async ({ instance: board }) => {
    try {
      const response = await readBoardEntries({
        queries: { board_id: board.id },
      });
      const result = await response.json();
      resolve(result.boardEntries.sort((a, b) => a.position < b.position));
    } catch (error) {
      handleError({
        text: `Une Erreur est survenue lors de la récupération des vignettes correspondantes aux entrées  du tableau portant l'identifiant n°${board.id}.`,
        error,
      });
      reject("couldn't fetch boardEntries");
    }
  });
});

console.info(boardEntries);

let alreadyFetchedIds = new Set();
const imagePromises = await Promise.allSettled(
  boardEntries.map(async (boardEntry) => {
    return new Promise(async (resolve, reject) => {
      if (alreadyFetchedIds.has(boardEntry.imageId)) {
        reject("image already fetched");
      }
      try {
        const imageResponse = await readImage({
          pathname: `/${boardEntry.imageId}`,
        });
        alreadyFetchedIds.add(boardEntry.imageId);
        resolve(await imageResponse.json());
      } catch (error) {
        handleError({
          text: `Une erreur est survenue lors de la récupération de l'image portant l'identifiant n°${boardEntry.imageId}.`,
          error,
        });
        reject("couldn't fetch image");
      }
    });
  }),
);

const images = imagePromises
  .filter((it) => it.status === "fulfilled")
  .map((it) => it.value);

console.info(images);

for (const boardEntry of boardEntries) {
  const { element: boardElement } = insertedBoards.find(
    (it) => it.instance.id === boardEntry.imageId,
  );
  if (!boardElement) continue;
  const image = images.find((it) => it.id === boardEntry.imageId);
  if (!image) continue;
  const thumbnail = new Thumbnail({
    alternate: image.alternateText,
    caption: boardEntry.caption,
    source: `${backIt.origin}/api/image/bytes/${image.id}`,
  });

  try {
    boardElement.appendChild(thumbnail);
  } catch (error) {
    handleError({
      text: `Une erreur est survenue lors de l'insertion de la vignette correspondant à l'entrée portant l'identifiant n°${boardEntry.id} au sein de la page.`,
      error,
    });
  }
}
