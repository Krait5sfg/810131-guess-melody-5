import {AuthorizationStatus, AppRoute, APIRoute} from "../const";
import {loadQuestions, requireAuthorization, redirectToRoute} from "./action";

// функции middleware
// поскольку действия в middleware асинхроны установлена библиотека redux-thunk
// _getState - это ссылка на хранилище. Символ нижнего подчеркивания нужен чтобы линтер не ругался.
export const fetchQuestionList = () => (dispatch, _getState, api) => (
  api.get(APIRoute.QUESTIONS)
    .then(({data}) => dispatch(loadQuestions(data)))
);

export const checkAuth = () => (dispatch, _getState, api) => (
  api.get(APIRoute.LOGIN)
    .then(() => dispatch(requireAuthorization(AuthorizationStatus.AUTH)))
    .catch((err) => {
      throw err;
    })
);

export const login = ({login: email, password}) => (dispatch, _getState, api) => (
  api.post(APIRoute.LOGIN, {email, password})
    .then(() => dispatch(requireAuthorization(AuthorizationStatus.AUTH)))
    .then(() => dispatch(redirectToRoute(AppRoute.RESULT)))
);

