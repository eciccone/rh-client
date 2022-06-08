import "./Page.css";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { ButtonBar } from "../components/btn/ButtonBar";
import { Button } from "../components/btn/Button";
import useApi from "../hooks/useApi";

const getRecipe = (accessToken, recipeId) => {
  return fetch(`http://localhost:8080/recipes/${recipeId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

function RecipePage() {
  const navigate = useNavigate();
  const { getAccessTokenSilently } = useAuth0();
  const { recipeId } = useParams();
  const { data, error, loading, request } = useApi(getRecipe);

  useEffect(() => {
    const getRecipe = async () => {
      const token = await getAccessTokenSilently();
      request(token, recipeId);
    }

    if (!loading) {
      getRecipe();
    }
  }, [getAccessTokenSilently, request, recipeId, loading]);

  return (
    <div className="page">
      { loading && <p>Recipe is loading...</p> }
      { error && <p>{error}</p> }
      { data !== null && (
        <>
          <h1>{data.recipe.name}</h1>
          
          <ButtonBar>
            <Button onClick={() => navigate(`/recipes/${recipeId}/edit`, { state: { redirect: `/recipes/${recipeId}` }})}>Edit</Button>
            <Button onClick={() => navigate(`/recipes/${recipeId}/delete`, { state: { redirect: `/recipes` }})}>Delete</Button>
          </ButtonBar>
          
          <p>{data.recipe.username}</p>

          <img src={`http://localhost:8080/static/images/${data.recipe.image}?time=${new Date()}`} style={{width: "300px"}} alt="recipe" />

          <h2>Ingredients:</h2>
          {data.recipe.ingredients?.map((ing, index) => {
            return (
              <div key={index}>
                {ing.amount} {ing.unit} {ing.name}
              </div>
            )
          })}

          <h2>Steps:</h2>
          {data.recipe.steps?.map((step, index) => {
            return (
              <div key={index}>
                Step {step.step_number} {step.description}
              </div>
            )
          })}
        </>
      )}
    </div>
  );
}

export default withAuthenticationRequired(RecipePage, {
  onRedirecting: () => <div>Loading...</div>,
});