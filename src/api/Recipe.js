const GetRecipe = (accessToken, recipeId) => {
  return fetch(`http://localhost:8080/recipes/${recipeId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

const GetRecipes = (accessToken, limit = 10, offset = 0) => {
  return fetch(`http://localhost:8080/recipes?limit=${limit}&offset=${offset}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
}

const PostRecipe = (accessToken, data) => {
  return fetch(`http://localhost:8080/recipes`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`
    },
    body: JSON.stringify(data)
  });
}

const PutRecipe = (accessToken, recipeId, data) => {
  return fetch(`http://localhost:8080/recipes/${recipeId}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${accessToken}`
    },
    body: JSON.stringify(data)
  });
}

const PutRecipeImage = (accessToken, recipeId, formData) => {
  return fetch(`http://localhost:8080/recipes/${recipeId}/image`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${accessToken}`
    },
    body: formData
  });
}

const DeleteRecipe = (accessToken, recipeId) => {
  return fetch(`http://localhost:8080/recipes/${recipeId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

export {
  GetRecipe,
  GetRecipes,
  PostRecipe,
  PutRecipe,
  PutRecipeImage,
  DeleteRecipe
};

