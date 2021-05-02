import { FC } from "react";
import { Switch, Route } from "react-router-dom";
import UserList from "./pages/UserList";

export interface RouterProps {}

const Router: FC<RouterProps> = () => {
  return (
    <>
      <Switch>
        <Route exact path="/" component={UserList} />
      </Switch>
    </>
  );
};

export default Router;
