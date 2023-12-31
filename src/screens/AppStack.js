import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from './login';
import Register from './register'

import Tabs from './(tabs)/_layout';
import Discount from './(tabs)/discount';
import Checkout from './(tabs)/_checkout/index';
import ItemDetail from './(tabs)/_home/ItemDetail';
import Editprofile from './(tabs)/_setting/editProfile';
import DetailScreen from './(tabs)/_inspiration/detail-inspiration';
import Address from './(tabs)/_address/Address';
import FormAdd from './(tabs)/_address/FormAdd';
import History from './(tabs)/_checkout/history';
import DisplaySnap from '../midtrans/snap';

const Stack = createNativeStackNavigator();
const noHead = { headerShown: false };

function MyStack() {
  return (
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name="Login" component={Login} options={noHead} />
            <Stack.Screen name="Register" component={Register} options={noHead} />

            <Stack.Screen name="Tabs" component={Tabs} options={noHead} />

            <Stack.Screen name='Discount' component={Discount}/>
            <Stack.Screen name='Address' component={Address}/>
            <Stack.Screen name='History' component={History}/>
            <Stack.Screen name='Checkout' component={Checkout} />
            
            <Stack.Screen name='Payment Gateway' component={DisplaySnap}/>
            <Stack.Screen name='Item Detail' component={ItemDetail}/>
            <Stack.Screen name='Form Address' component={FormAdd}/>
            
            <Stack.Screen name='Edit Profile' component={Editprofile}/>
            <Stack.Screen name='Detail Inspiration' component={DetailScreen} />
        </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MyStack;
