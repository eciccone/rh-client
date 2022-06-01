import { Auth0Provider } from "@auth0/auth0-react";
import { useNavigate } from "react-router";

const Auth0ProviderWithHistory = ({ children }) => {
  
  const domain = process.env.REACT_APP_AUTH0_DOMAIN;
  const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

  const history = useNavigate();

  const onRedirectCallback = (appState) => {
    history(appState?.returnTo || window.location.pathname);
  };

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={window.location.origin}
      onRedirectCallback={onRedirectCallback}
      audience="https://hello-world.example.com"
      scope="read:current_user update:current_user_metadata read:recipes"
    >
      {children}
    </Auth0Provider>
  )
}

export default Auth0ProviderWithHistory;