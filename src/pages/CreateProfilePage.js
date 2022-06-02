import { withAuthenticationRequired } from "@auth0/auth0-react";
import ProfileForm from "../components/profile/ProfileForm";

function CreateProfilePage() {
  return (
    <div className="page">
      <h1>Choose a username</h1>
      <ProfileForm />
    </div>
  )
}

export default withAuthenticationRequired(CreateProfilePage, {
  onRedirecting: () => <div>Loading...</div>,
});