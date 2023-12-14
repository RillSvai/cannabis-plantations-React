import axios from "axios";

const getOrderDetails = async (orderId: number) => {
  try {
    const response = await axios.get(
      `http://localhost:5111/api/Order/${orderId}/order-details?api-version=1.0`,
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
export default getOrderDetails;
