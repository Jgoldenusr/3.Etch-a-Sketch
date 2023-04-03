let currentColor = "#000000";
let curentGridSize = 32;
let paintStyle = "normal";

//Basic nodes
const gridContainer = document.querySelector(".container");
const colorSquare = document.querySelector(".color_square");
const colorPicker = document.querySelector(".color_picker");
const randomButton = document.querySelector(".random_button");
const clearButton = document.querySelector(".clear_button");
const eraserButton = document.querySelector(".eraser_button");
const sizeH3 = document.querySelector(".size_h3");
const sizeBar = document.querySelector(".size_bar");

//Main functions
function selectColor() {
  paintStyle = "normal";
  colorPicker.click();
}
function setCurrentColor() {
  currentColor = this.value;
  colorSquare.style.backgroundColor = currentColor;
}
function autoSizeGrid() {
  removeCells();
  sizeH3.textContent = `${curentGridSize}x${curentGridSize}`;
  gridContainer.setAttribute(
    "style",
    `grid-template-columns: repeat(${curentGridSize}, 1fr);
    grid-template-rows: repeat(${curentGridSize}, 1fr);`
  );
  for (let i = 0; i < curentGridSize * curentGridSize; i++) {
    addCellToGrid();
  }
}
function setGridSize() {
  curentGridSize = this.value;
  autoSizeGrid();
}
function addCellToGrid() {
  let myCell = document.createElement("div");
  myCell.classList.add("cell");
  gridContainer.append(myCell);
  myCell.addEventListener("mouseover", paintOnHover);
  myCell.addEventListener("click", pausePainting);
}
function removeCells() {
  while (gridContainer.firstChild) {
    gridContainer.firstChild.remove();
  }
}
function paintOnHover() {
  switch (paintStyle) {
    case "random":
      const randomBetween = (min, max) =>
        min + Math.floor(Math.random() * (max - min + 1));
      const r = randomBetween(0, 255);
      const g = randomBetween(0, 255);
      const b = randomBetween(0, 255);
      currentColor =
        colorSquare.style.backgroundColor =
        this.style.backgroundColor =
          `rgb(${r},${g},${b})`;
      break;
    default:
      this.style.backgroundColor = currentColor;
      break;
  }
}
function pausePainting() {
  let myNodeList = gridContainer.querySelectorAll("div");
  myNodeList.forEach(function (aNode) {
    aNode.removeEventListener("mouseover", paintOnHover);
    aNode.removeEventListener("click", pausePainting);
    aNode.addEventListener("click", activatePainting);
  });
}
function activatePainting() {
  let myNodeList = gridContainer.querySelectorAll("div");
  myNodeList.forEach(function (aNode) {
    aNode.removeEventListener("click", activatePainting);
    aNode.addEventListener("mouseover", paintOnHover);
    aNode.addEventListener("click", pausePainting);
  });
}
function selectEraser() {
  currentColor = "white";
  colorSquare.style.backgroundColor = currentColor;
}
//Event listeners
colorSquare.addEventListener("click", selectColor);
colorPicker.addEventListener("change", setCurrentColor);
sizeBar.addEventListener("input", setGridSize);
clearButton.addEventListener("click", autoSizeGrid);
eraserButton.addEventListener("click", selectEraser);
randomButton.addEventListener("click", () => {
  paintStyle = "random";
});

//Set the grid to the default size when the page opens
autoSizeGrid();
