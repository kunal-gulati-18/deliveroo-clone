import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const cartSlice = createSlice({
	name: 'cart',
	initialState: {
		cartState: {
			data: [],
			attachedRestaurantId: '',
		},
	},
	reducers: {
		addItemInCart(state, action: PayloadAction<{}>) {
			const { payload } = action;

			let oldCartData = [...state.cartState.data];
			let newCartData = [];

			if (
				action.payload.restaurantId !== state.cartState.attachedRestaurantId
			) {
				oldCartData = [];
			}

			let currentPayloadItemIdx = oldCartData.findIndex(
				(item) => item._id === payload.cartObj._id
			);

			if (currentPayloadItemIdx !== -1) {
				//item exists in cart
				newCartData = oldCartData.map((item, idx) => {
					if (idx === currentPayloadItemIdx) {
						return {
							...item,
							count: item.count + 1,
						};
					}

					return item;
				});
			} else {
				//item does not exist in cart
				newCartData = [
					...oldCartData,
					{ ...(payload.cartObj as any), count: 1 },
				];
			}

			state.cartState.data = newCartData;

			if (action.payload.restaurantId === state.cartState.attachedRestaurantId)
				return state;
			state.cartState.attachedRestaurantId = action.payload.restaurantId;
		},
		removeItemFromCart(state, action: PayloadAction<string>) {
			const { payload } = action;

			let newCartData = [...state.cartState.data];

			let currentPayloadItemIdx = state.cartState.data.findIndex(
				(item) => item._id === payload.cartObj._id
			);
			if (currentPayloadItemIdx !== -1) {
				//item exists in cart
				newCartData = state.cartState.data.map((item, idx) => {
					if (idx === currentPayloadItemIdx) {
						return {
							...item,
							count: item.count - 1,
						};
					}

					return item;
				});
			}

			state.cartState.data = newCartData.filter(cartItem => cartItem.count > 0);
		},
	},
});

export const { addItemInCart, removeItemFromCart } = cartSlice.actions;

export const selectBasketItems = (state) => state?.cart?.cartState?.data;

export const selectBasketItemWithId = (state, id) =>
	state?.cart?.cartState?.data?.find((item) => item._id === id)?.count || null;

export const selectBasketItemTotalPrice = (state) =>
	state?.cart?.cartState?.data?.reduce(
		(total, item) => (total = total + item.price * item.count),
		0
	);

export const currentBasketRestaurantOwner = (state) =>
	state?.cart?.cartState?.attachedRestaurantId;
export default cartSlice.reducer;
