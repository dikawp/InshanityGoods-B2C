import { useEffect, useState } from "react";
import {
  HStack,
  ScrollView,
  Image,
  Heading,
  Center,
} from "native-base";
import { TouchableOpacity } from "react-native";
import ProductItem from "../../components/item/product-Item";
import { getDocs, collection } from "firebase/firestore";
import { FIRESTORE } from "../../firebase/credential";

const Discount = () => {
  const [Products, setProducts] = useState([]);
  const productsCollectionRef = collection(FIRESTORE, "products");

  useEffect(() => {
    const getListProducts = async () => {
      try {
        const data = await getDocs(productsCollectionRef);
        const productList = data.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          price: doc.data().price * 0.6,
        })).slice(0,7);
        setProducts(productList);
      } catch (err) {
        console.error(err);
      }
    };
    getListProducts();
  }, []);

  console.log(Products);

  return (
    <ScrollView mx={14} showsVerticalScrollIndicator={false}>
      <Center mt={5}>
        <Heading>Discount Items</Heading>
      </Center>
      <TouchableOpacity>
        <Image
          height={150}
          width="100%"
          mt={30}
          source={require("../../images/promo_poster.png")}
          alt="diskon"
        />
      </TouchableOpacity>

      <HStack mt={5} flexWrap={"wrap"} justifyContent={"space-between"}>
        {Products.map((product) => {
          return <ProductItem item={product} key={product.id} />;
        })}
      </HStack>
    </ScrollView>
  );
};
export default Discount;
