import axios from "axios";
export const getCustomerReturns = async (customerId: number | null) => {
  try {
    const response = await axios.get(
      `http://localhost:5111/api/Customer/${customerId}/returns?api-version=1.0`,
    );

    return response.data;
  } catch (e) {
    console.log(e);
  }
};
