import React from 'react';
import {Pressable,View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


interface BtnProps {
    Name:string;
    Size:number;
    onPress:()=>{};
  }

function IconButton ({Name,Size,onPress}:BtnProps){

  return (
    <Pressable onPress={onPress} style={{padding:5}}>
       <Icon name={Name} size={Size}/>
    </Pressable>
  );
}


export default IconButton;