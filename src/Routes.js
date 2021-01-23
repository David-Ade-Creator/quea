import React from "react";
import { Switch, Route } from "react-router-dom";
import { PageLayout } from "./Components/Layout/layout";
import { ProtectedRoute } from "./Components/ProtectedRoute/protectedRoute";
import { editProfilePage } from "./Pages/Profile/form/editProfile";
import { ProfilePage } from "./Pages/Profile/profile";
import { AnswerPage } from "./Pages/Questions/Answer/answer";
import { HomePage } from "./Pages/Questions/Home/home";
import { QuestionPage } from "./Pages/Questions/question";
import { ActivateAccountPage } from "./Pages/Registration/activateAccount";
import { ResetPasswordPage } from "./Pages/Registration/resetPassword";
import { ResetLinkPage } from "./Pages/Registration/resetpasswordlink";
import { SigninPage } from "./Pages/Registration/signin";
import { SignupPage } from "./Pages/Registration/signup";

const Routes = () => {
  return (
    <PageLayout>
      <Switch>
      <Route
          exact
          path="/"
          render={(props) => (
            <ProtectedRoute {...props} Component={HomePage} />
          )}
        />
        <Route
          exact
          path="/questions"
          render={(props) => (
            <ProtectedRoute {...props} Component={QuestionPage} />
          )}
        />
        <Route
          exact
          path="/answers/:id"
          render={(props) => (
            <ProtectedRoute {...props} Component={AnswerPage} />
          )}
        />
        <Route
          exact
          path="/profile/:id"
          render={(props) => (
            <ProtectedRoute {...props} Component={ProfilePage} />
          )}
        />
        <Route
          exact
          path="/editprofile/:id"
          render={(props) => (
            <ProtectedRoute {...props} Component={editProfilePage} />
          )}
        />
        <Route exact path="/signup" component={SignupPage} />,
        <Route exact path="/signin" component={SigninPage} />,
        <Route exact path="/resetlink" component={ResetLinkPage} />,
        <Route exact path="/users/password/reset/:token" component={ResetPasswordPage} />,
        <Route
          exact
          path="/users/activateaccount/:token"
          component={ActivateAccountPage}
        />
        ,
      </Switch>
    </PageLayout>
  );
};

export default Routes;
