import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { PostRecipe, PutRecipe, PutRecipeImage } from '../../api/Recipe';
import { Button } from '../btn/Button';
import { ButtonBar } from '../btn/ButtonBar';
import './RecipeForm.css';

export default function RecipeForm({
  editingId = 0,
  editingName = "",
  editingIngredients = [{ id: 0, name: "", amount: "", unit: "" }],
  editingSteps = [{ description: ""}]
}) {

  const { getAccessTokenSilently} = useAuth0();
  const [selectedFiles, setSelectedFiles] = useState(null);
  const [preview, setPreview] = useState();
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const form = useRef(null);
  const location = useLocation();

  const [id] = useState(editingId);
  const [name, setName] = useState(editingName);
  const [ingredients, setIngredients] = useState(editingIngredients);
  const [steps, setSteps] = useState(editingSteps);

  const handleIngredientChange = (i, e) => {
    const newIngredientValues = [...ingredients];
    newIngredientValues[i][e.target.name] = e.target.value;
    setIngredients(newIngredientValues);
  }

  const handleStepChange = (i, e) => {
    const newStepValues = [...steps];
    newStepValues[i][e.target.name] = e.target.value;
    setSteps(newStepValues);
  }

  const handleNameChange = e => {
    const newName = e.target.value;
    setName(newName);
  }

  const addIngredientFormGroup = () => {
    setIngredients([...ingredients, {id: 0, amount: "", unit: "", name: ""} ]);
  }

  const removeIngredientFormGroup = (i) => {
    const newIngredientValues = [...ingredients];
    newIngredientValues.splice(i, 1);
    setIngredients(newIngredientValues);
  }

  const addStepFormGroup = (i) => {
    setSteps([...steps, {description: ""}]);
  }

  const removeStepFormGroup = (i) => {
    const newStepValues = [...steps];
    newStepValues.splice(i, 1);
    setSteps(newStepValues);
  }

  const handleSelectedFile = (e) => {
    setSelectedFiles(e.target.files[0]);
  }

  const checkError = async res => {
    if (res.ok) {
      return res;
    } else {
      const json = await res.json();
      const err = new Error();
      err.msg = json.msg;
      throw err;
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = await getAccessTokenSilently();

    const requestBody = {
      name: name,
      ingredients: ingredients,
      steps: steps
    };

    if (id === 0) {
      const res = await PostRecipe(token, requestBody)
        .then(res => checkError(res))
        .catch(err => setError(err.msg))

      if (res.ok) {
        if (selectedFiles !== null) {
          const json = await res.json();
          const imageFormData = new FormData();
          imageFormData.append("image", selectedFiles);
          await PutRecipeImage(token, json.recipe.id, imageFormData)
            .then(res => checkError(res))
            .catch(err => setError(err.msg))
        }
        navigate("/recipes");
      }
    } else {
      const res = await PutRecipe(token, id, requestBody)
        .then(res => checkError(res))
        .catch(err => setError(err.msg))

      if (res.ok) {
        if (selectedFiles !== null) {
          const json = await res.json();
          const imageFormData = new FormData();
          imageFormData.append("image", selectedFiles);
          await PutRecipeImage(token, json.recipe.id, imageFormData)
            .then(res => checkError(res))
            .catch(err => setError(err.msg))
        }

        if (location.state !== null) {
          navigate(location.state.redirect);
        } else {
          navigate("/recipes");
        }
      }
    }
    
  }

  useEffect(() => {
    if (!selectedFiles) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFiles);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFiles]);

  return(
    <form ref={form} className="recipe-form" onSubmit={handleSubmit}>
      {error}
      <div className="form-group">
        <input value={name} className="form-input" id="title" type="text" placeholder="Name" onChange={e => handleNameChange(e)} />
      </div>

      {ingredients.map((element, index) => (
        <div className="form-group">
          <div className="ingredient-input" key={index}>
            <input value={ingredients[index].amount} className="form-input" type="text" placeholder="Amount" 
              name="amount" onChange={e => handleIngredientChange(index, e)} />
            <input value={ingredients[index].unit} className="form-input" type="text" placeholder="Unit" 
              name="unit" onChange={e => handleIngredientChange(index, e)} />
            <input value={ingredients[index].name} className="form-input" text="text" placeholder="Ingredient name" 
              name="name" onChange={e => handleIngredientChange(index, e)} />
          </div> 
          {index === ingredients.length - 1 && ingredients.length > 1 ? 
            <Button className="" type="button" onClick={() => removeIngredientFormGroup(index)}>Remove</Button> : null}
        </div>
      ))}

      <ButtonBar>
        <Button className="" type="button" onClick={() => addIngredientFormGroup()}>Add ingredient</Button>
      </ButtonBar>

      {steps.map((element, index) => (
        <div className="form-group">
          <div className="step-input">
            <input value={steps[index].description} className="form-input" type="text" placeholder="Step description"
              name="description" onChange={e => handleStepChange(index, e)} />
          </div>
          {index === steps.length - 1 && steps.length > 1 ? 
            <Button className="" type="button" onClick={() => removeStepFormGroup(index)}>Remove</Button> : null}
        </div>
      ))}

      <ButtonBar>
        <Button className="" type="button" onClick={() => addStepFormGroup()}>Add Step</Button>
      </ButtonBar>

      <div className="form-group">
        <input name="image-right" accept="image/*" type="file" style={{ display: "none" }} id="icon-button-file" onChange={handleSelectedFile} />
        <label className="file-upload-label" htmlFor="icon-button-file">
          <i className="fa-solid fa-upload"></i>
          Upload image
        </label>

        { selectedFiles && (
          <div>
            <p className="file-name">{selectedFiles.name}</p>
            <img className="file-image" src={preview} alt="upload" />
          </div>
        )}

      </div>

      <ButtonBar>
        <Button type="submit">Submit</Button>
        <Button type="button" onClick={() => navigate("/recipes")}>Cancel</Button>
      </ButtonBar>
    </form>
  );
}