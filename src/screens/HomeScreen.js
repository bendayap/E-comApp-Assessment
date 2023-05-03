import React, { useEffect, useState, } from "react";
import { ScrollView } from 'react-native-virtualized-view';
import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';
import SelectDropdown from "react-native-select-dropdown";
import fakestoreapi from "../api/fakestoreapi";
import ProductsList from "../components/ProductsList";
import useProducts from "../hooks/useProducts";
import { Feather } from '@expo/vector-icons';

const HomeScreen = ({ navigation }) => {
    const [apiGetAllProducts, products, categories, errorMessage] = useProducts();
    const [selectedCategory, setSelectedCategory] = useState('');
    const [filteredProduct, setFilteredProduct] = useState([]);

    const onSelect = (selectedItem, index) => {
        setSelectedCategory(selectedItem)
    };

    const filterProducts = async () => {
        if (selectedCategory) {
            const response = await fakestoreapi.get(`products/category/${selectedCategory}`, {
                params: {
                    limit: 50,
                }
            });
            setFilteredProduct(response.data);
        }
    };

    const clearFilter = () => {
        setSelectedCategory('');
    };

    useEffect(() => {
        filterProducts();
    }, [selectedCategory]);

    return (
        <View styles={styles.mainContainer}>
            <>
                <View style={styles.filterContainer}>
                    <SelectDropdown
                        style={{ flex: 2 }}
                        data={categories}
                        defaultButtonText="Select a Category"
                        onSelect={(selectedItem, index) => { onSelect(selectedItem, index) }}
                        buttonTextAfterSelection={(selectedItem, index) => {
                            return !selectedCategory ? "Select a Category" : selectedCategory
                        }}
                        rowTextForSelection={(item, index) => {
                            return item
                        }}
                    />
                    <Button style={styles.clearFilterButton} title='Clear Filter' onPress={() => clearFilter()} />
                </View>
                {errorMessage ? <Text>{errorMessage}</Text> : null}

                {!selectedCategory
                    ? <ScrollView><ProductsList products={products} title={'All Products'} category={selectedCategory} /></ScrollView>
                    : <ScrollView><ProductsList products={filteredProduct} title={`${selectedCategory}`} category={selectedCategory} /></ScrollView>
                }
            </>
        </View>
    );
};

HomeScreen.navigationOptions = ({ navigation }) => {
    return {
        headerRight: () => (
            <TouchableOpacity
                style={styles.cartButton}
                onPress={() => { navigation.navigate('Cart') }}
            >
                <Feather name="shopping-cart" size={30} />
            </TouchableOpacity>
        )
    };
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    filterContainer: {
        flexDirection: "row",
        marginHorizontal: 15,
        marginVertical: 10,
    },
    cartButton: {
        marginRight: 15,
    },
    clearFilterButton: {
        flex: 1,
        alignSelf: "flex-end",
    }
});

export default HomeScreen;