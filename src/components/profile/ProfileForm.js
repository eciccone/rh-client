import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { Button } from "../btn/Button";

async function PostProfile(accessToken, username) {
  const requestBody = {
    username: username,
  }

  const requestOptions = {
    method: "POST",
    headers: { Authorization: `Bearer ${accessToken}` },
    body: JSON.stringify(requestBody)
  }

  return await fetch("http://localhost:8080/profile", requestOptions);
}

export default function ProfileForm() {

  const { getAccessTokenSilently } = useAuth0();
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState();
  const [error, setError] = useState(null);

  const handleUsernameChange = e => {
    const newUsername = e.target.value;
    setUsername(newUsername);
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const token = await getAccessTokenSilently();
    await PostProfile(token, username)
      .then(async res => {
        if (res.ok) return res;
        const json = await res.json();
        const err = new Error(json.msg);
        throw err;
      })
      .then(() => navigate(location.state.redirect))
      .catch(err => setError(err.message));
  }

  return (
    <div>
      <div style={{
        textAlign: "center",
        margin: "1rem"}}>
        { error }
      </div>

      <form className="recipe-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <input className="form-input" id="username" type="text" placeholder="username" onChange={e => handleUsernameChange(e)} />
        </div>

        <div className="form-btn-bar">
          <Button className="" type="submit">Submit</Button>
        </div>
      </form>

    </div>
  );
}