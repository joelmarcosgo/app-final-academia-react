import React from 'react';
import { 
    useFonts,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold
} from '@expo-google-fonts/inter';
import UseContextsApp from './src/UseContextsApp';
import AppLoading from 'expo-app-loading';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import reducers from './src/store/storeConfig';

const store = createStore(reducers, applyMiddleware(thunk));

export default function  App() {
    const [fontsLoaded] = useFonts({
        Inter_400Regular,
        Inter_500Medium,
        Inter_600SemiBold,
        Inter_700Bold
      });
    
    if (!fontsLoaded) {
        return <AppLoading />;
    }
    
    return (
      <Provider store={store}>
        <UseContextsApp />
      </Provider>
    );
}