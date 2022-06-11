import { withAuthenticationRequired } from "@auth0/auth0-react";
import { Page } from "../components/page/Page";
import ProfileForm from "../components/profile/ProfileForm";

function CreateProfilePage() {
  return (
    <Page title="Choose a username">
      <ProfileForm />
    </Page>
  )
}

export default withAuthenticationRequired(CreateProfilePage, {
  onRedirecting: () => <div>Loading...</div>,
});