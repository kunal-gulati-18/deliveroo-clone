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
import PreparingOrderScreen from './screens/PreparingOrderScreen';
import DeliveryScreen from './screens/DeliveryScreen';

const Stack = createNativeStackNavigator();

export default function App() {
	return (
		<Provider store={store}>
			<NavigationContainer>
				<Stack.Navigator>
					<Stack.Screen name="Home" component={HomeScreen} />
					<Stack.Screen name="Restaurant" component={RestaurantScreen} />
					<Stack.Screen
						name="Cart"
						component={CartScreen}
						options={{ presentation: 'modal', headerShown: false }}
					/>
					<Stack.Screen
						name="Preparing order"
						component={PreparingOrderScreen}
						options={{
							presentation: 'fullScreenModal',
							headerShown: false,
						}}
					/>
					<Stack.Screen
						name="Delivery"
						component={DeliveryScreen}
						options={{
							presentation: 'fullScreenModal',
							headerShown: false,
						}}
					/>
				</Stack.Navigator>
			</NavigationContainer>
		</Provider>
	);
}
