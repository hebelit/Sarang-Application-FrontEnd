import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ApolloProvider,ApolloClient, InMemoryCache} from '@apollo/client';
import client from './apollo-client';

const rootElement = document.getElementById('root');



if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </React.StrictMode>
  );
} else {
  console.error('Failed to find the root element');
}

reportWebVitals();
