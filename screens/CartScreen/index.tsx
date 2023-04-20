import {
	Text,
	View,
	TouchableOpacity,
	Image,
	ScrollView,
	Animated,
	Easing,
} from 'react-native';
import { XCircleIcon } from 'react-native-heroicons/solid';
import { useSelector } from 'react-redux';
import { currentlyActiveRestaurantSelector } from '../../slices/restaurantSlice';
import CurrencyFormat from 'react-currency-format';
import {
	removeItemFromCart,
	selectBasketItemTotalPrice,
	selectBasketItems,
} from '../../slices/cartSlice';
import { urlFor } from '../../sanity';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import Lottie from 'lottie-react-native';
import { useEffect, useRef } from 'react';

const CartScreen = () => {
	const dispatch = useDispatch();
	const navigation = useNavigation();
	const currentlYActiveRestaurantInformation = useSelector(
		currentlyActiveRestaurantSelector
	);
	const cartItems = useSelector(selectBasketItems);
	const cartTotalPrice = useSelector(selectBasketItemTotalPrice);

	const animationRef = useRef(null);

	const removeItemFromCartFn = (_id: string) => {
		dispatch(removeItemFromCart({ cartObj: { _id } }));
	};

	const placeOrder = () => {
		navigation.navigate('Preparing order');
	};

	useEffect(() => {
		if (animationRef.current && !cartItems?.length) {
			setTimeout(() => {
				animationRef.current.play();
			});
		}
	}, [animationRef, cartItems]);

	return (
		<View className="flex-col h-full w-full flex-1 relative">
			<View className="bg-white py-4 px-2 w-full flex-row items-start shadow">
				<View className="flex-col flex-1 justify-center items-center">
					<Text className="font-extrabold text-lg">Basket</Text>
					<Text className="text-sm text-gray-400">
						{currentlYActiveRestaurantInformation?.name}
					</Text>
				</View>
				<TouchableOpacity onPress={navigation.goBack} className="mr-4">
					<XCircleIcon size={34} color="#00ccbb" />
				</TouchableOpacity>
			</View>
			{cartItems?.length ? (
				<>
					<View className="mt-4">
						<View className="bg-white p-4 flex-row items-center justify-between">
							<View className="flex-row items-center space-x-2">
								<View>
									<Image
										source={{
											uri: 'https://images.unsplash.com/photo-1624535478774-c7269849fec4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
										}}
										className="w-10 h-10 rounded-full bg-gray-400"
									/>
								</View>
								<Text className="font-bold">Deliver in 50-75 min.</Text>
							</View>
							<View>
								<TouchableOpacity>
									<Text className="font-semibold text-[#00ccbb]">Change</Text>
								</TouchableOpacity>
							</View>
						</View>
					</View>
					<>
						<ScrollView
							showsVerticalScrollIndicator={false}
							className="flex-col mt-4 h-auto divide-y divide-gray-200"
						>
							{cartItems
								?.filter((cartItem) => cartItem.count > 0)
								?.map((cartItem) => (
									<View className="bg-white p-4 items-center justify-between flex-row">
										<View className="items-center flex-row space-x-3">
											<Text className="text-sm text-gray-400">
												{cartItem.count}x
											</Text>
											{cartItem?.image ? (
												<Image
													source={{
														uri: urlFor(cartItem.image).url(),
													}}
													className="w-10 h-10 rounded-full bg-gray-400"
												/>
											) : null}
											<Text className="font-bold">{cartItem.name}</Text>
										</View>
										<View className="flex-row items-center space-x-3">
											<Text className="font-semibold">
												<CurrencyFormat
													value={cartItem.price * cartItem.count}
													displayType="text"
													prefix="€"
													renderText={(formattedValue) => (
														<Text>{formattedValue}</Text>
													)}
													thousandSeparator={true}
												/>
											</Text>
											<TouchableOpacity
												onPress={() => removeItemFromCartFn(cartItem._id)}
											>
												<Text className="text-[#00ccbb]">Remove</Text>
											</TouchableOpacity>
										</View>
									</View>
								))}
						</ScrollView>
					</>
					<View className="relative bottom-1 p-5 bg-white flex-col space-y-4 w-full">
						<View className="flex-row items-center justify-between">
							<Text className="text-gray-400">Subtotal</Text>
							<Text>
								<CurrencyFormat
									value={cartTotalPrice}
									displayType="text"
									prefix="€"
									renderText={(formattedValue) => (
										<Text className="text-gray-400">{formattedValue}</Text>
									)}
									thousandSeparator={true}
								/>
							</Text>
						</View>
						<View className="flex-row items-center justify-between">
							<Text className="text-gray-400">Delivery fee</Text>
							<Text>
								<CurrencyFormat
									value={3.9}
									displayType="text"
									prefix="€"
									renderText={(formattedValue) => (
										<Text className="text-gray-400">{formattedValue}</Text>
									)}
									thousandSeparator={true}
								/>
							</Text>
						</View>
						<View className="flex-row items-center justify-between">
							<Text>Order Total</Text>
							<Text>
								<CurrencyFormat
									value={cartTotalPrice + 3.9}
									displayType="text"
									prefix="€"
									renderText={(formattedValue) => (
										<Text className="font-bold">{formattedValue}</Text>
									)}
									thousandSeparator={true}
								/>
							</Text>
						</View>
						<View className="w-full pb-6">
							<TouchableOpacity
								onPress={placeOrder}
								className="w-full flex-row justify-center bg-[#00ccbb] rounded-lg p-4"
							>
								<Text className="text-white font-bold text-lg">
									Place order
								</Text>
							</TouchableOpacity>
						</View>
					</View>
				</>
			) : (
				<View className="flex-col items-center justify-start h-full w-full mt-20 space-y-2">
					<Text className="text-lg font-semibold">
						Looks like your cart is empty.
					</Text>
					<Lottie
						ref={animationRef}
						className="h-50 w-full items-start flex-row mb-8"
						source={require('../assets/emptyCart.json')}
						autoPlay
						loop={true}
					/>
					<Text className="text-slate-900 font-semibold mt-4">
						Fill me up, buttercup!
					</Text>
				</View>
			)}
		</View>
	);
};

export default CartScreen;
