import { Text, View, TouchableOpacity, Image } from 'react-native';
import { XCircleIcon } from 'react-native-heroicons/solid';
import { useSelector } from 'react-redux';
import { currentlyActiveRestaurantSelector } from '../../slices/restaurantSlice';
import CurrencyFormat from 'react-currency-format';
import { removeItemFromCart, selectBasketItems } from '../../slices/cartSlice';
import { urlFor } from '../../sanity';
import { useDispatch } from 'react-redux';

const CartScreen = () => {
	const dispatch = useDispatch();
	const currentlYActiveRestaurantInformation = useSelector(
		currentlyActiveRestaurantSelector
	);
	const cartItems = useSelector(selectBasketItems);

	const removeItemFromCartFn = (_id: string) => {
		dispatch(removeItemFromCart({ _id }));
	};

	return (
		<View className="flex-col">
			<View className="bg-white py-4 px-2 w-full flex-row items-start shadow">
				<View className="flex-col flex-1 justify-center items-center">
					<Text className="font-extrabold text-lg">Basket</Text>
					<Text className="text-sm text-gray-400">
						{currentlYActiveRestaurantInformation?.name}
					</Text>
				</View>
				<View className="mr-4">
					<XCircleIcon size={34} color="#00ccbb" />
				</View>
			</View>
			<View className="mt-4">
				<View className="bg-white p-4 flex-row justify-between">
					<View>
						<View>
              <Image
              source={{
                uri: ""
              }}

              className="w-20 h-20 rounded"
              />
            </View>
						<Text className="font-bold">Deliver in 50-75 min.</Text>
					</View>
					<View>
						<TouchableOpacity>
							<Text className="font-semibold text-green-400">Change</Text>
						</TouchableOpacity>
					</View>
				</View>
				{cartItems?.length ? (
					<View className="flex-col bg-white">
						{cartItems
							?.filter((cartItem) => cartItem.count > 0)
							?.map((cartItem) => (
								<View className="bg-white p-4 mx-2 items-center flex-row">
									<View className="items-center flex-row space-x-2">
										<Text>{cartItem.count}x</Text>
										{cartItem?.image ? (
											<Image
												source={{
													uri: urlFor(cartItem.image).url(),
												}}
												className="w-20 h-20 rounded"
											/>
										) : null}
										<Text>{cartItem.name}</Text>
									</View>
									<View className="flex-row items-center space-x-2">
										<Text>
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
											<Text>Remove</Text>
										</TouchableOpacity>
									</View>
								</View>
							))}
						<View></View>
					</View>
				) : null}
			</View>
			<View></View>
		</View>
	);
};

export default CartScreen;
