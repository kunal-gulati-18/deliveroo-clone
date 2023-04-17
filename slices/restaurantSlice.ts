import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const restaurantSlice = createSlice({
	name: 'restaurants',
	initialState: {
		restaurantsData: {},
		currentlyActiveRestaurant: null,
	},
	reducers: {
		setRestaurantData(state, action: PayloadAction<string>) {
			const { payload } = action;
			state.restaurantsData = {
				...state.restaurantsData,
				...payload,
			};
		},
		currentActiveRestaurant(state, action: PayloadAction<{}>) {
			const { payload } = action;
			state.currentlyActiveRestaurant = payload;
		},
	},
});

export const { currentActiveRestaurant, setRestaurantData } = restaurantSlice.actions;

export const currentlyActiveRestaurantSelector = (state) =>
	state.restaurants.currentlyActiveRestaurant;
export default restaurantSlice.reducer;
