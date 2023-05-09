//READ ME
//I have heavily inspired by this video to make this to do list through HTML CSS JS.
//https://youtu.be/cijPd-TXPn4
//Credits:dCode
//I used that guide step to step, then re-wrote some, and explained each section, to know what was going on.
//this way, I learned each step, and what they do. I wrote details about each part of the code.

//Added "rules", they will always be referenced to the HTML//
const itemsContainer = document.getElementById("items");
const itemTemplate = document.getElementById("itemTemplate");
const addButton = document.getElementById("add");
const deleteButton = document.getElementById("removeText");

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
//Unshift means to add a new element to the beginning of the array
//Use setItems to add the Items in the array
//refreshList will take the items and render it to the user
function addItem() {
  items.unshift({
    description: "",
    completed: false,
  });

  setItems(items);
  refreshList();
}

//this function removes all the boxes, by clearing the 'items' in the array, update local storage as empty,
//by removing them and we use the function refreshList.
function removeItem() {
  items = [];
  setItems(items);
  localStorage.removeItem("todo");
  refreshList();
}

//this function updates a specific key in an object within the to do list.
//After updating the value, it then set items and renders
function updateItem(item, key, value) {
  item[key] = value;
  setItems(items);
  refreshList();
}

//A list of items on a web page will be refreshed using this function.
//It does as such by clearing the ongoing rundown, repeating through a variety of "items", making and arranging HTML components for every thing,
//connecting occasion audience members to deal with changes, lastly attaching the components to a HTML compartment.
function refreshList() {
  itemsContainer.innerHTML = "";

  for (const item of items) {
    const itemElement = itemTemplate.content.cloneNode(true);
    const descriptionInput = itemElement.querySelector(".item-description");
    const completedInput = itemElement.querySelector(".item-completed");

    descriptionInput.value = item.description;
    completedInput.checked = item.completed;

    descriptionInput.addEventListener("change", () => {
      updateItem(item, "description", descriptionInput.value);
    });

    completedInput.addEventListener("change", () => {
      updateItem(item, "completed", completedInput.checked);
    });

    itemsContainer.appendChild(itemElement);
  }
}

//when pressing button, it add bars through function addItem
addButton.addEventListener("click", () => {
  addItem();
});
refreshList();

//when pressing button, it remove all bars through function removeItem
deleteButton.addEventListener("click", () => {
  removeItem();
});

refreshList();
