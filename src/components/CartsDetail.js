import React from "react";
import { View, Image, Text, StyleSheet } from 'react-native';

const CartsDetail = ({ cart }) => {
    return (
        <View style={styles.container}>
            <Image style={styles.image} source={{ uri: cart.image }} />
            <Text style={styles.title}>{cart.title}</Text>
            <Text>{cart.category}</Text>
            <Text>RM {cart.price.toFixed(2)}</Text>
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

export default CartsDetail;