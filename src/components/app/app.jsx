
import React from "react";
import {Switch, Route, Router as BrowserRouter} from "react-router-dom";
import WelcomeScreen from "../welcome-screen/welcome-screen";
import AuthScreen from "../auth-screen/auth-screen";
import GameOverScreen from "../game-over-screen/game-over-screen";
import WinScreen from "../win-screen/win-screen";
import GameScreen from "../game-screen/game-screen";
import PrivateRoute from "../private-route/private-route";
import browserHistory from "../../browser-history";
import {MAX_MISTAKE_COUNT, AppRoute} from "../../const";

/*
Компонент `BrowserRouter` автоматически создаёт объект для работы с
историей. Раз так, то нам необходимо чтобы `Router` пользовался нашим экземпляром
объекта `history`, а не собственным.
К сожалению, компонент `BrowserRouter` не позволяет этого сделать,
но в пакете `react-router-dom` есть другой компонент – `Router`.
Основное его отличие от `BrowserRouter` — конфигурируемость.
Например, чтобы воспользоваться нашим экземпляром `history`, достаточно
передать его в соответствующий пров, в `history`.
*/

const App = () => {
  return (
    <BrowserRouter history={browserHistory}>
      <Switch>
        <Route exact
          path={AppRoute.ROOT}
          render={({history}) => (
            <WelcomeScreen
              onPlayButtonClick={() => history.push(AppRoute.GAME)}
              errorsCount={MAX_MISTAKE_COUNT}
            />
          )}
        />
        <Route exact
          path={AppRoute.LOGIN}
          render={({history}) => (
            <AuthScreen
              onReplayButtonClick={() => history.push(AppRoute.GAME)}
            />
          )}
        />
        <PrivateRoute
          exact
          path={AppRoute.RESULT}
          render={({history}) => {
            return (
              <WinScreen
                onReplayButtonClick={() => history.push(AppRoute.GAME)}
              />
            );
          }}
        />
        <Route exact
          path={AppRoute.LOSE}
          render={({history}) => (
            <GameOverScreen
              onReplayButtonClick={() => history.push(AppRoute.GAME)}
            />
          )}
        />
        <Route exact path={AppRoute.GAME}>
          <GameScreen
            errorsCount={MAX_MISTAKE_COUNT}
          />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

App.propTypes = {};

export default App;
