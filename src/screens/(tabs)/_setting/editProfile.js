import React, { useState } from "react";
import {
  Box,
  Button,
  Heading,
  Image,
  VStack,
  Text,
  Input,
  Modal,
  FormControl,
  Icon,
  Pressable,
} from "native-base";
import { useNavigation } from "@react-navigation/native";
import {
  getAuth,
  updateProfile,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "@firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { MaterialIcons } from "@expo/vector-icons";
import { FIRESTORE } from "../../../firebase/credential";

const Editprofile = () => {
  const session = getAuth();
  const user = session.currentUser;
  const navigation = useNavigation();
  const [newUsername, setNewUsername] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [modalPassword, setModalPassword] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [show, setShow] = useState(false);
  const db = FIRESTORE;
  const userRef = doc(db, "users", user.uid);

  const updateProfileData = async () => {
    try {
      await updateProfile(user, { displayName: newUsername });
      await updateDoc(userRef, {
        username: newUsername,
        phoneNumber: newPhone,
        photoUrl: "",
      });

      if (newPassword) {
        const credential = EmailAuthProvider.credential(
          user.email,
          modalPassword 
        );

        await reauthenticateWithCredential(user, credential);

        await updatePassword(user, newPassword);
      }

      alert("Profile updated successfully");
      navigation.goBack();
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <>
      <Modal
        isOpen={modalVisible}
        onClose={() => setModalVisible(false)}
        avoidKeyboard
        size="lg"
      >
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>Wibu?</Modal.Header>
          <Modal.Body>
            Enter your old password.
            <FormControl>
              <FormControl.Label>Old Password</FormControl.Label>
              <Input
              secureTextEntry
              value={modalPassword}
              onChangeText={(text) => setModalPassword(text)}
              placeholder="Your Current Password"
            />
            </FormControl>
          </Modal.Body>
          <Modal.Footer>
            <Button
              flex="1"
              onPress={() => updateProfileData()}
              >
              Confirm
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>

      <Box flex={1}>
        <Box bg={"muted.500"} h={"20%"} w={"100%"}></Box>
        <Box alignSelf={"center"}>
          <Image
            source={require("../../../../assets/favicon.png")}
            w={"100px"}
            mt={"-10"}
            h={"100px"}
            alt="bg Logo"
            borderWidth={2}
            borderRadius={50}
            borderColor={"black"}
            alignSelf={"center"}
          />
          <Heading my={5}>{user.displayName}</Heading>
        </Box>
        <Box>
          <VStack p={6}>
            <Text mt={3} mb={2} bold>
              Username
            </Text>
            <Input
              placeholder={user.displayName}
              onChangeText={(text) => setNewUsername(text)}
            />
            <Text mt={3} mb={2} bold>
              Phone Number
            </Text>
            <Input
              placeholder={user.phoneNumber}
              onChangeText={(text) => setNewPhone(text)}
            />
            <Text mt={3} mb={2} bold>
              Password
            </Text>
            <Input
              type={show ? "text" : "password"}
              onChangeText={(text) => setNewPassword(text)}
              secureTextEntry
              InputRightElement={
                <Pressable onPress={() => setShow(!show)}>
                  <Icon
                    as={
                      <MaterialIcons
                        name={show ? "visibility" : "visibility-off"}
                      />
                    }
                    size={5}
                    mr="2"
                    color="muted.400"
                  />
                </Pressable>
              }
              placeholder="New Password"
            />
            <Button mt={6} 
            onPress={() => setModalVisible(true)}>
              UPDATE
            </Button>
          </VStack>
        </Box>
      </Box>
    </>
  );
};

export default Editprofile;
