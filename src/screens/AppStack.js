import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from './login';
import Register from './register'

import Tabs from './(tabs)/_layout';
import Discount from './_home/discount';
import Checkout from './_home/Checkout';
import ItemDetail from './_home/ItemDetail';
import Editprofile from './_setting/editProfile';
import DetailScreen from './_inspiration/detail-inspiration';
import Address from './_address/Address';
import FormAddress from './_address/FormAddress';

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
            <Stack.Screen name='Checkout' component={Checkout} options={({route}) => ({
              title: route.params?.title,
            })}
            initialParams={{
              totalPrice: "",
            }}
            />
            <Stack.Screen name='Item Detail' component={ItemDetail}/>
            <Stack.Screen name='Form Address' component={FormAddress}/>
            
            <Stack.Screen name='Edit Profile' component={Editprofile}/>
            <Stack.Screen name='Detail Inspiration' component={DetailScreen} />
        </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MyStack;
