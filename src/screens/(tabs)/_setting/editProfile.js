import React, { useState, useEffect } from "react";
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
import { doc, updateDoc, onSnapshot } from "firebase/firestore";
import { MaterialIcons } from "@expo/vector-icons";
import { FIRESTORE } from "../../../firebase/credential";
import { onAuthStateChanged } from "firebase/auth";
// import ImagePicker from 'react-native-image-picker';
// import {ImagePicker, launchImageLibrary} from 'react-native-image-picker';
import * as ImagePicker from 'expo-image-picker';

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
  const [dataUser, setDataUser] = useState([]);
  const db = FIRESTORE;
  const userRef = doc(db, "users", user.uid);

  useEffect(() => {
    const userRef = doc(FIRESTORE, "users", user.uid);

    const fetchData = onSnapshot(userRef, (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        console.log("Document Data (onSnapshot):", data);
        setDataUser(data);
        setNewUsername(data.username);
        setNewPhone(data.phoneNumber);
      } else {
        console.log("Document does not exist!");
      }
    });
    return () => fetchData();
  }, [user.email]);

  const updateProfileData = async (image) => {
    try {
      await updateProfile(session.currentUser, { displayName: newUsername });

      // configuration for photoURL
      await updateDoc(userRef, {
        username: newUsername,
        phoneNumber: newPhone,
        photoUrl: image,
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

  // Upload Image
  const [imageSource, setImageSource] = useState(null);
  const [image, setImage] = useState(null);

  // const handleImagePicker = () => {
  //   launchImageLibrary({ title: 'Select Image' }, (response) => {
  //     if (response.didCancel) {
  //       console.log('User cancelled image picker');
  //     } else if (response.error) {
  //       console.log('ImagePicker Error: ', response.error);
  //     } else {
        
  //       setImageSource({ uri: response.uri });
  //     }
  //   });
  // };

  const handlePickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  console.log(`berikut adalah photoURL dari user: ${dataUser.photoUrl}`);

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
            <Button flex="1" onPress={() => updateProfileData()}>
              Confirm
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>

      <Box flex={1}>
        <Box bg={"muted.500"} h={"20%"} w={"100%"}></Box>
        <Box alignSelf={"center"}>
          <Image
            source={dataUser.photoUrl}
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
              placeholder={"Phone Number"}
              onChangeText={(text) => setNewPhone(text)}
              type="file"
              value={newPhone}
            />
            <Text mt={3} mb={2} bold>
              Password
            </Text>
            <Input
              type={show ? "text" : "password"}
              onChangeText={(text) => setNewPassword(text)}
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
            <Text mt={3} mb={2} bold>
              Upload Profile
            </Text>
            {/* {imageSource && (
              <Image source={imageSource} style={{ width: 200, height: 200 }} />
            )} */}
            {/* <Button title="Select Image" onPress={handleImagePicker} /> */}
            <Box style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <Button title="Pick an image from camera roll" onPress={handlePickImage} />
              {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
            </Box>
            <Button mt={6} onPress={() => {
              setModalVisible(true)
              updateProfileData(image)
            }}>
              UPDATE
            </Button>
          </VStack>
        </Box>
      </Box>
    </>
  );
};

export default Editprofile;
