import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import './index.css';
import App from './App';
import burgerBuilderReducer from './store/reducer/burgerBuilder';
import orderBuilderReducer from './store/reducer/order';

const composeEnhancers = window.__REDUX_DEVTOOLS_COMPOSE__ || compose 

const root = combineReducers({
  burgerBuilder: burgerBuilderReducer,
  order: orderBuilderReducer
})

const store = createStore(root, composeEnhancers(
  applyMiddleware(thunk)
));

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)

ReactDOM.render(app, document.getElementById('root'));
