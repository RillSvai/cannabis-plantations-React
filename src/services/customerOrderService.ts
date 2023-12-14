import axios from "axios";

const getCustomerOrders = async (customerId: number | null) => {
  try {
    const response = await axios.get(
      `http://localhost:5111/api/Customer/${customerId}/orders/`,
    );
    return response.data;
  } catch (e) {
    console.error("Error fetching data:", e);
  }
};
export default getCustomerOrders;
