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


export async function PostRecipe(accessToken, requestBody) {
  const requestOptions = {
    method: "POST",
    headers: { Authorization: `Bearer ${accessToken}` },
    body: JSON.stringify(requestBody)
  }

  const res = await fetch("http://localhost:8080/recipes", requestOptions).catch(err => {
    // request failed - server may not be running.
    err.nav = "/recipes";
    console.log("error in PostRecipe");
    console.log(err);
    throw err;
  });

  return res;
}

export async function PutRecipeImage(accessToken, recipeId, formData) {
  const imagePutOptions = {
    method: "PUT",
    headers: { Authorization: `Bearer ${accessToken}` },
    body: formData
  }

  const res = await fetch(`http://localhost:8080/recipes/${recipeId}/image`, imagePutOptions).catch(err => {
    // request failed - server may not be running.
    err.nav = "/recipes";
    console.log("error in PutRecipeImage");
    console.log(err);
    throw err;
  });

  return res;
}
