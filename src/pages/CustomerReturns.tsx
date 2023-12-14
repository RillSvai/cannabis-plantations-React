import { useRoleContext } from "@/RoleContext.tsx";
import { useEffect, useState } from "react";
import { UserRound } from "lucide-react";
import { getCustomerReturns } from "@/services/returnsService.ts";

interface IReturns {
  id: number;
  customerId: number;
  agronomistId: number;
  date: string;
}
const CustomerReturns = () => {
  const [returns, setReturns] = useState<IReturns[] | null>(null);
  const { customerId } = useRoleContext();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCustomerReturns(customerId);

        setReturns(data);
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
      {customerId !== null ? (
        <>
          <div className="flex flex-col items-center justify-center">
            <UserRound
              className="mb-10 bg-white text-blue-500 rounded-full mt-5"
              size={128}
            />
            <h1 className="font-black text-5xl mb-7">Customer Returns</h1>
          </div>
          <table className={"bg-blue-500 p-4 rounded-2xl"}>
            <thead>
              <tr>
                <th className="px-5 py-4">Date</th>
                <th className="px-5 py-4">Id</th>
                <th className="px-5 py-4">Agronomist Id</th>
                <th className="px-5 py-4">Customer Id</th>
              </tr>
            </thead>
            {returns && returns?.length > 0 ? (
              returns.map((item) => (
                <tbody className={"px-4"} key={crypto.randomUUID()}>
                  <tr>
                    <td className="px-10 py-5 border text-center">
                      {formatDate(item.date)}
                    </td>
                    <td className="px-10 py-5 border text-center">{item.id}</td>
                    <td className="px-10 py-5 border text-center">
                      {item.agronomistId}
                    </td>
                    <td className="px-10 py-5 border text-center">
                      {item.customerId}
                    </td>
                  </tr>
                </tbody>
              ))
            ) : (
              <div className={"text-red text-center"}>There is no returns </div>
            )}
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

export default CustomerReturns;
