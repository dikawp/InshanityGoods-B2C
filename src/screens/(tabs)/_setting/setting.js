import {
  Box,
  HStack,
  Heading,
  Image,
  VStack,
  Text,
  Divider,
  Icon,
  Pressable,
  Center,
} from "native-base";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { getAuth, signOut } from "@firebase/auth";
import { doc } from "firebase/firestore";
import { FIRESTORE } from "../../../firebase/credential";
import { onSnapshot } from "firebase/firestore";
import React, { useState, useEffect } from "react";

const Setting = () => {
  const session = getAuth();
  const user = session.currentUser;
  const [displayName, setDisplayName] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const userRef = doc(FIRESTORE, "users", user.uid);

    const fetchData = onSnapshot(userRef, (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        console.log("Document Data (onSnapshot):", data);
        setDisplayName(data);
      } else {
        console.log("Document does not exist!");
      }
    });
    return () => fetchData();
  }, [user.email]);

  const Logout = () => {
    signOut(session)
      .then(() => {
        navigation.navigate("Login");
      })
      .catch((error) => {
        alert(error);
      });
  };

  console.log(user.uid);

  return (
    <>
      <Box flex={1}>
        <Box bg={"muted.500"} h={"25%"} w={"100%"}></Box>
        <Box alignSelf={"center"}>
          <Image
            source={require("../../../images/brody.png")}
            w={"120px"}
            h={"120px"}
            mt={"-10"}
            alt="bg Logo"
            borderWidth={1}
            borderRadius={100}
            borderColor={"black"}
            alignSelf={"center"}
          />
          <Center py={3}>
            <Heading>{displayName.username}</Heading>
          </Center>
        </Box>
        <Box py={4}>
          <VStack p={6}>
            <Box py={5}>
              <Pressable onPress={() => navigation.navigate("Edit Profile")}>
                <HStack>
                  <Icon
                    as={<Ionicons name={"person-circle-outline"} />}
                    size={8}
                    color={"black"}
                  />
                  <Text bold pt={1} pl={4}>
                    Account Settings
                  </Text>
                </HStack>
              </Pressable>
            </Box>
            <Divider />
            <Box py={5}>
              <Pressable onPress={() => navigation.navigate("Address")}>
                <HStack>
                  <Icon
                    as={<Ionicons name={"location-outline"} />}
                    size={8}
                    color={"black"}
                  />
                  <Text bold pt={1} pl={4}>
                    Addresses
                  </Text>
                </HStack>
              </Pressable>
            </Box>
            <Divider />
            <Box py={5}>
              <Pressable onPress={() => navigation.navigate("History")}>
                <HStack>
                  <Icon
                    as={<Ionicons name={"receipt-outline"} />}
                    size={8}
                    color={"black"}
                  />
                  <Text bold pt={1} pl={4}>
                    History
                  </Text>
                </HStack>
              </Pressable>
            </Box>
            <Divider />
            <Box py={5}>
              <Pressable onPress={() => Logout()}>
                <HStack>
                  <Icon
                    as={<Ionicons name={"log-out-outline"} />}
                    size={8}
                    color={"black"}
                  />
                  <Text bold pt={1} pl={4}>
                    Logout
                  </Text>
                </HStack>
              </Pressable>
            </Box>
          </VStack>
        </Box>
      </Box>
    </>
  );
};

export default Setting;
