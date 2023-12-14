import axios from "axios";

const getFeedback = async (customerId: number | null) => {
  try {
    const response = await axios.get(
      `http://localhost:5111/api/Customer/${customerId}/feedbacks?api-version=1.0`,
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
export default getFeedback;

export const sendFeedback = async (
  customerId: number | null,
  feedbackText: string | null,
) => {
  try {
    const apiUrl = `http://localhost:5111/api/Feedback?customerId=${customerId}&api-version=1.0`;
    const currentDate = new Date();
    const isoDateString = currentDate.toISOString();
    const requestData = {
      text: feedbackText,
      date: isoDateString,
    };

    const response = await axios.post(apiUrl, requestData, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error sending feedback:", error);
    // Handle the error or throw it to be caught elsewhere
    throw error;
  }
};
