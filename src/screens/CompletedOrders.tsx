// src/screens/CompletedOrders.tsx

import React, {useEffect, useState} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {completeOrder, Order} from '../store/reducers';
import OrderListItem from '../components/OrderListItem';

const CompletedOrders: React.FC = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state: any) => state.orders.orders);
  const [completedOrders, setcompletedOrders] = useState<Order[]>([]);

  useEffect(() => {
    // Filter the orders to get the completed orders and update the state
    const completed = orders.filter((order: Order) => order.isCompleted);
    setcompletedOrders(completed);
  }, [orders]);

  const handleCompleteOrder = (orderId: string) => {
    dispatch(completeOrder(orderId));
  };

  console.log('Total completed orders--', completedOrders);
  return (
    <View style={styles.completedOrdersContainer}>
      <FlatList
        data={completedOrders}
        keyExtractor={item => item.id}
        renderItem={({item}) => <OrderListItem order={item} />}
        style={styles.flatListContainer}
      />
    </View>
  );
};

export default CompletedOrders;

const styles = StyleSheet.create({
  completedOrdersContainer: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  flatListContainer: {
    width: '100%', // Set the width to 100%
  },
});
