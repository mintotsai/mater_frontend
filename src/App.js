import React from 'react';
import Main from './components/Main';

import { AuthProvider } from './contexts/auth';

import { Provider } from 'react-redux'
import store from './redux/store'

function App(props) {
  return (
    <Provider store={store}>
      <AuthProvider>
        <Main {...props} />
      </AuthProvider>
    </Provider>
  );
}

export default App;
