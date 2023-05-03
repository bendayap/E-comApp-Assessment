import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, FlatList, Image, Button } from 'react-native';
import fakestoreapi from "../api/fakestoreapi";
import { CartContext } from "../context/CartProvider";


const ProductsShowScreen = ({ navigation }) => {
    const id = navigation.getParam('id');
    const [product, setProduct] = useState(null);
    const { addToCart } = useContext(CartContext);

    const getProduct = async (id) => {
        try {
            const response = await fakestoreapi.get(`products/${id}`);
            setProduct(response.data);
        } catch (error) {
            console.log('Something went wrong, rerunning process.');
            getProduct(id);
        }
    };

    useEffect(() => {
        getProduct(id);
    }, []);

    if (!product) {
        return null;
    }

    return (
        <View style={styles.container}>
            <View style={styles.addToCartButton}>
                <Button title="Add to Cart" onPress={() => { addToCart(product.id) }} />
            </View>
            <Image style={styles.image} source={{ uri: product.image }} />
            <Text style={styles.title}>{product.title}</Text>
            <Text style={styles.text}>Price: RM {product.price.toFixed(2)}</Text>
            <Text style={styles.text}>{product.description}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        margin: 15,
    },
    image: {
        height: 200,
        width: 300,
        borderRadius: 4,
        marginBottom: 10,
        alignSelf: "center",
    },
    title: {
        fontWeight: 'bold',
        marginBottom: 5,
    },
    text: {
        marginBottom: 5,
    },
    addToCartButton: {
        top: 0,
        right: 0,
        alignSelf: "flex-end",
        marginBottom: 10,
    },
});

export default ProductsShowScreen;