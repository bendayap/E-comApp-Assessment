import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, FlatList, Image, Button, Alert } from 'react-native';
import { ScrollView } from 'react-native-virtualized-view';
import CartsList from "../components/CartsList";
import { CartContext } from "../context/CartProvider";

const CartScreen = () => {
    const {
        cartItems,
        itemsInCart,
        handleRemoveItem,
        handleQuantityChangeInCart,
        handleCheckout,
    } = useContext(CartContext);

    const getTotal = () => {
        return cartItems.reduce((total, item) => {
            const product = itemsInCart.find((product) => product.id === item.productId);
            return total + product.price * item.quantity;
        }, 0);
    };

    const renderScreen = () => {
        return (
            <View style={styles.mainContainer}>
                {itemsInCart.length > 0
                    ? <>
                        <View style={styles.checkOutContainer}>
                            <Button title="Checkout" onPress={() => {
                                handleCheckout();
                                Alert.alert('Checked Out', `Total: RM ${getTotal().toFixed(2)}`);
                            }} />
                            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                                Total: RM {getTotal().toFixed(2)}
                            </Text>
                        </View>
                        <ScrollView>
                            <CartsList
                                title={'Your Item in Cart'}
                                itemsInCart={itemsInCart}
                                cartItems={cartItems}
                                handleRemoveItem={handleRemoveItem}
                                handleQuantityChangeInCart={handleQuantityChangeInCart}
                            />
                        </ScrollView>
                    </>
                    : <View style={styles.emptyCart}>
                        <Text>No item in Cart</Text>
                    </View>
                }
            </View>
        );
    }

    return (
        renderScreen()
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1
    },
    cartTotal: {
        fontSize: 20,
        fontWeight: 'bold',
        alignSelf: "flex-end",
    },
    checkOutContainer: {
        marginTop: 10,
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: 20,
    },
    emptyCart: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
});

export default CartScreen;