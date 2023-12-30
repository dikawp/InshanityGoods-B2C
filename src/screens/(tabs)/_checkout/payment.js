import axios  from "axios";
import {
  API_TIMEOUT,
  URL_MIDTRANS,
  HEADER_MIDTRANS,
} from "../../../midtrans/config";

export const snapTransactions = async (data) => {
    try {
      const response = await axios({
        method: "POST",
        url: URL_MIDTRANS + "transactions",
        headers: HEADER_MIDTRANS,
        data: data,
        timeout: API_TIMEOUT, 
      });
      return response.data;
    } catch (error) {
      console.error("Error in snapTransactions:", error);
      throw error; 
    }
  };
  
