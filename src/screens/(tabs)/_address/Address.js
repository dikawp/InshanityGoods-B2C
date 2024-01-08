import React, { useState, useEffect } from "react";
import {
  ScrollView,
  Box,
  View,
  Text,
  Radio,
  VStack,
  Modal,
  Button,
  Input,
  TextArea,
  useToast,
} from "native-base";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  getDoc,
  doc,
  updateDoc,
  deleteField,
  onSnapshot,
} from "firebase/firestore";
import { getAuth } from "@firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { FIRESTORE } from "../../../firebase/credential";

const Address = () => {
  const navigation = useNavigation();
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [editAddressData, setEditAddressData] = useState({});
  const toast = useToast();

  const user = getAuth().currentUser;

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const userAddressesRef = doc(FIRESTORE, "addresses", user.uid);

        // SNAPSHOT BIAR FUNCTION RENDER ULANG JIKA ADA PERUBAHAN DATA
        const Rerender = onSnapshot(userAddressesRef, (doc) => {
          if (doc.exists()) {
            const data = doc.data();
            console.log("Document Data (onSnapshot):", data);
            // Convert object to array
            const addressesData = Object.keys(data).map((key) => ({
              id: key,
              ...data[key],
            }));
            setAddresses(addressesData);

            // Cari alamat yang terpilih
            const selectedAddress = addressesData.find(
              (address) => address.selected
            );

            if (selectedAddress) {
              setSelectedAddress(selectedAddress.id);
            }
          } else {
            console.log("Document does not exist!");
          }
        });

        return () => Rerender();
      } catch (error) {
        console.error("Error fetching addresses:", error);
      }
    };

    fetchAddresses();
  }, []);

  const handleRadioClick = async (addressId) => {
    try {
      // Update selected status in Firestore
      await updateDoc(doc(FIRESTORE, "addresses", user.uid), {
        [`${addressId}.selected`]: true,
      });

      // Update selected status locally
      const updatedAddresses = addresses.map((address) => ({
        ...address,
        selected: address.id === addressId,
      }));
      setAddresses(updatedAddresses);

      setSelectedAddress(addressId);
    } catch (error) {
      console.error("Error updating selected address:", error);
    }
  };

  const openEditModal = (addressId) => {
    const addressToEdit = addresses.find((address) => address.id === addressId);
    setEditAddressData(addressToEdit);
    setEditModalOpen(true);
  };

  const handleEditSave = async () => {
    try {
      // Lakukan penyimpanan data edit ke Firebase atau penyimpanan data Anda
      const { id, title, fullAddress } = editAddressData;
      await updateDoc(doc(FIRESTORE, "addresses", user.uid), {
        [`${id}.title`]: title,
        [`${id}.fullAddress`]: fullAddress,
      });

      // Tutup modal dan reset state editAddressData
      setEditModalOpen(false);
      setEditAddressData({});

      toast.show({
        title: "Address updated successfully",
        status: "success",
      });
    } catch (error) {
      console.error("Error saving edited address:", error);
      toast.show({
        title: "Error updating address",
        status: "error",
      });
    }
  };

  const handleDeleteClick = async (addressId) => {
    try {
      // Delete the address in Firestore
      await updateDoc(doc(FIRESTORE, "addresses", user.uid), {
        [addressId]: deleteField(),
      });

      // Remove the deleted address from the local state
      const updatedAddresses = addresses.filter(
        (address) => address.id !== addressId
      );
      setAddresses(updatedAddresses);

      // If the deleted address was selected, clear the selected address
      if (selectedAddress === addressId) {
        setSelectedAddress("");
      }

      toast.show({
        title: "Address deleted successfully",
        status: "success",
      });
    } catch (error) {
      console.error("Error deleting address:", error);
      toast.show({
        title: "Error deleting address",
        status: "error",
      });
    }
  };

  const handleSaveClick = async () => {
    try {
      const batch = [];

      // Set selected status in Firestore
      batch.push(
        updateDoc(doc(FIRESTORE, "addresses", user.uid), {
          [`${selectedAddress}.selected`]: true,
        })
      );

      // Set non-selected addresses to false in Firestore
      addresses.forEach((address) => {
        const { id, selected } = address;
        if (id !== selectedAddress && selected) {
          batch.push(
            updateDoc(doc(FIRESTORE, "addresses", user.uid), {
              [`${id}.selected`]: false,
            })
          );
        }
      });

      // Execute the batch update
      await Promise.all(batch);

      // Update selected status locally
      const updatedAddresses = addresses.map((address) => ({
        ...address,
        selected: address.id === selectedAddress,
      }));
      setAddresses(updatedAddresses);

      toast.show({
        title: "Address saved successfully",
        status: "success",
      });
    } catch (error) {
      console.error("Error updating selected address:", error);
      toast.show({
        title: "Error saving address",
        status: "error",
      });
    }
  };

  console.log(addresses);

  return (
    <Box padding={21} height={"100%"} width={"100%"}>
      <ScrollView>
        <Text color={"#89580A"} fontSize={14}>
          Choose Addresses
        </Text>
        <VStack alignItems={"center"}>
          <Radio.Group
            name="addressRadio"
            value={selectedAddress}
            onChange={(value) => setSelectedAddress(value)}
          >
            {addresses.map((address) => (
              <Radio
                shadow={2}
                value={address.id}
                key={address.id}
                onChange={() => handleRadioClick(address.id)}
              >
                <Box
                  padding={3}
                  justifyContent={"space-between"}
                  my={3}
                  borderRadius={10}
                  alignSelf={"center"}
                  height={105}
                  width={310}
                  backgroundColor={address.selected ? "#FFE60D" : "#FEFFC1"}
                  flexDirection={"row"}
                >
                  <Box marginRight={3} width={"75%"}>
                    <Text color={"#89580A"} fontSize={16} mb={1}>
                      {address.title}
                    </Text>
                    <Text color={"#89580A"} fontSize={12}>
                      {address.fullAddress}
                    </Text>
                  </Box>
                  <Box flexDirection={"row"}>
                    <TouchableOpacity>
                      <Ionicons
                        name="create-outline"
                        marginRight={10}
                        size={28}
                        onPress={() => openEditModal(address.id)}
                      ></Ionicons>
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <Ionicons
                        name="trash-outline"
                        size={28}
                        onPress={() => handleDeleteClick(address.id)}
                      ></Ionicons>
                    </TouchableOpacity>
                  </Box>
                </Box>
              </Radio>
            ))}
          </Radio.Group>
        </VStack>
      </ScrollView>

      <View
        justifyContent={"space-between"}
        marginY={2}
        width={"100%"}
        position={"absolute"}
        paddingY={2}
        height={130}
        flexDirection={"column"}
        bottom={0}
        alignSelf={"center"}
        alignItems={"center"}
      >
        <TouchableOpacity onPress={() => navigation.navigate("Form Address")}>
          <Box
            justifyContent={"center"}
            alignItems={"center"}
            backgroundColor={"#FEFFC1"}
            width={344}
            height={50}
            borderRadius={4}
            borderColor={"#FFE60D"}
            borderWidth={3}
          >
            Add New Address
          </Box>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSaveClick}>
          <Box
            justifyContent={"center"}
            alignItems={"center"}
            backgroundColor={"#FFE60D"}
            width={344}
            height={50}
            borderRadius={4}
          >
            Save
          </Box>
        </TouchableOpacity>
      </View>

      {/* Modal Edit Address */}
      <Modal isOpen={isEditModalOpen} onClose={() => setEditModalOpen(false)}>
        <Modal.Content>
          <Modal.Header>Edit Address</Modal.Header>
          <Modal.Body>
            <Input
              mt={3}
              placeholder="Address Title"
              value={editAddressData.title}
              onChangeText={(text) =>
                setEditAddressData({ ...editAddressData, title: text })
              }
            ></Input>
            <TextArea
              mt={3}
              h={150}
              placeholder="Full Addresses"
              value={editAddressData.fullAddress}
              onChangeText={(text) =>
                setEditAddressData({ ...editAddressData, fullAddress: text })
              }
            ></TextArea>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button onPress={() => setEditModalOpen(false)}>Cancel</Button>
              <Button onPress={handleEditSave}>Save</Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </Box>
  );
};

export default Address;
