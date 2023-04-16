import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import CurrencyFormat from 'react-currency-format';
import { useSelector } from 'react-redux';
import {
	selectBasketItemTotalPrice,
	selectBasketItems,
} from '../../slices/cartSlice';
import { useNavigation } from '@react-navigation/native';

const BasketButton = () => {
	const cartData = useSelector(selectBasketItems);
    console.log(cartData)
	const cartTotalPrice = useSelector(selectBasketItemTotalPrice);
	const navigation = useNavigation();

	const goToCart = () => {
		navigation.navigate('Cart');
	};
	return (
		<TouchableOpacity
			onPress={goToCart}
			className="flex-row items-center bg-[#00ccbb] w-full mx-5 p-4 rounded-lg space-x-1"
		>
			<View>
				<Text className="text-lg text-white font-extrabold bg-[#01a296] py-1 px-2">
					{cartData?.length}
				</Text>
			</View>
			<Text className="text-lg text-white font-extrabold flex-1 text-center">
				View Basket
			</Text>
			<Text>
				<CurrencyFormat
					value={cartTotalPrice}
					displayType="text"
					prefix="€"
					renderText={(formattedValue) => (
						<Text className="font-extrabold text-lg text-white">
							{formattedValue}
						</Text>
					)}
					thousandSeparator={true}
				/>
			</Text>
		</TouchableOpacity>
	);
};

export default BasketButton;
