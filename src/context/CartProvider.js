import React, { createContext, useEffect, useState } from 'react';
import useProducts from "../hooks/useProducts";
import fakestoreapi from "../api/fakestoreapi";
import jsonServer from '../api/jsonServer';

export const CartContext = createContext();

const CartProvider = (props) => {
  const userId = '3';
  const [cartData, setCartData] = useState({});
  const [cartItems, setCartItems] = useState([]);
  const [itemsInCart, setItemsInCart] = useState([]);
  const [apiGetAllProducts, products, categories, errorMessage] = useProducts();

  const getCart = async () => {
    try {
      // const response = await fakestoreapi.get(`/carts/user/${userId}`);
      const response = await jsonServer.get('carts');
      const data = response.data;
      if (data.length > 1) {
        let i;
        for (i = 0; i < data.length; i++) {
          //if is not last item in array
          if (i != data.length - 1) {
            if (data[i].id < data[i + 1].id) {
              setCartData(data[i + 1]);
              setCartItems(data[i + 1].products);
            }
          }
        }
      } else {
        setCartData(data);
        setCartItems(data.products);
      }
    } catch (error) {
      console.log('Something went wrong, rerunning getCart process.');
      getCart();

    }
  }

  const getItemsInCart = () => {
    // Filter products based on cart items
    if (cartItems)
      setItemsInCart(
        products.filter((product) =>
          cartItems.some((item) => item.productId === product.id)
        )
      );
  };

  const handleRemoveItem = (productId) => {
    const updatedItems = cartItems.filter((item) => item.productId !== productId);
    if (!updatedItems.length > 0)
      updateCarts([]);
    setCartItems(updatedItems);
  };

  const getCartItemById = (productId) => {
    return cartItems.find((item) => item.productId === productId);
  };

  const updateCartItemQuantity = (productId, quantity) => {
    const updatedItems = cartItems.map((item) => {
      if (item.productId === productId) {
        return { ...item, quantity };
      }
      return item;
    });
    setCartItems(updatedItems);
  };

  const handleQuantityChangeInCart = (productId, action) => {
    const cartItem = getCartItemById(productId);
    if (cartItem) {
      const updatedQuantity = action === 'add'
        ? cartItem.quantity + 1
        : cartItem.quantity > 1 ? cartItem.quantity - 1 : cartItem.quantity;
      updateCartItemQuantity(productId, updatedQuantity);
    }
  };

  const addToCart = (productId) => {
    const existingCartItem = getCartItemById(productId);
    if (existingCartItem) {
      updateCartItemQuantity(productId, existingCartItem.quantity + 1);
    } else {
      const newCartItem = { productId, quantity: 1 };
      setCartItems([...cartItems, newCartItem]);
    }
  };

  const updateCarts = async (updatedProducts) => {
    const updatedCartData = {
      ...cartData,
      products: updatedProducts
    };
    try {
      await jsonServer.put(`carts/${cartData.id}`, updatedCartData);
    } catch (error) {
      console.log('Something went wrong, rerunning updateCarts process.');
      updateCarts(updatedProducts);

    }
  };

  const handleCheckout = async () => {
    await updateCarts([]);
    setCartItems([]);
  };


  useEffect(() => {
    getCart();
  }, []);

  useEffect(() => {
    if (cartItems.length > 0) {
      updateCarts(cartItems);
    }
    getItemsInCart();
  }, [cartItems, products]);

  return (
    <CartContext.Provider value={{
      cartItems,
      setCartItems,
      itemsInCart,
      setItemsInCart,
      getCart,
      getItemsInCart,
      handleRemoveItem,
      handleQuantityChangeInCart,
      addToCart,
      handleCheckout
    }}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
