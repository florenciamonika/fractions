import React, { Component } from 'react';
// REDUX
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './redux/reducers';
import Home from './Home'

// SET REDUX STORE
const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
)

class Main extends Component {
	render(){
		return (
		    <Provider store={store}>
		    	<Home/>
		    </Provider>
		);
	}
}

export default Main;