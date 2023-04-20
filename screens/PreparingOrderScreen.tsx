import { useLayoutEffect, useRef, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ActivityIndicator, View, SafeAreaView, Text } from 'react-native';
import AnimatedLottieView from 'lottie-react-native';

const PreparingOrderScreen = () => {
	const navigation = useNavigation();

	useEffect(() => {
		setTimeout(() => {
			navigation.navigate('Delivery');
		}, 4000);
	}, []);

	return (
		<SafeAreaView className="bg-[#00ccbb]">
			<View className="h-full w-full flex-col items-center justify-center space-y-20">
				<AnimatedLottieView
					className="w-full items-start flex-row"
					source={require('./assets/orderPreparing.json')}
					autoPlay
					loop={true}
				/>
				<View>
					<Text className="text-white text-lg font-bold">
						Waiting for restaurant to accept your order
					</Text>
				</View>

				<View>
					<ActivityIndicator size="large" color="white" />
				</View>
			</View>
		</SafeAreaView>
	);
};

export default PreparingOrderScreen;
