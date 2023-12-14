// businessTrip.ts
import axios from "axios";

const getBusinessTrip = async (agronomistId: number | null) => {
  try {
    const response = await axios.get(
      `http://localhost:5111/api/Agronomist/${agronomistId}/business-trips`,
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export default getBusinessTrip;
