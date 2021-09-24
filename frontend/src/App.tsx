import { useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Chat from "./components/Chat";
import Navbar from "./components/Navbar";
import Dashboard from "./features/dashboard";
import Login from "./features/login";

import styles from "./App.module.css";

export default function App() {
  let state = useSelector((state: any) => state);

  return (
    <div className={styles.container} data-theme={state.theme}>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/dashboard" children={<Dashboard />} />
          <Route exact path="/chats" children={<Chat />} />
          <Route exact path="/login" children={<Login />} />
        </Switch>
      </Router>
    </div>
  );
}
