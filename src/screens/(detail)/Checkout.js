import {
    NativeBaseProvider,
    ScrollView,
    Flex,
    Box,
    Image,
    View,
    Pressable,
    Text,
    Container,
    Divider,
    Radio,
    } from "native-base";
import {TouchableOpacity } from 'react-native';
import React, {Component, useState} from "react";
import { useNavigation, useRoute } from "@react-navigation/native";

const Checkout = ()=>{

    const route = useRoute();

    // const { totalPrice } = route.params;

    const Harga = route.params ? route.params.totalPrice : "";

    const [value, setValue] = React.useState("one");
    const navigation = useNavigation();
    return(
        <NativeBaseProvider>
            
            <View 
            width={'100%'} 
            marginBottom={79} 
            alignItems={'center'} 
            height={'100%'}>
                
                <ScrollView marginBottom={79}>
                    <TouchableOpacity onPress={()=> navigation.navigate('Address')}>
                        <Box justifyContent={'center'} padding={3} marginY={5} height={135} width={360} backgroundColor={'#FEFFC1'} borderRadius={10} alignSelf={'center'}>
                            <Text fontWeight={'bold'} fontSize={16}>Brody Pentagon</Text>
                            <Text color={'#89580A'} fontSize={12}>darkside@gmail.com</Text>
                            <Text color={'#89580A'} fontSize={12}>+14987889999</Text>
                            <Text fontWeight={'bold'} fontSize={14}>Leibnizstraße 16, Wohnheim 6, No: 8X Clausthal-Zellerfeld, Germany</Text>
                        </Box>
                    </TouchableOpacity>
                    
                    
                    <Text fontSize={15} fontWeight={'bold'} color={'#212529'}>Payment</Text>
                    <View justifyContent={'center'} alignItems={'center'}>
                        <Radio.Group name="myRadioGroup" accessibilityLabel="favorite number" value={value}
                        onChange={nextValue => {
                            setValue(nextValue);
                        }}>
                            <TouchableOpacity>
                                <Box 
                                // value="one"
                                style={setValue === "one" ? styles.selectedRadioButton : styles.unselectedRadioButton}
                                padding={3} my={3} borderRadius={10} alignSelf={'center'} height={66} width={348} backgroundColor={'#FEFFC1'}
                                flexDirection={'row'}
                                >
                                    <Radio shadow={2} value="one" my="2">
                                            <View marginRight={3}>
                                                <Text fontWeight={'bold'} color={'#89580A'} fontSize={11}>DANA</Text>
                                            </View>
                                    </Radio>
                                </Box>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Box 
                                // value="two"
                                style={setValue === "two" ? styles.selectedRadioButton : styles.unselectedRadioButton}
                                padding={3} my={3} borderRadius={10} alignSelf={'center'} height={66} width={348} backgroundColor={'#FEFFC1'}
                                flexDirection={'row'}
                                >
                                    <Radio shadow={2} value="two" my="2">
                                            <View marginRight={3}>
                                                <Text fontWeight={'bold'} color={'#89580A'} fontSize={11}>GOPAY</Text>
                                            </View>
                                    </Radio>
                                </Box>
                            </TouchableOpacity>
                            
                        </Radio.Group>
                    </View>
                    
                    <Text my={3}>Item Detail</Text>
                    <Box padding={3} flexDirection={'row'} alignSelf={'center'} borderRadius={10} backgroundColor={'#FEFFC1'} height={112} width={346}>
                        <Image 
                        justifyContent={'center'} 
                        marginRight={3} 
                        alignSelf={'center'} 
                        marginTop={15} 
                        width={90} 
                        height={65.95} 
                        alt="laci" 
                        source={{uri:"https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/images/553/0555306_PE660432_S5.webp"}} 
                        />
                        <View justifyContent={'center'} flexDirection={'column'}>
                            <Text>NORDLI</Text>
                            <Text>Drawer</Text>
                            <Text>Rp 2.500.000</Text>
                        </View>
                        
                    </Box>
                    
                </ScrollView>
                <View 
                zIndex={999} 
                justifyContent={'space-between'} 
                flexDirection={'row'} 
                paddingY={1} 
                paddingX={21} 
                bottom={0} 
                position={'absolute'} 
                backgroundColor={'#FFFFE7'} 
                height={76} 
                width={'100%'}
                >
                    <View>
                        <Text fontSize="2xl" color="#3B454D">Payment</Text>
                        <Text fontSize={18}>IDR {Harga}</Text>
                    </View>
                    <TouchableOpacity>
                        <Box 
                        top={2.5} 
                        borderRadius={10} 
                        justifyContent={'center'} 
                        width={120}
                        height={45} 
                        backgroundColor={'#D19E00'}>
                            <Text color={'white'} fontSize={'16'} textAlign={'center'}>Checkout</Text>
                        </Box>
                    </TouchableOpacity>
                </View>
            </View>
            
        </NativeBaseProvider>
    )
}

const styles = {
    radioButtonContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 10,
    },
    selectedRadioButton: {
      backgroundColor: '#FFFD86', // Ganti warna latar belakang saat dipilih
    },
    unselectedRadioButton: {
      backgroundColor: '#FEFFC1', // Ganti warna latar belakang saat tidak dipilih
    },
  };

export default Checkout;