import React from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Button } from 'react-native';
import { withNavigation } from "react-navigation";
import CartsDetail from "./CartsDetail";

const CartsList = ({
    title,
    itemsInCart,
    cartItems,
    handleRemoveItem,
    handleQuantityChangeInCart,
    navigation }) => {
    if (!itemsInCart) {
        return null;
    }

    const renderItem = ({ item }) => {
        const itemInCart = item;
        const cartItem = cartItems.find((cartItem) => cartItem.productId === itemInCart.id);
        const quantity = cartItem ? cartItem.quantity : 0;

        return (
            <View style={styles.listContainer}>
                <TouchableOpacity
                    style={styles.cartsDetailStyle}
                    onPress={
                        () => navigation.navigate('ProductShow', { id: itemInCart.id })
                    }
                >
                    <CartsDetail cart={itemInCart} />
                </TouchableOpacity>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => handleQuantityChangeInCart(itemInCart.id, 'subtract')}>
                        <Text style={{ fontSize: 20, paddingHorizontal: 10 }}>-</Text>
                    </TouchableOpacity>
                    <Text style={{ fontSize: 18 }}>{quantity}</Text>
                    <TouchableOpacity onPress={() => handleQuantityChangeInCart(itemInCart.id, 'add')}>
                        <Text style={{ fontSize: 20, paddingHorizontal: 10 }}>+</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleRemoveItem(itemInCart.id)}>
                        <Text style={{ fontSize: 20, paddingHorizontal: 10 }}>x</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <FlatList
                showsVerticalScrollIndicator={false}
                scrollEnabled={false}
                data={itemsInCart}
                keyExtractor={itemsInCart.id}
                renderItem={renderItem}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 15,
        marginBottom: 5,
    },
    container: {

    },
    listContainer: {
        flexDirection: "row",
    },
    cartsDetailStyle: {
        flex: 2,
    },
});

export default withNavigation(CartsList);