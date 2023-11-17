document
  .getElementById('ingredientForm')
  .addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form from submitting normally

    // Get the ingredient value
    var ingredient = document.getElementById('ingredientInput').value;

    // Create a new div element for the ingredient
    var div = document.createElement('div');

    // Create a checkbox
    var checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = ingredient;

    // Create a label for the checkbox
    var label = document.createElement('label');
    label.htmlFor = ingredient;
    label.appendChild(document.createTextNode(ingredient));

    // Append the checkbox and label to the div
    div.appendChild(checkbox);
    div.appendChild(label);

    // Append the div to the ingredients list
    document.getElementById('ingredientsList').appendChild(div);

    // Clear the input field
    document.getElementById('ingredientInput').value = '';
  });
