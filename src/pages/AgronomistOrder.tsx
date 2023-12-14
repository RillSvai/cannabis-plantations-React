import { useRoleContext } from "@/RoleContext.tsx";
import { useEffect, useState } from "react";
import getAgronomistOrders from "@/services/agronomistOrderService.ts";
import getOrderDetails from "@/services/orderDetailService.ts";
import { UserRound } from "lucide-react";

interface IOrders {
  agronomistId: number;
  customerId: number;
  date: string;
  id: number;
}
interface IOrderDetails {
  id: number;
  orderId: number;
  productId: number;
  quantity: number;
}
const AgronomistOrder = () => {
  const [orders, setOrders] = useState<IOrders[] | null>(null);
  const [orderDetails, setOrderDetails] = useState<IOrderDetails[] | null>();
  const { agronomistId } = useRoleContext();

  useEffect(() => {
    const fetchData = async (id: number | null) => {
      try {
        const data = await getAgronomistOrders(id);

        setOrders(data);
      } catch (e) {
        console.error(e);
      }
    };

    fetchData(agronomistId);
  }, []);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        if (orders) {
          const detailsPromises = orders.map((order) =>
            getOrderDetails(order.id),
          );
          const details = await Promise.all(detailsPromises);
          const flatDetails = details.flat();
          setOrderDetails(flatDetails);
        }
      } catch (e) {
        console.error(e);
      }
    };

    fetchOrderDetails();
  }, [orders]);

  console.log("orders", orders);
  console.log("order Details: ", orderDetails);
  return (
    <div className="flex items-center justify-evenly py-30 h-full shadow-2xl bg-gradient-to-r from-blue-500 to-blue-600">
      {agronomistId !== null ? (
        <>
          <div className="flex flex-col items-center justify-center">
            <UserRound
              className="mb-10 bg-white text-blue-500 rounded-full mt-5"
              size={128}
            />
            <h1 className="font-black text-5xl mb-7">Orders list</h1>
          </div>
          <table className="border-collapse border bg-blue-500 rounded-2xl p-4 shadow-lg mb-4 mx-3">
            <thead>
              <tr>
                <th className="border p-2">Order ID</th>
                <th className="border p-2">Product ID</th>
                <th className="border p-2">Quantity</th>
              </tr>
            </thead>
            <tbody>
              {orderDetails &&
                orderDetails.map((detail) => (
                  <tr key={detail.id} className="border">
                    <td className="border p-2">{detail.orderId}</td>
                    <td className="border p-2">{detail.productId}</td>
                    <td className="border p-2">{detail.quantity}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </>
      ) : (
        <div className={"flex items-center justify-center"}>
          Please first choose the role{" "}
        </div>
      )}
    </div>
  );
};

export default AgronomistOrder;
