// Event listener for adding a new ingredient
document
  .getElementById('addIngredientForm')
  .addEventListener('submit', function (event) {
    event.preventDefault();
    const ingredient = document.getElementById('newIngredient').value;
    if (ingredient) {
      addIngredientToLocal(ingredient);
      document.getElementById('newIngredient').value = '';
      updateIngredientListDisplay();
    }
  });

// Adds a new ingredient to local storage
function addIngredientToLocal(ingredient) {
  let ingredients = JSON.parse(localStorage.getItem('ingredients')) || [];
  ingredients.push(ingredient);
  localStorage.setItem('ingredients', JSON.stringify(ingredients));
}

// Updates the display of the saved ingredient list
function updateIngredientListDisplay() {
  const ingredients = JSON.parse(localStorage.getItem('ingredients')) || [];
  const ingredientListElement = document.getElementById('ingredientList');
  ingredientListElement.innerHTML = '';
  ingredients.forEach((ingredient, index) => {
    const li = document.createElement('li');
    li.classList.add(
      'list-group-item',
      'd-flex',
      'justify-content-between',
      'align-items-center'
    );
    li.innerHTML = `<button class="btn btn-danger btn-sm delete-ingredient ml-1" data-index="${index}">Delete</button>
      <span class="clickable-ingredient" data-ingredient="${ingredient}">${ingredient}</span>
      <button class="btn btn-success btn-sm add-ingredient mr-1" data-ingredient="${ingredient}">Add</button>`;
    ingredientListElement.appendChild(li);
  });

  // Attach event listeners to add and delete buttons
  document.querySelectorAll('.delete-ingredient').forEach((button) => {
    button.addEventListener('click', function (event) {
      deleteIngredient(event.target.dataset.index);
    });
  });

  document.querySelectorAll('.add-ingredient').forEach((button) => {
    button.addEventListener('click', function (event) {
      addIngredientToFirstEmptyBox(event.target.dataset.ingredient);
    });
  });
}

function deleteIngredient(index) {
  let ingredients = JSON.parse(localStorage.getItem('ingredients')) || [];
  ingredients.splice(index, 1); // Remove the ingredient at the specified index
  localStorage.setItem('ingredients', JSON.stringify(ingredients));
  updateIngredientListDisplay(); // Update the display
}
// Adds ingredient to the first empty box and creates new boxes as needed
function addIngredientToFirstEmptyBox(ingredient) {
  let added = false;
  for (let i = 1; i <= 10; i++) {
    const inputBox = document.getElementById(`ingredient${i}`);
    if (inputBox && !inputBox.value) {
      inputBox.value = ingredient;
      inputBox.style.display = '';
      added = true;
      break;
    }
  }
  if (!added) {
    addNewIngredientInputBox(ingredient);
  }
}

// Adds a new ingredient input box
function addNewIngredientInputBox(ingredient = '') {
  const ingredientForm = document.getElementById('ingredientForm');
  const existingInputCount =
    ingredientForm.querySelectorAll('.ingredient-input').length;
  const nextInputId = `ingredient${existingInputCount + 1}`;

  const newInput = document.createElement('input');
  newInput.type = 'text';
  newInput.id = nextInputId;
  newInput.placeholder = `Ingredient ${existingInputCount + 1}`;
  newInput.className = 'form-control mb-2 ingredient-input';
  newInput.value = ingredient;

  const buttonsDiv = ingredientForm.querySelector('.buttons');
  ingredientForm.insertBefore(newInput, buttonsDiv);
}

// Reset button event listener
document
  .getElementById('resetIngredientsButton')
  .addEventListener('click', function () {
    for (let i = 1; i <= 10; i++) {
      const inputBox = document.getElementById(`ingredient${i}`);
      inputBox.value = '';
      if (i > 1) {
        inputBox.style.display = 'none';
      }
    }
  });

// Event listener for submitting the ingredient form
document
  .getElementById('ingredientForm')
  .addEventListener('submit', function (event) {
    event.preventDefault();
    searchRecipes();
  });

// Fetches recipes based on entered ingredients
function searchRecipes() {
  const ingredients = [];
  for (let i = 1; i <= 10; i++) {
    const inputBox = document.getElementById(`ingredient${i}`);
    if (inputBox && inputBox.value) {
      ingredients.push(inputBox.value);
    }
  }

  fetch(
    `/api/find-recipes?ingredients=${encodeURIComponent(ingredients.join(','))}`
  )
    .then((response) => response.json())
    .then((recipes) => displaySearchResults(recipes))
    .catch((error) => console.error('Error fetching recipes:', error));
}

// Displays fetched recipes in the search results section
function displaySearchResults(recipes) {
  const resultsContainer = document.getElementById('searchResults');
  resultsContainer.innerHTML = '';
  recipes.forEach((recipe) => {
    console.log('Recipe data:', recipe);
    const recipeElement = document.createElement('div');
    recipeElement.className = 'recipe-item';
    recipeElement.innerHTML = `
    <div class="recipe-details">
        <img src="${recipe.image}" alt="${recipe.title}" class="recipe-image">
        <div class="recipe-info">
        <a href="" target="_blank" class="recipe-title">${recipe.title}</a>
            <p>Used Ingredients: ${recipe.usedIngredientCount}</p>
            <p>Missed Ingredients: ${recipe.missedIngredientCount}</p>
            <button onclick="fetchRecipeDetails(${recipe.id})" class="btn btn-info">Details</button>
            <button onclick="saveRecipe(${recipe.id})" class="btn btn-success">Save Recipe</button>
        </div>
    </div>`;
    resultsContainer.appendChild(recipeElement);
  });
}

function fetchRecipeDetails(recipeId) {
  fetch(`/api/recipe-details/${recipeId}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.url) {
        window.open(data.url, '_blank');
      } else {
        console.error('URL not found');
      }
    })
    .catch((error) => console.error('Error fetching recipe details:', error));
}
// Initialize saved ingredients on page load
updateIngredientListDisplay();
