import styles from "./index.module.css";
import Chat from "../../components/Chat";
import Login from "../login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "../../components/Navbar";

export default function Dashboard() {
  return (
    <div className={styles.container} data-theme="dark">
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/chats">
            <Chat />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}
