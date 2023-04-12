import { useEffect, useState } from 'react';
import { checkDefinedValue } from '../../../utils';
import sanityClient from '../../../sanity';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setRestaurantData } from '../../../slices/restaurantSlice';

export const useFetchRestaurantData = ({ id }: { id: string }) => {
	const dispatch = useDispatch();
	const { restaurantsData } = useSelector((state) => state.restaurants);
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (checkDefinedValue(id)) {
			if (restaurantsData?.hasOwnProperty(id)) {
				return setData(restaurantsData[id]);
			}

			return sanityClient
				.fetch(
					`*[_type == 'restaurant' && _id == '${id}']{
                    ...,
                    dishes[]->{
                        ...,
                      }
                  }[0]`
				)
				.then((data) => {
					setData(data);

					const payload = {
						[data._id]: {
							...data,
						},
					};
					dispatch(setRestaurantData(payload));
				})
				.catch((_) => {
					setData([]);
				})
				.finally(() => {
					setLoading(false);
				});
		}
	}, [id]);

	return {
		data,
		loading,
	};
};
