import { useState } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { urlFor } from '../../sanity';
import CurrencyFormat from 'react-currency-format';
import {
	MinusCircleIcon,
	PlusCircleIcon,
} from 'react-native-heroicons/outline';
import { useSelector } from 'react-redux';
import {
	addItemInCart,
	removeItemFromCart,
	selectBasketItemWithId,
} from '../../slices/cartSlice';
import { checkDefinedValue } from '../../utils';
import { useDispatch } from 'react-redux';
import BasketButton from './BasketButton';

const DishItem = ({
	_id,
	name,
	description,
	price,
	image,
}: {
	_id: string;
	name: string;
	description: string;
	price: number;
	image: any;
}) => {
	const dispatch = useDispatch();
	const [isPressed, setIsPressed] = useState(false);

	const cartItemCount = useSelector((state) =>
		selectBasketItemWithId(state.cart, _id)
	);

	return (
		<View className="relative w-full">
			<TouchableOpacity
				className={`bg-white p-4 border-b-2 border-gray-200 flex-row items-start justify-between ${
					isPressed ? 'border-b-0' : ''
				}`}
				key={_id}
				onPress={() => setIsPressed(!isPressed)}
			>
				<View className="flex-col space-y-2">
					<Text className="text-lg">{name}</Text>
					<Text className="text-md text-gray-400">{description}</Text>
					<Text className="text-md text-gray-400">
						<CurrencyFormat
							value={price}
							displayType="text"
							prefix="€"
							renderText={(formattedValue) => <Text>{formattedValue}</Text>}
							thousandSeparator={true}
						/>
					</Text>
				</View>
				<View>
					<Image
						source={{
							uri: urlFor(image).url(),
						}}
						style={{
							borderWidth: 1,
							borderColor: '#f3f3f4',
						}}
						className="h-20 w-20 bg-gray-300 p-4 rounded-md"
					/>
				</View>
			</TouchableOpacity>
			{isPressed ? (
				<View className="flex-row items-center space-x-1 bg-white px-4">
					<TouchableOpacity
						onPress={() => {
							if (cartItemCount === 0) return;
							dispatch(removeItemFromCart({ _id, price }));
						}}
					>
						<MinusCircleIcon
							color={cartItemCount ? '#00ccbb' : 'gray'}
							size={40}
						/>
					</TouchableOpacity>
					<Text>{checkDefinedValue(cartItemCount) ? cartItemCount : 0}</Text>
					<TouchableOpacity>
						<PlusCircleIcon
							onPress={() => dispatch(addItemInCart({ _id, price }))}
							color="#00ccbb"
							size={40}
						/>
					</TouchableOpacity>
				</View>
			) : null}
		</View>
	);
};

export default DishItem;
