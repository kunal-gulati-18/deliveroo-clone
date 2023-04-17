import { useLayoutEffect, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import CurrencyFormat from 'react-currency-format';
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
import DishItem from './DishItem';
import BasketButton from './BasketButton';
import { currentBasketRestaurantOwner, selectBasketItems } from '../../slices/cartSlice';
import { useSelector } from 'react-redux';

const RestaurantScreen = () => {
	const navigation = useNavigation();
	const cartData = useSelector(selectBasketItems);
	const currentlyActiveCartOwner = useSelector(currentBasketRestaurantOwner)

	console.log('currentlyActiveCartOwner', currentlyActiveCartOwner)
	const {
		params: { id },
	} = useRoute();

	useLayoutEffect(() => {
		navigation.setOptions({
			headerShown: false,
		});
	}, []);

	const { data } = useFetchRestaurantData({ id });

	const goBackToHome = () => {
		navigation.goBack();
	};

	return data ? (
		<View key={data._id} className="relative h-full w-full">
			<ScrollView className="relative" showsVerticalScrollIndicator={false}>
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
				<View className="bg-white pt-4">
					<View className="px-4">
						<Text className="text-3xl font-bold">{data?.name}</Text>
						<View className="flex-row items-center space-x-2 my-1">
							<View className="flex-row items-center space-x-1">
								<StarIcon color="green" size={22} opacity={0.5} />
								<Text className="text-xs text-green-500">{data.rating}</Text>
							</View>
							<View className="flex-row items-center space-x-2">
								<View className="flex-row items-center space-x-1">
									<MapPinIcon color="gray" opacity={0.4} size={22} />
									<Text className="text-xs text-gray-500">Nearby .</Text>
								</View>
								<Text className="text-xs text-gray-500">{data?.address}</Text>
							</View>
						</View>
						<Text className="mt-2 pb-4 text-gray-500">
							{data?.short_description}
						</Text>
					</View>
					<TouchableOpacity className="border-y border-gray-300 flex-row justify-between items-center py-4 px-4">
						<View className="flex-row items-center space-x-2">
							<QuestionMarkCircleIcon color="gray" opacity={0.8} size={20} />
							<Text className="pl-2 flex-1 text-md font-bold">
								Have a food allergy?
							</Text>
						</View>
						<View className="flex-row">
							<ChevronRightIcon color="#00ccbb" />
						</View>
					</TouchableOpacity>
				</View>
				<View className="pb-36">
					<Text className="px-4 pt-6 mb-3 font-bold text-xl">Menu</Text>
					<ScrollView showsVerticalScrollIndicator={false}>
						{data?.dishes?.map((dish) => (
							<DishItem {...dish} />
						))}
					</ScrollView>
				</View>
			</ScrollView>
			{cartData?.length && currentlyActiveCartOwner === id ? (
				<View className="absolute bottom-10 z-50 w-full p-4">
					<BasketButton />
				</View>
			) : null}
		</View>
	) : null;
};

export default RestaurantScreen;
