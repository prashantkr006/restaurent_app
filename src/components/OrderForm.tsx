import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Modal,
  StyleSheet,
  FlatList,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {addOrder} from '../store/reducers';
import {Picker} from '@react-native-picker/picker';

const foodItemsData = [
  'Butter Chicken',
  'Chicken Tikka Masala',
  'Palak Paneer',
  'Chole Bhature',
  'Rajma Chawal',
  'Samosa',
  'Biryani',
  'Dosa',
  'Vada Pav',
  'Idli',
  'Pani Puri',
  'Tandoori Chicken',
  'Malai Kofta',
  'Aloo Gobi',
  'Paneer Butter Masala',
  'Gulab Jamun',
  'Jalebi',
  'Rasgulla',
  'Pav Bhaji',
  'Kulfi',
  'Chaat',
  'Dal Makhani',
  'Matar Paneer',
  'Naan',
  'Aloo Paratha',
  'Fish Curry',
  'Mutton Rogan Josh',
  'Goan Fish Curry',
  'Hyderabadi Biryani',
  'Kadai Paneer',
  'Prawn Curry',
  'Raita',
  'Lassi',
  'Papdi Chaat',
  'Rasmalai',
  'Shahi Paneer',
  'Veg Pulao',
  'Chana Masala',
  'Pesarattu',
  'Medu Vada',
  'Malabar Parotta',
  'Keema Samosa',
  'Chicken Korma',
  'Kheer',
  'Kulfi Falooda',
  'Murg Makhani',
  'Murgh Musallam',
  'Phirni',
];

interface FormComponentProps {
  onClose: () => void; // Prop to close the modal
}

const FormComponent: React.FC<FormComponentProps> = ({onClose}) => {
  const [formData, setFormData] = useState({
    customerName: '',
    phoneNumber: '',
    tableId: '',
    selectedFoodItems: [] as string[],
  });

  // State variables for error messages
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [customerNameError, setCustomerNameError] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [tableIdError, setTableIdError] = useState('');

  const dispatch = useDispatch();

  const handleAddOrder = () => {
    // Form validation
    let isError = false;

    if (!formData.customerName) {
      setCustomerNameError('Please enter customer name');
      isError = true;
    } else {
      setCustomerNameError('');
    }

    if (!formData.phoneNumber) {
      setPhoneNumberError('Please enter phone number');
      isError = true;
    } else if (formData.phoneNumber.length !== 10) {
      setPhoneNumberError('Phone number should be exactly 10 digits');
      isError = true;
    } else {
      setPhoneNumberError('');
    }

    if (!formData.tableId) {
      setTableIdError('Please enter table ID');
      isError = true;
    } else if (!/^A\d{2}$/.test(formData.tableId)) {
      setTableIdError(
        'Table ID should be in the format AXX, where XX is a number',
      );
      isError = true;
    } else {
      setTableIdError('');
    }

    if (isError) {
      // If there are errors, don't proceed with adding the order
      return;
    }

    // If there are no errors, proceed with adding the order
    const newOrder = {
      id: (Math.floor(Math.random() * 1000) + 1).toString(),
      customerName: formData.customerName || '',
      phoneNumber: Number(formData.phoneNumber) || 0,
      tableId: formData.tableId || '',
      dishes: formData.selectedFoodItems || [],
      isCompleted: false,
      orderStatus: 'Pending',
    };

    console.log('order form data-- ', newOrder);
    dispatch(addOrder(newOrder));
    setFormData({
      customerName: '',
      phoneNumber: '',
      tableId: '',
      selectedFoodItems: [] as string[],
    }); // Clear the form data
    setSelectedItems([]); // Clear the selected items
    onClose(); // Close the modal
  };

  const handleSelectItem = (itemValue: string) => {
    // Check if the item is already selected, then deselect it, otherwise add it to selectedFoodItems
    if (formData.selectedFoodItems.includes(itemValue)) {
      setFormData({
        ...formData,
        selectedFoodItems: formData.selectedFoodItems.filter(
          item => item !== itemValue,
        ),
      });
    } else {
      setFormData({
        ...formData,
        selectedFoodItems: [...formData.selectedFoodItems, itemValue],
      });
    }
  };

  const renderSelectedItem = ({item}: {item: string}) => (
    <Text style={styles.selectedItem}>{item}</Text>
  );

  return (
    <Modal visible={true} animationType="slide" transparent={true}>
      <View style={styles.modalBackground}>
        <View style={styles.modalContent}>
          <Text style={styles.label}>Customer Name:</Text>
          <TextInput
            style={styles.input}
            value={formData.customerName}
            onChangeText={text =>
              setFormData({...formData, customerName: text})
            }
            placeholder="Enter customer name"
            placeholderTextColor="#aaa"
          />
          {customerNameError ? (
            <Text style={styles.error}>{customerNameError}</Text>
          ) : null}

          <Text style={styles.label}>Phone Number:</Text>
          <TextInput
            style={styles.input}
            value={formData.phoneNumber}
            onChangeText={text => setFormData({...formData, phoneNumber: text})}
            placeholder="Enter phone number"
            placeholderTextColor="#aaa"
            keyboardType="numeric" // Show numeric keyboard
          />
          {phoneNumberError ? (
            <Text style={styles.error}>{phoneNumberError}</Text>
          ) : null}

          <Text style={styles.label}>Table ID:</Text>
          <TextInput
            style={styles.input}
            value={formData.tableId}
            onChangeText={text => setFormData({...formData, tableId: text})}
            placeholder="Enter table ID (e.g., A01, A12)"
            placeholderTextColor="#aaa"
          />
          {tableIdError ? (
            <Text style={styles.error}>{tableIdError}</Text>
          ) : null}

          <View style={styles.dropdownContainer}>
            <Text style={styles.label}>Food Items:</Text>
            <Picker
              selectedValue={formData.selectedFoodItems[0]} // Use the first item as the selected value (can be null)
              onValueChange={itemValue => handleSelectItem(itemValue)}
              mode="dropdown">
              <Picker.Item label="Select food items..." value={null} />
              {foodItemsData.map(item => (
                <Picker.Item key={item} label={item} value={item} />
              ))}
            </Picker>
          </View>

          <View style={styles.selectedItemsContainer}>
            <Text style={styles.label}>Selected Items:</Text>
            <View style={styles.selectedItemsList}>
              {formData.selectedFoodItems.map(item => (
                <View key={item} style={styles.selectedItem}>
                  <Text>{item}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <Button title="Cancel" onPress={onClose} color="#888" />
            <Button title="Add Order" onPress={handleAddOrder} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    width: '80%', // Adjust the width as needed
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
    marginBottom: 10,
    color: '#333',
  },
  dropdownContainer: {
    marginBottom: 20,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    padding: 5,
  },
  pickerInput: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    color: 'black',
  },
  foodItemText: {
    marginBottom: 5,
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  error: {
    color: 'red',
    marginBottom: 5,
  },
  pickerItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  selectedItemsContainer: {
    marginVertical: 10,
  },

  selectedItemsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },

  selectedItem: {
    padding: 5,
    margin: 3,
    borderRadius: 8,
    backgroundColor: '#e6e6e6',
  },
});

export default FormComponent;
