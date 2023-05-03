import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import CartScreen from './src/screens/CartScreen';
import HomeScreen from './src/screens/HomeScreen';
import ProductsShowScreen from './src/screens/ProductsShowScreen';
import CartProvider from './src/context/CartProvider';

const navigator = createStackNavigator(
  {
    Home: HomeScreen,
    ProductShow: ProductsShowScreen,
    Cart: CartScreen,
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: {
      title: "E-commerce App",
    },
  }
);

const App = createAppContainer(navigator);

export default () => {
  return (
    <CartProvider>
      <App />
    </CartProvider>
  );
};
