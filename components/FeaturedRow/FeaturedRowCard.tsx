import { useLayoutEffect } from 'react';
import { View, Image, Text, TouchableOpacity, ScrollView } from 'react-native';
import { CardData } from '../interface';
import { MapPinIcon, StarIcon } from 'react-native-heroicons/solid';
import { urlFor } from '../../sanity';
import { useNavigation } from '@react-navigation/native';

const FeaturedRowCard = ({ data }: { data: CardData }) => {
	const imageUrl = data?.imageUrl;

	const navigation = useNavigation();

	useLayoutEffect(() => {
		navigation.setOptions({
			headerShown: false,
		});
	}, []);

	return (
		<TouchableOpacity
			key={data?._id}
			className="bg-white shadow mr-4"
			onPress={() => {
				console.log('dataa', data.id)
				navigation.navigate('Restaurant', {
					id: data._id
				});
			}}
		>
			<View className="flex w-full">
				{imageUrl && (
					<Image
						source={{
							uri: urlFor(imageUrl).url(),
						}}
						className="w-64 h-36 rounded-sm"
					/>
				)}
			</View>
			<View className="w-full px-3 pb-4">
				<Text className="font-bold text-lg pt-2">{data?.name}</Text>
				<View className="flex-row items-center space-x-1">
					<StarIcon color="green" size={22} opacity={0.5} />
					<Text className="text-xs text-gray-500">
						<Text className="text-green-500">{data?.rating}</Text> -{' '}
						{data?.type?.name}
					</Text>
				</View>
				<View className="flex-row items-center space-x-1">
					<MapPinIcon color="gray" opacity={0.4} size={22} />
					<Text className="text-xs text-gray-500">
						Nearby - {data?.address}
					</Text>
				</View>
			</View>
		</TouchableOpacity>
	);
};

export default FeaturedRowCard;
