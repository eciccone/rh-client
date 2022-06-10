const GetRecipe = (accessToken, recipeId) => {
  return fetch(`http://localhost:8080/recipes/${recipeId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
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
  DeleteRecipe
};

export async function GetRecipes(accessToken, limit = 10, offset = 0) {
  const res = await fetch(`http://localhost:8080/recipes?limit=${limit}&offset=${offset}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  }).catch(err => {
    // request failed - server may not be running.
    err.nav = "/";
    throw err;
  });

  return res;
}