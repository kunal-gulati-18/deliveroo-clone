import { Text, View, ScrollView } from 'react-native';
import { ArrowRightIcon } from 'react-native-heroicons/outline';
import FeaturedRowCard from './FeaturedRowCard';
import { CardData } from '../interface';

const FeaturedRowItems = ({
	id = '',
	title = '',
	description = '',
	restaurants = [],
}: {
	id: string;
	title: string;
	description: string;
	restaurants: [];
}) => {
	return (
		<View key={id} className="mt-4">
			<View className="flex-row justify-between px-4 items-center">
				<Text className="font-bold text-lg">{title}</Text>
				<ArrowRightIcon color="#00ccbb" />
			</View>
			<Text className="text-xs text-gray-500 px-4">{description}</Text>
			<ScrollView
				horizontal
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={{
					paddingTop: 8,
					paddingLeft: 15,
				}}
			>
				<View className="flex-row mt-2">
					{restaurants?.map((item: CardData) => (
						<FeaturedRowCard
							key={item.id}
							data={{
								...item,
								imageUrl: (item as any).image,
							}}
						/>
					))}
				</View>
			</ScrollView>
		</View>
	);
};

export default FeaturedRowItems;
