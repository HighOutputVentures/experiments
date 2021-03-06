import React from 'react';
import ReactDOM from 'react-dom';
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
} from '@apollo/client';
import io from 'socket.io-client';
import { createUploadLink } from 'apollo-upload-client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const uploadLink = createUploadLink({
  uri: 'http://localhost:3001/graphql'
});

const client = new ApolloClient({
  link: uploadLink,
  cache: new InMemoryCache()
});

const socket = io('http://localhost:3001', {
  path: '/socket',
  reconnectionDelayMax: 10000,
  reconnection: true,
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App pubsub={socket} />
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
