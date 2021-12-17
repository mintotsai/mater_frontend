import React from 'react';
import Main from './components/Main';

import { AuthProvider } from './contexts/auth';

function App(props) {
  return (
    <AuthProvider>
      <Main {...props} />
    </AuthProvider>
  );
}

export default App;
