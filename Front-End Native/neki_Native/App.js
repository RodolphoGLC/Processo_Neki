import { LoginScreen } from './src/screen/LoginScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { DataProvider } from './src/context/DataContext';
import { CadastroScreen } from './src/screen/CadastroScreen';
import { Home } from './src/screen/HomeScreen';
import { CadastroSkill } from './src/screen/CadastroSkillScreen';
import { EscolhaTela } from './src/screen/EscolhaTelaScreen';
import { EdicaoScreen } from './src/screen/EdicaoScreen';

const Stack = createStackNavigator();

const App = () => {

  return (
    <DataProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={
            {
              headerStyle: {
                backgroundColor: "#116A7B",
                borderBottomWidth: 0,
              },
              headerTintColor: "#fff"
            }}>
          <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
          <Stack.Screen options={{ headerShown: false }} name="Cadastro" component={CadastroScreen} />
          <Stack.Screen options={{ headerShown: false }} name="HomeA" component={Home} />
          <Stack.Screen options={{ headerShown: false }} name="CadSkillA" component={CadastroSkill} />
          <Stack.Screen options={{ headerShown: false }} name="EscolhaTela" component={EscolhaTela} />
          <Stack.Screen options={{ headerShown: false }} name="Edicao" component={EdicaoScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </DataProvider>
  );
}

export default App;