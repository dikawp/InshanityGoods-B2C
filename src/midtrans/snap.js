import axios from "axios";
import { API_TIMEOUT, HEADER_MIDTRANS } from "../midtrans/config.js";
import { WebView } from "react-native-webview";
import { View, Spinner } from "native-base";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { FIRESTORE } from "../firebase/credential";
import {
  doc,
  query,
  collection,
  arrayUnion,
  setDoc,
  where,
  getDocs,
  updateDoc
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

const DisplaySnap = ({ route }) => {
  const { url, data } = route.params;
  const order_id = data.transaction_details.order_id;
  const navigation = useNavigation();
  const user = getAuth().currentUser;
  const historyRef = collection(FIRESTORE, "history");
  const productRef = collection(FIRESTORE, "products");

  const q = query(productRef, where("name", "==", data.item_details.name));

  const fetchData = async () => {
    try {
      const response = await axios({
        method: "GET",
        url: `https://api.sandbox.midtrans.com/v2/${order_id}/status`,
        headers: HEADER_MIDTRANS,
        timeout: API_TIMEOUT,
      });

      console.log(response.data);
      console.log(url);

      const status = response.data.transaction_status;

      if (status === "pending") {
        console.log("Pembayaran menunggu konfirmasi");
      } else if (status === "settlement") {
        console.log("Pembayaran berhasil");

        // Simpan data pembelian ke koleksi 'history'
        await setDoc(
          doc(historyRef, user.email),
          {
            paid: arrayUnion({
              order_id: order_id,
              name: data.item_details.name,
              price: data.item_details.price,
              quantity: data.item_details.quantity,
              status: status,
            }),
          },
          { merge: true }
        );

        // Kurangi nilai stock di koleksi 'products'
        const productQuerySnapshot = await getDocs(q);
        productQuerySnapshot.forEach(async (productDoc) => {
          const currentStock = productDoc.data().stock;
          const updatedStock = currentStock - data.item_details.quantity;

          await updateDoc(productDoc.ref, { stock: updatedStock });
          console.log(
            `Stock updated for ${productDoc.data().name}: ${updatedStock}`
          );
        });

        navigation.navigate("Tabs");
      } else {
        console.log("Status pembayaran tidak dikenali");
      }
    } catch (error) {
      console.error("Error fetching order status:", error);
    }
  };

  useEffect(() => {
    if (url) {
      fetchData();

      const intervalId = setInterval(() => {
        fetchData();
      }, 10000);

      // Membersihkan interval saat komponen tidak lagi terrender
      return () => clearInterval(intervalId);
    } else {
      console.error("No URL provided");
    }
  }, [url]);

  console.log(order_id);

  return (
    <>
      {url ? (
        <WebView source={{ uri: url }} />
      ) : (
        <View>
          <Spinner size={"lg"} />
        </View>
      )}
    </>
  );
};

export default DisplaySnap;
