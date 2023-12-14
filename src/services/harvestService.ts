import axios from "axios";

const getHarvests = async (agronomistId: number | null) => {
  try {
    const response = await axios.get(
      `http://localhost:5111/api/Agronomist/${agronomistId}/harvests?api-version=1.0`,
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
export default getHarvests;
