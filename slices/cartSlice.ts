import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const cartSlice = createSlice({
	name: 'cart',
	initialState: {
		cartData: [],
	},
	reducers: {
		addItemInCart(state, action: PayloadAction<string>) {
			const { payload } = action;

			let newCartData = [];

			let currentPayloadItemIdx = state.cartData.findIndex(
				(item) => item._id === payload._id
			);

			if (currentPayloadItemIdx !== -1) {
				//item exists in cart
				newCartData = state.cartData.map((item, idx) => {
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
				newCartData = [...state.cartData, { ...(payload as any), count: 1 }];
			}

			state.cartData = newCartData;
		},
		removeItemFromCart(state, action: PayloadAction<string>) {
			const { payload } = action;

			let newCartData = [...state.cartData];

			let currentPayloadItemIdx = state.cartData.findIndex(
				(item) => item._id === payload._id
			);
			if (currentPayloadItemIdx !== -1) {
				//item exists in cart
				newCartData = state.cartData.map((item, idx) => {
					if (idx === currentPayloadItemIdx) {
						return {
							...item,
							count: item.count - 1,
						};
					}

					return item;
				});
			}

			state.cartData = newCartData;
		},
	},
});

export const { addItemInCart, removeItemFromCart } = cartSlice.actions;

export const selectBasketItems = (state) => state?.cart?.cartData;

export const selectBasketItemWithId = (state, id) =>
	state?.cartData?.find((item) => item._id === id)?.count || null;

export const selectBasketItemTotalPrice = (state) => state?.cart?.cartData?.reduce((total, item) => total = total + item.price , 0);

export default cartSlice.reducer;
