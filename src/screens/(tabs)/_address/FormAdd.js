import { useEffect, useState } from "react";
import {
  Box,
  Button,
  HStack,
  Text,
  Input,
  VStack,
  Icon,
  TextArea,
} from "native-base";
import Ionicons from "@expo/vector-icons/Ionicons";
import { FIRESTORE } from "../../../firebase/credential";
import { getDoc, doc, setDoc } from "firebase/firestore";
import { getAuth } from "@firebase/auth";
import { useNavigation } from "@react-navigation/native";

const FormAdd = () => {
  const session = getAuth();
  const user = session.currentUser;
  const navigation = useNavigation();
  const [title, setTitle] = useState("");
  const [fullAddress, setFullAddress] = useState("");

  const addAddress = async () => {
    try {
      const addressRef = doc(FIRESTORE, "addresses", user.uid);
  
      // Mendapatkan data yang sudah ada (jika ada)
      const addressDoc = await getDoc(addressRef);
      const existingAddresses = addressDoc.exists() ? addressDoc.data() : {};
  
      // Menambahkan alamat baru dengan nama field dinamis (address1, address2, dll.)
      existingAddresses[`address${Object.keys(existingAddresses).length + 1}`] = {
        title: title,
        fullAddress: fullAddress,
        selected: false,
      };
  
      // Menyimpan data yang diperbarui ke Firestore
      await setDoc(addressRef, existingAddresses);
  
      console.log("Address added successfully");
      setTitle("");
      setFullAddress("");
      navigation.navigate('Address');

    } catch (error) {
      console.error("Error adding address:", error);
    }
  };
  

  return (
    <>
      <Box flex={1}>
        <VStack p={4}>
          <HStack>
            <Icon
              as={<Ionicons name={"alert-outline"} />}
              size={8}
              color={"black"}
            ></Icon>
            <Text pt={1}> Shipping Adress</Text>
          </HStack>
          <Input
            mt={3}
            placeholder="Address Title"
            value={title}
            onChangeText={(text) => setTitle(text)}
          ></Input>
          <TextArea
            mt={3}
            h={150}
            placeholder="Full Addresses"
            value={fullAddress}
            onChangeText={(text) => setFullAddress(text)}
          ></TextArea>
          <Button mt={14} onPress={addAddress}>
            Add new Address
          </Button>
        </VStack>
      </Box>
    </>
  );
};

export default FormAdd;
