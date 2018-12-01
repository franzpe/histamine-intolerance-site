import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import * as serviceWorker from './_utils/serviceWorker';

import './index.css';


ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.register();
