import "./Recipe.css";

export const Recipe = ({ recipe }) => {
  return (
    <div>
      <img className="recipe-img" src={`http://localhost:8080/static/images/${recipe.image}?time=${new Date()}`} alt="recipe" />

      <p>By: {recipe.username}</p>
      
      <h2>Ingredients:</h2>
      {recipe.ingredients?.map((ing, index) => {
        return (
          <div key={index}>
            {ing.amount} {ing.unit} {ing.name}
          </div>
        )
      })}

      <h2>Steps:</h2>
      {recipe.steps?.map((step, index) => {
        return (
          <div key={index}>
            Step {step.step_number} {step.description}
          </div>
        )
      })}
    </div>
  );
}