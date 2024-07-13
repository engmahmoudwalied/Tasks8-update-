var base_url = "https://forkify-api.herokuapp.com/api";
var pizza_data = null;
var all_Queries = null;
var Query = "pizza";

function callAPI(text) {
  fetch(base_url + `/search?q=${text}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      pizza_data = data;
      fillAllData();
    });
}
fetch("./API/queries.json")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    all_Queries = data;
    readAllQueries();
  });

function changeMainMenuStyle() {
  var menuBar = document.querySelector("#menu");
  if (menuBar.offsetLeft === 0) menuBar.style.left = "-100%";
  else {
    menuBar.style.left = "0";
  }
}
var mainmenuButton = document.querySelector("#control-menu");
mainmenuButton.onclick = () => {
  var menuBar = document.querySelector("#menu");
  if (menuBar.offsetLeft === 0) menuBar.style.left = "-100%";
  else {
    menuBar.style.left = "0";
  }
};
callAPI(Query);

function readAllQueries() {
  var queriesItems = document.querySelector("#list-Items");
  for (let i = 0; i < all_Queries.length; i++) {
    var item = document.createElement("li");
    item.className = "py-3 ps-3 border-bottom fs-3";
    item.id = all_Queries[i];
    item.onclick = () => {
      changeMainMenuStyle();
      callAPI(all_Queries[i]);
    };
    item.innerHTML = `<span></span> <p>${all_Queries[i]}</p>`;
    queriesItems.appendChild(item);
  }
}
function fillAllData() {
  var recipeItem = document.querySelector("#resipes-container");
  recipeItem.innerHTML = "";
  
  if (pizza_data.recipes.length === 0) {
    showSearchPopup("No results found.");
    return;
  }

  for (let i = 0; i < pizza_data.recipes.length; i++) {
  }
}

function showSearchPopup(message) {
  var searchPopup = document.getElementById("search-popup");
  var searchPopupMessage = document.getElementById("search-popup-message");

  searchPopupMessage.textContent = message;
  searchPopup.classList.remove("d-none");
}

var closeSearchPopup = document.getElementById("close-search-popup");
closeSearchPopup.addEventListener("click", function() {
  var searchPopup = document.getElementById("search-popup");
  searchPopup.classList.add("d-none");
});


function fillAllData() {
  var recipeItem = document.querySelector("#resipes-container");
  recipeItem.innerHTML = "";
  for (let i = 0; i < pizza_data.recipes.length; i++) {
    var item = document.createElement("div");
    item.className = "col-md-4";
    item.id = pizza_data.recipes[i].recipe_id;
    var itemContainer = document.createElement("div");
    itemContainer.className = "resipe-box make-pointer bg-light shadow-lg border rounded";
    var itemImgContainer = document.createElement("div");
    itemImgContainer.className = "resipe-img";
    var itemImg = document.createElement("img");
    itemImg.src = pizza_data.recipes[i].image_url;
    itemImg.className = "w-100";
    itemImgContainer.appendChild(itemImg);
    itemContainer.appendChild(itemImgContainer);
    var itemContent = document.createElement("div");
    itemContent.className = "content px-2";
    var itemTitle = document.createElement("h3");
    itemTitle.className = "my-3";
    itemTitle.innerHTML = pizza_data.recipes[i].title;
    itemContent.appendChild(itemTitle);
    var itemAuthor = document.createElement("p");
    itemAuthor.innerHTML = pizza_data.recipes[i].publisher;
    itemContent.appendChild(itemAuthor);
    itemContainer.appendChild(itemContent);
    item.appendChild(itemContainer);
    recipeItem.appendChild(item);
  }

  var recipeItems = document.querySelectorAll("#resipes-container .col-md-4");
  recipeItems.forEach(item => {
    item.addEventListener("click", function() {
      var recipeId = this.id;
      getRecipeDetails(recipeId);
    });
  });
}

function getRecipeDetails(recipeId) {
  fetch(base_url + `/get?rId=${recipeId}`)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      showOrder(data);
    });
}

var resipeOrderContainer = document.querySelector("#resipe-order-container");
var closeBtn = document.querySelector("#close-btn");
closeBtn.addEventListener("click", function() {
  resipeOrderContainer.classList.add("d-none");
});

resipeOrderContainer.addEventListener("click", function() {
  resipeOrderContainer.classList.add("d-none");
});

var resipeOrderBox = document.querySelector("#resipeOrder-box");
resipeOrderBox.addEventListener("click", function(event) {
  event.stopPropagation();
});

function showOrder(data) {
  var recipe = data.recipe;
  var recipeBoxImg = document.querySelector("#recipe-box-img");
  var recipeTitle = document.querySelector("#recipe-title");
  var recipePublisher = document.querySelector("#recipe-publisher");
  var ingredientsMenu = document.querySelector("#ingredients-menu");

  recipeBoxImg.src = recipe.image_url;
  recipeTitle.innerText = recipe.title;
  recipePublisher.innerText = recipe.publisher;

  ingredientsMenu.innerHTML = "";
  recipe.ingredients.forEach(ingredient => {
    var li = document.createElement("li");
    li.className = "py-3";
    li.innerText = ingredient;
    ingredientsMenu.appendChild(li);
  });

  resipeOrderContainer.classList.remove("d-none");
  resipeOrderContainer.classList.add("d-flex");
}