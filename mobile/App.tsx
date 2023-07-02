import { StatusBar } from 'react-native';
import { NativeBaseProvider } from 'native-base';

import { 
  useFonts, 
  Roboto_400Regular,
  Roboto_700Bold
} from '@expo-google-fonts/roboto';

import { AuthContext } from '@contexts/AuthContexts';

import { THEME } from './src/theme'

import { Loading } from '@components/Loading';

import { Routes } from '@routes/index';

export default function App() {
 const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold
  })
  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar 
        barStyle={'light-content'}
        backgroundColor='transparent'
        translucent
      />
    <AuthContext.Provider value={{
      user: {
        id: '1',
        name: 'Juscélia',
        email: 'jusceliadesouza@gmail.com',
        avatar: 'juscelia.png'
      }
    }}>
      {fontsLoaded ? <Routes /> : <Loading />}
    </AuthContext.Provider>
    </NativeBaseProvider>
  );
}

