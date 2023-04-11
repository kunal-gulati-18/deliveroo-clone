import { View } from 'react-native';
import FeaturedRowItems from './FeaturedRowItems';
import { useFetchDataFromApi } from './custom-hooks/useFetchDataFromApi';

const FeaturedRow = () => {
	const { data } = useFetchDataFromApi();
	return (
		<View>
			{data?.map((item) => (
				<FeaturedRowItems
					id={item.id}
					key={item.id}
					title={item.name}
					description={item.description}
					restaurants={item.restaurant}
				/>
			))}
		</View>
	);
};

export default FeaturedRow;
