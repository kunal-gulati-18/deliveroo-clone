import { useNavigation } from '@react-navigation/native';
import { useLayoutEffect, useEffect } from 'react';
import {
	Image,
	SafeAreaView,
	Text,
	TextInput,
	View,
	ScrollView,
} from 'react-native';
import {
	ChevronDownIcon,
	UserIcon,
	AdjustmentsHorizontalIcon,
	MagnifyingGlassIcon,
} from 'react-native-heroicons/outline';
import Categories from '../components/Categories/Categories';
import FeaturedRow from '../components/FeaturedRow';

function HomeScreen() {
	const navigation = useNavigation();

	useLayoutEffect(() => {
		navigation.setOptions({
			headerShown: false,
		});
	}, []);

	return (
		<SafeAreaView className="bg-white">
			<View className="flex-colpt-5 w-full">
				<View className="flex-row items-center justify-between mx-4 ">
					<View className="flex-row pb-3 items-center space-x-2">
						<View className="">
							<Image
								source={{
									uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80',
								}}
								className="h-7 w-7 rounded-full bg-gray-300"
							/>
						</View>
						<View className="">
							<Text className="font-bold text-gray-400 text-xs">
								Deliver Now!
							</Text>
							<Text className="font-bold text-xl">
								Current Location
								<ChevronDownIcon size={20} color="#00ccbb" />
							</Text>
						</View>
					</View>
					<View>
						<UserIcon color="#00ccbb" size={35} />
					</View>
				</View>
				<View className="flex-row items-center space-x-2 pb-4 mx-4">
					<View className="bg-gray-200 p-3 flex-row space-x-2 rounded-md flex-1">
						<MagnifyingGlassIcon color="gray" size={20} />
						<TextInput
							placeholder="Restaurants and cuisines"
							keyboardType="default"
						/>
					</View>
					<View>
						<AdjustmentsHorizontalIcon />
					</View>
				</View>
			</View>
			<ScrollView className="bg-gray-100">
				<Categories />
				<FeaturedRow />
			</ScrollView>
		</SafeAreaView>
	);
}

export default HomeScreen;
