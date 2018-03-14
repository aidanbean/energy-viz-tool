import React from 'react';
import ReactDOM from 'react-dom';

import registerServiceWorker from './registerServiceWorker'

import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

import {
    HashRouter,
    Route,
    Switch
} from 'react-router-dom';

import App from './containers/App/App.jsx';
import './assets/css/bootstrap.min.css';
import './assets/css/animate.min.css';
import './assets/sass/light-bootstrap-dashboard.css';
import './assets/css/demo.css';
import './assets/css/pe-icon-7-stroke.css';

const httpLink = new HttpLink({ uri: `http://localhost:4000/api/graphql` })

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
})

ReactDOM.render((
    <HashRouter>
        <Switch>
            <ApolloProvider client={client}>
                <Route path="/" name="Home" component={App}/>
            </ApolloProvider>
        </Switch>
    </HashRouter>
),document.getElementById('root'));

// registerServiceWorker()
