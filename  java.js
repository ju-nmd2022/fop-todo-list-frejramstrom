//Added "rules", they will always be referenced to the HTML//
const ITEMS_CONTAINER = document.getElementById("items");
const ITEM_TEMPLATE = document.getElementById("itemTemplate");
const ADD_BUTTON = document.getElementById("add");

//These lines fetch existing items from the localstorage.
//To avoid null, in case if we user opens the website first time, we have or to an empty Array.
//We need to convert JSON string into an JS array by return JSON to parse.

let items = getItems();

function getItems() {
  const value = localStorage.getItem("todo") || "[]";

  return JSON.parse(value);
}

//We need a function to set the items, example, added or changed an item. We need to refresh what we saved.

function setItems(items) {
  const itemsJson = JSON.stringify(items);

  localStorage.setItem("todo", itemsJson);
}

//We now define the logic now to define a new object

function addItem() {
  items.unshift({
    description: "",
    completed: false,
  });

  setItems(items);
  refreshList();
}
