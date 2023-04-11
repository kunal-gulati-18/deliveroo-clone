import { useEffect, useState } from 'react';
import sanityClient from '../../../sanity';

export const useFetchDataFromApi = () => {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		sanityClient
			.fetch("*[_type == 'category']")
			.then((data) => {
				setData(data);
			})
			.catch((_) => {
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

export default useFetchDataFromApi;
