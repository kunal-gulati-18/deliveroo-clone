import { Text, View, ScrollView } from 'react-native';
import {
	ArrowRightIcon
} from 'react-native-heroicons/outline';

const FeaturedRowItems = ({
	id = '',
	title = '',
	description = '',
}: {
	id: string;
	title: string;
	description: string;
}) => {
	return (
		<View key={id} className="mt-4">
			<View className="flex-row justify-between px-4 items-center">
				<Text className="font-bold text-lg">{title}</Text>
                <ArrowRightIcon color="#00ccbb"/>
			</View>
            <Text className="text-xs text-gray-500 px-4">{description}</Text>
			<ScrollView
				horizontal
				showsHorizontalScrollIndicator={false}
			>
                
            </ScrollView>
		</View>
	);
};

export default FeaturedRowItems;
