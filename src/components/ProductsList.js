import React from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { withNavigation } from "react-navigation";
import ProductsDetail from "./ProductsDetail";

const ProductsList = ({ title, products, category, navigation }) => {
    if (!products.length) {
        return null;
    } else if (products[0].category != category && category != '') {
        return null;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <FlatList
                showsVerticalScrollIndicator={false}
                scrollEnabled={false}
                data={products}
                keyExtractor={products.id}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity
                            style={styles.productsDetailStyle}
                            onPress={() => navigation.navigate('ProductShow', { id: item.id })}>
                            <ProductsDetail product={item} />
                        </TouchableOpacity>
                    )
                }}
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
    productsDetailStyle: {
        flex: 2,
    },
});

export default withNavigation(ProductsList);