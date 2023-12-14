import axios from "axios";

const getProduct = async (productId: number) => {
  try {
    const response = await axios.get(
      `http://localhost:5111/api/Product/${productId}?api-version=1.0`,
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
export default getProduct;
