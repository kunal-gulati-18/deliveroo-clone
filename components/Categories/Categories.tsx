import {
	Image,
	SafeAreaView,
	Text,
	TextInput,
	View,
	ScrollView,
} from 'react-native';
import CategoriesCard from './CategoriesCard';
import { useEffect } from 'react';
import sanityClient from '../../sanity';
import useFetchDataFromApi from './custom-hooks/useFetchDataFromApi';

const Categories = () => {
	const { data, loading } = useFetchDataFromApi();

	return (
		<ScrollView
			horizontal
			showsHorizontalScrollIndicator={false}
			contentContainerStyle={{
				paddingHorizontal: 15,
				paddingTop: 10,
			}}
			className="bg-gray-100 "
		>
			<View className="flex-row">
				{data?.map((item) => (
					<CategoriesCard key={item.id} title={item.name} imageUrl={item.image} />
				))}
			</View>
		</ScrollView>
	);
};

export default Categories;
