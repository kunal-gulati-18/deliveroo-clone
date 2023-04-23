import React from 'react';
import {
	Text,
	View,
	SafeAreaView,
	TouchableOpacity,
	Image,
} from 'react-native';
import { XMarkIcon } from 'react-native-heroicons/outline';
import { useSelector } from 'react-redux';
import { currentlyActiveRestaurantSelector } from '../slices/restaurantSlice';
import { useNavigation } from '@react-navigation/native';
import * as Progress from 'react-native-progress';
import MapView, { Marker } from 'react-native-maps';
import { useDispatch } from 'react-redux';
import { emptyCart } from '../slices/cartSlice';

const DeliveryScreen = () => {
	const dispatch = useDispatch();
	const navigation = useNavigation();
	const currentlYActiveRestaurantInformation = useSelector(
		currentlyActiveRestaurantSelector
	);

	const onCancelPress = () => {
		navigation.navigate('Home');
		dispatch(emptyCart());
	};

	const onHelpPress = () => {};

	return (
		<View className="bg-[#00ccbb] h-full">
			<SafeAreaView className="flex-col z-50">
				<View className="items-center flex-row justify-between p-5">
					<TouchableOpacity onPress={onCancelPress}>
						<XMarkIcon color="white" size={30} />
					</TouchableOpacity>
					<TouchableOpacity onPress={onHelpPress}>
						<Text className="text-white text-base font-light">Order help</Text>
					</TouchableOpacity>
				</View>
				<View className="mx-5 my-2 z-50">
					<View className="rounded-md p-6 bg-white shadow-xl flex-row items-start justify-between z-50">
						<View className="flex-col space-y-1">
							<Text className="text-gray-500 text-lg font-medium">
								Estimated Arrival
							</Text>
							<Text className="font-bold text-4xl">45-55 minutes</Text>
							<View>
								<Progress.Bar indeterminate width={200} color="#00ccbb" />
							</View>
							<Text className="text-gray-500 mt-3">
								Your order at {currentlYActiveRestaurantInformation?.name} is
								being processed
							</Text>
						</View>
						<View>
							<Image
								source={require('./assets/rider.jpg')}
								className="h-16 w-16 rounded-lg"
							/>
						</View>
					</View>
				</View>
			</SafeAreaView>
			<MapView
				initialRegion={{
					latitude: 28.553558,
					longitude: 77.259132,
					latitudeDelta: 0.0922,
					longitudeDelta: 0.0421,
				}}
				className="z-0 w-full -mt-10 flex-1"
				mapType="mutedStandard"
			>
				<Marker
					coordinate={{
						latitude: 28.553558,
						longitude: 77.259132,
					}}
					title={currentlYActiveRestaurantInformation.name}
					description={currentlYActiveRestaurantInformation.short_description}
					identifier="origin"
					pinColor="#00ccbb"
				/>

				<Marker
					coordinate={{
						latitude: 28.54,
						longitude: 77.259132,
					}}
					title={'Customer location'}
					description={'Home'}
					identifier="origin"
					pinColor="red"
				/>
			</MapView>
			<SafeAreaView className="p-5 bg-white h-28 flex-row items-center justify-between">
				<View className="items-start flex-row space-x-2 ml-4">
					<Image
						source={{
							uri: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=388&q=80',
						}}
						className="h-12 w-12 bg-gray-300 p-4 rounded-full"
					/>
					<View className="flex-col space-y-1">
						<Text className="text-lg">
							Kunal Gulati
						</Text>
						<Text className="text-sm text-gray-300">
							Your rider  
						</Text>
					</View>
				</View>
				<Text className="text-[#00ccbb] mr-4">Call</Text>
			</SafeAreaView>
		</View>
	);
};

export default DeliveryScreen;
