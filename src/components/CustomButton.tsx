import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';

interface CustomButtonProps {
  color: string;
  widthPercentage: number; // New prop for specifying width as a percentage of the screen width
  title: string;
  onPress: () => void;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  color,
  widthPercentage,
  title,
  onPress,
}) => {
  const screenWidth = Dimensions.get('window').width;
  const buttonWidth = screenWidth * (widthPercentage / 100);

  return (
    <TouchableOpacity
      style={[styles.button, {backgroundColor: color, width: buttonWidth}]}
      onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default CustomButton;
