// src/screens/HomeScreen.tsx

import React, {useEffect, useState} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {completeOrder, deleteOrder, Order} from '../store/reducers';
import OrderListItem from '../components/OrderListItem';
import OrderForm from '../components/OrderForm';
import CustomButton from '../components/CustomButton';

const HomeScreen: React.FC = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state: any) => state.orders.orders); // Use proper type for state
  const [isOrderFormVisible, setOrderFormVisible] = useState(false);
  const [pendingOrders, setPendingOrders] = useState<Order[]>([]);

  useEffect(() => {
    // Filter the orders to get the pending orders and update the state
    const pending = orders.filter((order: Order) => !order.isCompleted);
    setPendingOrders(pending);
  }, [orders]);

  const handleButtonPress = () => {
    // Show the OrderForm when the button is pressed
    setOrderFormVisible(true);
  };

  const handleOrderFormClose = () => {
    // Hide the OrderForm when the form is closed
    setOrderFormVisible(false);
  };

  const handleCompleteOrder = (orderId: string) => {
    dispatch(completeOrder(orderId));
  };

  const handleDeleteOrder = (orderId: string) => {
    dispatch(deleteOrder(orderId));
  };
  console.log('Total active orders--', pendingOrders);
  return (
    <View style={styles.homeContainer}>
      <CustomButton
        color="green"
        title="ADD ORDER"
        onPress={handleButtonPress}
        widthPercentage={50}
      />
      {isOrderFormVisible && <OrderForm onClose={handleOrderFormClose} />}
      <FlatList
        data={pendingOrders}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <OrderListItem
            order={item}
            onComplete={handleCompleteOrder}
            onDelete={handleDeleteOrder}
          />
        )}
        style={styles.flatListContainer}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  homeContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,
  },
  flatListContainer: {
    marginTop: 16,
    width: '100%', // Set the width to 100%
  },
});
