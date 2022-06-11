import './Page.css'
import './HomePage.css';
import { Page } from '../components/page/Page';

export default function HomePage() {

  return (
    <Page>
      <div className="home-container">
        <h1>Welcome to Recihub!</h1>
        <p>A place to store your personal recipes online.</p>
      </div>
    </Page>
  );
}