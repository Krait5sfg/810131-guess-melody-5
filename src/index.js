import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import questions from './mocks/questions';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {reducer} from './components/store/reducer'; // импорт reducerа который нужен для обновления хранилища

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f);

const ERRORS_COUNT = 3;

ReactDOM.render(<Provider store={store}><App errorsCount={ERRORS_COUNT} questions={questions} /></Provider>, document.querySelector(`#root`));

