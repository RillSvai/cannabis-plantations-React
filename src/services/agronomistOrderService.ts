import axios from "axios";

const getAgronomistOrders = async (agronomistId: number | null) => {
  try {
    const response = await axios.get(
      `http://localhost:5111/api/Agronomist/${agronomistId}/orders/`,
    );
    return response.data;
  } catch (e) {
    console.error("Error fetching data:", e);
  }
};
export default getAgronomistOrders;

{
}
