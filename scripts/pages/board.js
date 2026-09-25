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

let boards;
try {
  // fetches boards from API
  const boardResponse = await readBoards(undefined, { immediate: true });
  boards = await boardResponse.json();
  boards = boards.boards.sort((a, b) => a.position < b.position);
} catch (error) {
  handleError({
    text: `Une Erreur est survenue lors de la récupération des tableaux.`,
    error,
  });
}

let successfulyInsertedBoards = [];
boards.forEach(async (board) => {
  // inserts each board into the DOM
  let inserted;
  try {
    inserted = insertSibling(
      new Board({ id: board.id, title: board.title, dragLevel: 1 }),
      addBoardButton,
      "before",
    );
  } catch (error) {
    handleError({
      text: `Une erreur est survenue lors de l'insertion du tableau portant l'identifiant n°${board.id} au sein de la page.`,
      error,
    });
  }
  if (inserted) {
    successfulyInsertedBoards.push(inserted);
  }
});

successfulyInsertedBoards.forEach(async (boardElement) => {
  // fetches the boardEntries for each board inserted into the DOM
  let boardEntries;
  try {
    const boardEntriesResponse = await readBoardEntries(
      { queries: { boardId: boardElement.dataset.id } },
      {
        immediate: true,
      },
    );
    boardEntries = await boardEntriesResponse.json();
    boardEntries = boardEntries.boardEntries.sort(
      (a, b) => a.position < b.position,
    );
  } catch (error) {
    handleError({
      text: `Une Erreur est survenue lors de la récupération des vignettes.`,
      error,
    });
  }
  boardEntries.forEach((boardEntry) => {
    // TODO fetch the image
    const thumbnail = new Thumbnail({
      alternate: "en dur",
      caption: boardEntry.caption,
      source:
        "https://upload.wikimedia.org/wikipedia/commons/b/b6/Felis_catus-cat_on_snow.jpg?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=original",
    });

    // inserts a thumbnail into the boardElement based on the boardEntry data
    let inserted;
    try {
      inserted = boardElement.appendChild(thumbnail);
    } catch (error) {
      handleError({
        text: `Une erreur est survenue lors de l'insertion du tableau portant l'identifiant n°${boardEntry.id} au sein de la page.`,
        error,
      });
    }
  });
});
