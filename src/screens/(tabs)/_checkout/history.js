import React, { useState, useEffect } from "react";
import { Center, ScrollView, Text } from "native-base";
import { Box } from "native-base";
import { doc, onSnapshot } from "firebase/firestore";
import { FIRESTORE } from "../../../firebase/credential";
import { getAuth } from "firebase/auth";

const History = () => {
  const user = getAuth().currentUser;
  const [history, setHistory] = useState([]);

  // Ambil data transaksi Rill-time
  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(FIRESTORE, "history", user.email),
      (doc) => {
        const data = doc.data();
        console.log("Current data: ", data);

        if (data){
          setHistory(data.paid);
        } 
        else {
          console.log('Gaada data');
        }
      }
    );

    return () => unsubscribe();
  }, [user.email]);

  console.log(history);

  return (
    <ScrollView mx={14} mt={2} pb={5}>
      {history ? (
        history.map((item, index) => (
          <Box key={index} borderBottomWidth={1} p={2}>
            <Text fontSize="lg">{item.name}</Text>
            <Text>Order ID: {item.order_id}</Text>
            <Text>Price: {item.price}</Text>
            <Text>Quantity: {item.quantity}</Text>
            <Text>Status: {item.status}</Text>
          </Box>
        ))
      ) : (
        <Center>
          <Text>No data</Text>
        </Center>
      )}
    </ScrollView>
  );
};

export default History;
