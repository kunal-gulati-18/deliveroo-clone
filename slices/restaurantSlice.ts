import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const restaurantSlice = createSlice({
	name: 'restaurants',
	initialState: {
		restaurantsData: {},
	},
	reducers: {
		setRestaurantData(state, action: PayloadAction<string>) {
			const { payload } = action;
			state.restaurantsData = {
				...state.restaurantsData,
				...payload,
			};
		},
	},
});

export const { setRestaurantData } = restaurantSlice.actions;
export default restaurantSlice.reducer;
