import { useEffect, useState } from 'react';
import sanityClient from '../../../sanity';

export const useFetchDataFromApi = () => {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		sanityClient
			.fetch(
				`*[_type == 'featured_categories']{
				...,
				restaurant[]->{
				  ...,
				  type->{
					...,
					name
				  }
				}
			  }`
			)
			.then((data) => {
				setData(data);
			})
			.catch(() => {
				setData([]);
			})
			.finally(() => {
				setLoading(false);
			});
	}, []);

	return {
		data,
		loading,
	};
};
