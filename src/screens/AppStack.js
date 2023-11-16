import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Register from './register'
import Tabs from './(tabs)/_layout';
import Discount from './discount';
import Address from './(detail)/Address';
import Checkout from './(detail)/Checkout';
import ItemDetail from './(detail)/ItemDetail';

const Stack = createNativeStackNavigator();
const noHead = { headerShown: false };

function MyStack() {
  return (
    <NavigationContainer>
        <Stack.Navigator>
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
            <Stack.Screen name='ItemDetail' component={ItemDetail}/>
        </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MyStack;
