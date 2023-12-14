import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { UserRound } from "lucide-react";
import { useRoleContext } from "@/RoleContext.tsx";
import { useEffect, useState } from "react";
import getFeedback, { sendFeedback } from "@/services/feedbackService.ts";

interface IFeedback {
  id: number;
  customerId: number;
  text: string;
  date: string;
}
const Feedback = () => {
  const { customerId } = useRoleContext();
  const [feedbacks, setFeedbacks] = useState<IFeedback[] | null>(null);
  const [inputValue, setInputValue] = useState<string>("");
  useEffect(() => {
    const fetchData = async (id: number | null) => {
      try {
        const data = await getFeedback(id);
        setFeedbacks(data);
      } catch (e) {
        console.error(e);
      }
    };

    fetchData(customerId);
  }, [inputValue]);

  const saveFeedback = () => {
    sendFeedback(customerId, inputValue);
    setInputValue("");
  };

  return (
    <div className={"flex  items-center justify-around h-screen"}>
      {customerId !== null ? (
        <>
          <div className={"flex flex-col"}>
            <h1 className={"font-black text-4xl"}> Previous feedback list</h1>
            {feedbacks &&
              feedbacks.map((item) => (
                <div className={" bg-blue-500 rounded-2xl my-2 p-5 "}>
                  {" "}
                  {item.text}{" "}
                </div>
              ))}
          </div>

          <div className={"flex flex-col items-center"}>
            <UserRound
              className="mb-10 bg-slate-900 text-blue-500 rounded-full mt-5"
              size={128}
            />
            <h1 className="font-black text-5xl mb-7">Leave a feedback</h1>

            <div className={"w-full  flex flex-col "}>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  saveFeedback();
                }}
              >
                <Input
                  className={"text-black"}
                  value={inputValue}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setInputValue(e.target.value);
                  }}
                />
                <Button
                  className={
                    "my-3 w-full hover:bg-blue-500 transition duration-200"
                  }
                  disabled={inputValue === ""}
                >
                  Submit
                </Button>
              </form>
            </div>
          </div>
        </>
      ) : (
        <div className={"flex items-center justify-center"}>
          Please first choose the role
        </div>
      )}
    </div>
  );
};
export default Feedback;
