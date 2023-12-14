import { useRoleContext } from "@/RoleContext.tsx";
import { useEffect, useState } from "react";
import getHarvests from "@/services/harvestService.ts";
import { UserRound } from "lucide-react";

interface IHarvest {
  agronomistId: number;
  cannabisTypeId: number;
  date: string;
  id: number;
  quantity: number;
}
const Harvests = () => {
  const [harvest, setHarvest] = useState<IHarvest[] | null>(null);
  const { agronomistId } = useRoleContext();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getHarvests(agronomistId);
        setHarvest(data);
      } catch (e) {
        console.error("Error fetching data ", e);
      }
    };

    fetchData();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };
  return (
    <div className="flex flex-col items-center justify-evenly py-30 h-full shadow-2xl bg-gradient-to-r from-blue-500 to-blue-600">
      {agronomistId !== null ? (
        <>
          <div className="flex flex-col items-center justify-center">
            <UserRound
              className="mb-10 bg-white text-blue-500 rounded-full mt-5"
              size={128}
            />
            <h1 className="font-black text-5xl mb-7">Harvests page</h1>
          </div>
          <table className={"bg-blue-500 p-4 rounded-2xl"}>
            <thead>
              <tr>
                <th className="px-5 py-4">Date</th>
                <th className="px-5 py-4">CannabisTypeId</th>
                <th className="px-5 py-4">Quantity</th>
                <th className="px-5 py-4">Agronomist Id</th>
                <th className="px-5 py-4">Current Id</th>
              </tr>
            </thead>
            {harvest &&
              harvest.map((item) => (
                <tbody className={"px-4"} key={crypto.randomUUID()}>
                  <tr>
                    <td className="px-10 py-5 border text-center">
                      {formatDate(item.date)}
                    </td>
                    <td className="px-10 py-5 border text-center">
                      {item.cannabisTypeId}
                    </td>
                    <td className="px-10 py-5 border text-center">
                      {item.quantity}
                    </td>
                    <td className="px-10 py-5 border text-center">
                      {item.agronomistId}
                    </td>
                    <td className="px-10 py-5 border text-center">{item.id}</td>
                  </tr>
                </tbody>
              ))}
          </table>{" "}
        </>
      ) : (
        <div className={"flex items-center justify-center"}>
          Please first choose the role.
        </div>
      )}
    </div>
  );
};

export default Harvests;
