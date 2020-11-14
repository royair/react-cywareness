import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import {Provider} from 'mobx-react';

import {rootStore} from './store/RootStore';
import App from './App';

import 'antd/dist/antd.css';
import './css/index.css';

(window as any).rootStore = rootStore;

ReactDOM.render(
    <Provider
        userStore={rootStore.userStore}
        phishingStore={rootStore.phishingStore}
    >
      <Router>
        <App />
      </Router>
    </Provider>
    ,
    document.getElementById('root')
);
