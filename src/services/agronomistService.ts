import axios from "axios";

const getAgronomists = async () => {
  try {
    const response = await axios.get(
      "http://localhost:5111/api/Agronomist?api-version=1.0",
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
export default getAgronomists;
