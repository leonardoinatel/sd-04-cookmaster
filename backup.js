<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <title>Cookmaster - New recipe</title>
  </head>
  <body>
    <h1>Nova Receita</h1>
    <% if (user) { %>
      Olá, <%= user.name %>
    <% } else { %>
      <h3>cade o usuário?</h3>
    <% } %>
    <% if (message) { %>
      <span><%= message %></span>
    <% } %>
    <form action="/recipes/new" method="POST">
      <label for="recipeName">Nome da receita: </label>
      <input data-testid="nome-receita" type="text" name="name" id="recipeName" /><br />

      <ul id="ingredientsList"></ul><br />

      <label for="ingredientsInput">Ingredientes: </label>
      <input data-testid="ingredientes" type="text" name="ingredientsInput" id="ingredientsInput" />
      <button data-testid="adicionar-ingrediente" type="button" id="addRecipe" class="btn btn-sm btn-success">Adicionar Ingrediente</button><br />
      
      <!-- A hidden field let web developers include data that cannot be seen or modified by users when a form is submitted. -->
      <!-- https://www.w3schools.com/tags/att_input_type_hidden.asp -->
      <input type="hidden" id="ingredients" name="ingredients">

      <label for="instructionsInput">Modo de preparo: </label>
      <input data-testid="modo-de-preparo" type="text" name="instructions" id="instructionsInput" /><br />

      <button data-testid="postar-receita" type="submit" class="btn btn-sm btn-primary">Salvar</button>
    </form>
  </body>
  <script>
      const inputIngredients = document.getElementById('ingredientsInput');
      const list = document.getElementById('ingredientsList');
      const btn = document.getElementById('addRecipe');
      const ingredients = document.getElementById('ingredients');
      let arrayIngredients = [];

      btn.addEventListener('click', () => {
        const li = document.createElement('li');
        const btnDel = document.createElement('button');

        li.innerHTML = inputIngredients.value;
        arrayIngredients.push(inputIngredients.value);
        btnDel.className = 'btn btn-sm btn-danger';
        btnDel.innerHTML = 'Excluir Ingrediente';

        list.appendChild(li);
        list.appendChild(btnDel);
        ingredients.value = arrayIngredients.join(',');    
        inputIngredients.value = '';

        btnDel.addEventListener('click', (e) => {

          ingredients.value = arrayIngredients.filter(ingredient => ingredient !== li.innerHTML);

          li.remove();
          btnDel.remove();          
        })
      });
  </script>
</html>
