// BusinessTrip.tsx
import { useEffect, useState } from "react";
import { HeartCrack, StepForward, UserRound } from "lucide-react";
import getBusinessTrip from "@/services/businessTrip.ts";
import { useRoleContext } from "@/RoleContext.tsx";

interface IBusinessTrip {
  id: number;
  startDate: string;
  endDate: string;
}
const BusinessTrip = () => {
  const [businessTrip, setBusinessTrip] = useState<IBusinessTrip[] | undefined>(
    [],
  );
  const { agronomistId } = useRoleContext();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getBusinessTrip(agronomistId);
      setBusinessTrip(data);
    };

    fetchData();
  }, [agronomistId, getBusinessTrip]);

  console.log(businessTrip);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const isCurrentTimeInRange = (startDate: string, endDate: string) => {
    const currentTime = new Date();
    return (
      currentTime >= new Date(startDate) && currentTime <= new Date(endDate)
    );
  };

  const currentTrip = businessTrip?.find((trip) =>
    isCurrentTimeInRange(trip.startDate, trip.endDate),
  );

  const otherTrips = businessTrip?.filter(
    (trip) => !isCurrentTimeInRange(trip.startDate, trip.endDate),
  );

  return (
    <div className="flex flex-col items-center justify-evenly py-30 h-full shadow-2xl bg-gradient-to-r from-blue-500 to-blue-600">
      {agronomistId !== null ? (
        <>
          <div className="flex flex-col items-center justify-center">
            <UserRound
              className="mb-10 bg-white text-blue-500 rounded-full mt-5"
              size={128}
            />
            <h1 className="font-black text-5xl mb-7">Business trips list</h1>
          </div>
          <div className={"flex justify-center  items-start w-full"}>
            {currentTrip ? (
              <div className="bg-blue-500 rounded-2xl p-4 shadow-lg mb-4 mx-3">
                <div className={"flex items-center mb-2 "}>
                  <h2 className="text-xl font-black text-green-400 mr-2">
                    Current Trip
                  </h2>
                  <StepForward className={"text-green-400 "} />
                </div>

                <table>
                  <thead>
                    <tr>
                      <th className="px-5 py-4">Start date</th>
                      <th className="px-5 py-4">End date</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="px-10 py-5 border-2 border-green-400">
                        {formatDate(currentTrip.startDate)}
                      </td>
                      <td className="px-10 py-5 border-2 border-green-400">
                        {formatDate(currentTrip.endDate)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ) : (
              <>
                <div className="bg-blue-500 rounded-2xl p-4 shadow-lg mb-4 w-[316px] mx-3">
                  <h2 className=" text-xl  font-bold mb-2">Current Trip</h2>
                  <div className={"flex items-center "}>
                    <HeartCrack className={"text-red-400 mr-2"} />
                    <p> There is no current trips.</p>
                  </div>
                </div>
              </>
            )}
            <div className="bg-blue-500 rounded-2xl p-4 shadow-lg mb-4">
              <h2 className="text-xl font-bold mb-2">Trip list</h2>
              <table>
                <thead>
                  <tr>
                    <th className="px-5 py-4">Start date</th>
                    <th className="px-5 py-4">End date</th>
                  </tr>
                </thead>
                <tbody>
                  {otherTrips?.map((trip: IBusinessTrip) => (
                    <tr key={trip.id}>
                      <td className="px-10 py-5 border ">
                        {formatDate(trip.startDate)}
                      </td>
                      <td className="px-10 py-5 border ">
                        {formatDate(trip.endDate)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        <div className={"flex items-center justify-center"}>
          Please first choose the role{" "}
        </div>
      )}
    </div>
  );
};

export default BusinessTrip;
