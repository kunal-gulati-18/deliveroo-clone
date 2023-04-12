import { useLayoutEffect, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
	MapPinIcon,
	StarIcon,
	ChevronRightIcon,
} from 'react-native-heroicons/solid';
import { ScrollView, Text, View, Image, TouchableOpacity } from 'react-native';
import { useFetchRestaurantData } from './custom-hook/useFetchRestaurantData';
import { urlFor } from '../../sanity';
import {
	ArrowLeftIcon,
	QuestionMarkCircleIcon,
} from 'react-native-heroicons/outline';

const RestaurantScreen = () => {
	const navigation = useNavigation();
	const {
		params: { id },
	} = useRoute();

	useLayoutEffect(() => {
		navigation.setOptions({
			headerShown: false,
		});
	}, []);

	const { data, loading } = useFetchRestaurantData({ id });

	const goBackToHome = () => {
		navigation.goBack;
	};

	return data ? (
		<ScrollView showsVerticalScrollIndicator={false}>
			<View className="relative">
				<Image
					source={{
						uri: urlFor(data.image).url(),
					}}
					className="w-full h-56 bg-gray-300 p-4 object-contain"
				/>

				<TouchableOpacity
					onPress={goBackToHome}
					className="absolute top-14 left-5 p-2 bg-gray-100 rounded-full"
				>
					<ArrowLeftIcon color={'#00ccbb'} size={20} />
				</TouchableOpacity>
			</View>
			<View className="bg-white px-2 py-4">
				<Text>{data?.name}</Text>
				<View className="flex-row">
					<StarIcon color="green" size={22} opacity={0.5} />
					<View className="flex-row">
						<View className="flex-row">
							<MapPinIcon color="gray" opacity={0.4} size={22} />
							<Text>Nearby</Text>
						</View>
						<Text>.{data?.address}</Text>
					</View>
				</View>
				<Text>{data?.short_description}</Text>
			</View>
			<View className="border-y-2 flex-row justify-between">
				<View className="flex-row">
					<QuestionMarkCircleIcon />
					<Text>Have a food allergy?</Text>
				</View>
				<View>
					<ChevronRightIcon />
				</View>
			</View>
			<View>
				<Text>Menu</Text>
				<ScrollView showsVerticalScrollIndicator={false}>
					{data?.dishes?.map((dish) => (
						<View>
							<Text>
								{
									dish.name
								}
							</Text>
						</View>
					))}
				</ScrollView>
			</View>
		</ScrollView>
	) : null;
};

export default RestaurantScreen;
