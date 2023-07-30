import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import {Order} from '../store/reducers';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface Props {
  order: Order;
  onComplete?: (orderId: string) => void;
  onDelete?: (orderId: string) => void;
}

const OrderListItem: React.FC<Props> = ({order, onComplete, onDelete}) => {
  const {id, customerName, phoneNumber, tableId, dishes, isCompleted} = order;
  const [showCompleteAlert, setShowCompleteAlert] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);

  const handleComplete = () => {
    if (onComplete) {
      onComplete(id);
    }
    Alert.alert('Order Completed', 'Order is successfully completed', [
      {text: 'OK', onPress: () => {}},
    ]);
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete(id);
    }
    Alert.alert('Order Deleted', 'Order is successfully deleted', [
      {text: 'OK', onPress: () => {}},
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.orderDetails}>
        <View style={styles.row}>
          <Text style={[styles.label, styles.bold]}>Customer Name:</Text>
          <Text style={styles.value}>{customerName}</Text>
        </View>

        <View style={styles.row}>
          <Text style={[styles.label, styles.bold]}>Phone Number:</Text>
          <Text style={styles.value}>{phoneNumber}</Text>
        </View>

        <View style={styles.row}>
          <Text style={[styles.label, styles.bold]}>Table ID:</Text>
          <Text style={styles.value}>{tableId}</Text>
        </View>

        <View style={styles.row}>
          <Text style={[styles.label, styles.bold]}>Items:</Text>
          <Text style={styles.value}>{dishes.join(', ')}</Text>
        </View>

        <View style={styles.row}>
          <Text style={[styles.label, styles.bold]}>Status:</Text>
          <Text
            style={[
              styles.value,
              styles.statusValue,
              isCompleted && styles.completedStatus, // Conditionally apply completedStatus style
            ]}>
            {isCompleted ? 'Completed' : 'Pending'}
          </Text>
        </View>
      </View>

      <View style={styles.buttonsContainer}>
        {onComplete && (
          <TouchableOpacity onPress={handleComplete}>
            <Icon name="check-circle-outline" color={'green'} size={40} />
          </TouchableOpacity>
        )}

        {onDelete && (
          <TouchableOpacity onPress={handleDelete}>
            <Icon name="delete" color={'red'} size={40} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderWidth: 0.25,
    borderColor: 'gray',
    padding: 10,
  },
  orderDetails: {
    flex: 1,
    marginHorizontal: 10,
  },
  buttonsContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  value: {
    fontSize: 14,
    textAlign: 'right',
    lineHeight: 18,
  },
  bold: {
    fontWeight: 'bold',
  },
  statusValue: {
    fontSize: 16,
    color: 'orange',
  },
  completedStatus: {
    color: 'green',
  },
});

export default OrderListItem;
