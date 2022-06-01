import "./Page.css";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import Recipes from "../components/recipe/Recipes";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

async function GetRecipes(accessToken, limit = 10, offset = 0) {
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

function RecipePage() {
  const [recipes, setRecipes] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { getAccessTokenSilently } = useAuth0();

  // if 404 on a request to /recipes then a profile has not yet been made with recihub.
  const check404 = res => {
    if (res.ok) {
      return res;
    } else {
      const err = new Error(404);
      err.nav = "/";
      throw err;
    }
  }

  useEffect(() => {
    const getRecipes = async () => {
      const token = await getAccessTokenSilently();
      await GetRecipes(token)
        .then(res => check404(res))
        .then(res => res.json())
        .then(res => setRecipes(res.recipes))
        .catch(err => navigate(err.nav))
        .finally(() => setIsLoading(false));
    };

    getRecipes();
  }, [getAccessTokenSilently, navigate]);

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="page">
      <h1>My Recipes</h1>
      <Recipes recipes={recipes} />
    </div>
  );
}

export default withAuthenticationRequired(RecipePage, {
  onRedirecting: () => <div>Loading...</div>,
});