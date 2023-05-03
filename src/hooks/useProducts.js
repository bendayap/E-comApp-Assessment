import { useEffect, useState } from "react";
import fakestoreapi from "../api/fakestoreapi";

export default () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    const apiGetAllProducts = async () => {
        try {
            const productsResponse = await fakestoreapi.get('/products', {
                params: {
                    limit: 50,
                }
            });
            setProducts(productsResponse.data);

            const categoriesResponse = await fakestoreapi.get('/products/categories', {
                params: {
                    limit: 50,
                }
            });
            setCategories(categoriesResponse.data);
        } catch (err) {
            setErrorMessage('Something went wrong!');
        }
    };

    // const searchApi = async (searchTerm) => {
    //     try {
    //         const response = await yelp.get('/search', {
    //             params: {
    //                 limit: 50,
    //                 // term: searchTerm,
    //                 // location: 'san jose',
    //             }
    //         });
    //         setResults(response.data.businesses);
    //     } catch (err) {
    //         setErrorMessage('Something went wrong!');
    //     }
    // };

    //Call searchApi when component is first rendered
    useEffect(() => {
        // searchApi('pasta')
        apiGetAllProducts()
    }, []);

    return [apiGetAllProducts, products, categories, errorMessage];
};