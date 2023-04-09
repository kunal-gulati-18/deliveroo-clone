import { Text, View, Image, TouchableOpacity } from 'react-native';

const CategoriesCard = ({ imageUrl = '', title = "" }: { imageUrl: string; title: string; }) => {
	return (
		<TouchableOpacity className="flex h-20 w-20 relative mr-2">
			<Image
				source={{
					uri: imageUrl,
				}}
				className="h-full w-full rounded"
			/>
			<Text className="absolute text-white left-0 bottom-0 font-bold">{title}</Text>
		</TouchableOpacity>
	);
};

export default CategoriesCard;
