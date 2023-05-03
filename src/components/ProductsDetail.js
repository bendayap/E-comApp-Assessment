import React from "react";
import { View, Image, Text, StyleSheet } from 'react-native';

const ProductsDetail = ({ product }) => {
    return (
        <View style={styles.container}>
            <Image style={styles.image} source={{ uri: product.image }} />
            <Text style={styles.title}>{product.title}</Text>
            <Text>{product.category}</Text>
            <Text>Rate number: {product.rating.count}</Text>
            <Text>Rate score: {product.rating.rate}</Text>
            <Text>RM {product.price.toFixed(2)}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginLeft: 15,
        marginBottom: 15,
    },
    image: {
        width: 250,
        height: 120,
        borderRadius: 4,
        marginBottom: 5,
    },
    title: {
        fontWeight: 'bold',
    }
});

export default ProductsDetail;