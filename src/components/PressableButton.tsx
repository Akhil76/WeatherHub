import React from 'react';
import { Pressable, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface CardProps {
  title:String;
  onPress:()=>{};
}
function PressableButton({title,onPress}:CardProps) {
  const navigation = useNavigation();
  return (
    <Pressable 
    onPress={onPress}  
    >
        <Text style={{fontSize:20}}>{title}</Text>
    </Pressable>
  );
}


export default PressableButton;