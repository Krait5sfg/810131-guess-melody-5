
import React from "react";
import ReactDOM from "react-dom";
import {createStore, applyMiddleware} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import {Provider} from "react-redux";
import thunk from "redux-thunk";
import {createAPI} from "./services/api";
import App from "./components/app/app";
import rootReducer from "./store/reducers/root-reducer";
import {requireAuthorization} from "./store/action";
import {fetchQuestionList, checkAuth} from "./store/api-actions";
import {AuthorizationStatus} from "./const";
import {redirect} from "./store/middlewares/redirect";

const api = createAPI(() => store.dispatch(requireAuthorization(AuthorizationStatus.NO_AUTH))
);
// applyMiddleware(thunk.withExtraArgument(api) - регистрации thunk как middleware
// thunk.withExtraArgument(api) - добавляет в thunk дополнительный аргумент
// этот код позволяет применять при асинхронных действиях в middleware наш api

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk.withExtraArgument(api)), applyMiddleware(redirect)));

store.dispatch(fetchQuestionList());
store.dispatch(checkAuth());
ReactDOM.render(<Provider store={store}><App /></Provider>, document.querySelector(`#root`));

/* Redux DevTools — это тоже middleware. Мы помним, что middleware
подключаются по цепочке, и результат прошлой middleware должен стать
параметром следующий и т.д. Что-то вроде «applyMiddleware(m3)(m2)(m1)»
Обратите, что порядок идёт с конца!
*/
/* Чтобы писать
middleware через запятую, используют метод compose библиотеки Redux.
Он позволяет писать:
compose(
    applyMiddleware(m1),
    applyMiddleware(m2),
    applyMiddleware(m3)
) */
/*
И порядок привычный, и запись читабельная. Но это половина проблемы,
ведь «колбасу» __REDUX_DEVTOOLS_EXTENSION__ это не заменяет. Поэтому мы
воспользуемся такой же функцией compose только уже с предустановленной
middleware для Redux DevTools — composeWithDevTools из одноимённого
пакета
*/
