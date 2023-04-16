import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import 'react-native-url-polyfill/auto';
import RestaurantScreen from './screens/RestaurantScreen/RestaurantScreen';
import { Provider } from 'react-redux';
import { store } from './store';
import CartScreen from './screens/CartScreen';

const Stack = createNativeStackNavigator();

export default function App() {
	return (
		<Provider store={store}>
			<NavigationContainer>
				<Stack.Navigator>
					<Stack.Screen name="Home" component={HomeScreen} />
					<Stack.Screen name="Restaurant" component={RestaurantScreen} />
					<Stack.Screen name="Cart" component={CartScreen} />
				</Stack.Navigator>
			</NavigationContainer>
		</Provider>
	);
}
