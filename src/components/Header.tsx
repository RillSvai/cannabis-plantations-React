import { useEffect, useState } from "react";
import { Leaf, UserRound } from "lucide-react";
import { useRoleContext } from "@/RoleContext.tsx";
import { ScrollArea } from "@/components/ui/scroll-area.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import getCustomers from "@/services/customerService.ts";
import getAgronomists from "@/services/agronomistService.ts";
import { Link, useNavigate } from "react-router-dom";
import { clsx } from "clsx";

interface IAgronomists {
  id: number;
  isAvailable: boolean;
  name: string;
}
interface ICustomers {
  id: number;
  name: string;
}
const Header = () => {
  const { role, toggleRole, toggleCustomerId, toggleAgronomistId } =
    useRoleContext();
  const [customers, setCustomers] = useState<ICustomers[] | null>(null);
  const [agronomists, setAgronomists] = useState<IAgronomists[] | null>(null);
  const [isCustomerOpen, setIsCustomerOpen] = useState<boolean>(false);
  const [isAgronomistOpen, setIsAgronomistsOpen] = useState<boolean>(false);
  const [selectedCustomer, setSelectedCustomer] = useState<number | null>(null);
  const [selectedAgronomist, setSelectedAgronomist] = useState<number | null>(
    null,
  );
  const router = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCustomers();
        setCustomers(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAgronomists();
        setAgronomists(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="relative">
      <div
        className={
          "h-14 px-4 top-0 bg-black text-white flex items-center justify-between"
        }
      >
        <div className={"flex justify-center items-center"}>
          <img
            className={"h-9"}
            src={"src/assets/images/finland_icon.png"}
            alt="Finland Icon"
          />

          <div
            onClick={() => {
              setIsCustomerOpen(false);
              setIsAgronomistsOpen(false);
            }}
            className={"flex items-center justify-center"}
          >
            <Link
              className={"ml-3 hover:text-blue-500 transition duration-150"}
              to={"/"}
            >
              Home
            </Link>
            {role === "agronom" ? (
              <>
                <Link
                  className={"ml-3 hover:text-blue-500 transition duration-150"}
                  to={"/harvests"}
                >
                  Harvests
                </Link>
                <Link
                  className={"ml-3 hover:text-blue-500 transition duration-150"}
                  to={"/business-trip"}
                >
                  Business Trips
                </Link>
                <Link
                  className={"ml-3 hover:text-blue-500 transition duration-150"}
                  to={"/agronomistOrder"}
                >
                  Order
                </Link>
                <Link
                  className={"ml-3 hover:text-blue-500 transition duration-150"}
                  to={"/agronomistTastings"}
                >
                  Tastings
                </Link>
              </>
            ) : (
              <></>
            )}
            {role === "customer" ? (
              <>
                <Link
                  className={"ml-3 hover:text-blue-500 transition duration-150"}
                  to={"/feedback"}
                >
                  Feedback
                </Link>
                <Link
                  className={"ml-3 hover:text-blue-500 transition duration-150"}
                  to={"/customerOrder"}
                >
                  Order
                </Link>
                <Link
                  className={"ml-3 hover:text-blue-500 transition duration-150"}
                  to={"/customerReturns"}
                >
                  Returns
                </Link>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className={"flex justify-center items-center "}>
          <div
            onClick={() => {
              toggleRole("customer");
              setIsCustomerOpen((prevState) => !prevState);
              setIsAgronomistsOpen(false);
            }}
            className={
              "bg-blue-900 flex items-center justify-center rounded-md cursor-pointer h-9 w-9 hover:bg-blue-800 transition duration-200 mx-2"
            }
          >
            <UserRound className={"h-7 w-7"} />
          </div>
          <div
            onClick={() => {
              toggleRole("agronom");
              setIsAgronomistsOpen((prevState) => !prevState);
              setIsCustomerOpen(false);
            }}
            className={
              "bg-blue-900 flex items-center justify-center rounded-md cursor-pointer h-9 w-9 hover:bg-blue-800 transition duration-200 mx-2 "
            }
          >
            <Leaf className={"h-6 w-6"} />
          </div>
        </div>
      </div>
      {isCustomerOpen ? (
        <ScrollArea
          className="h-72 w-48 rounded-md  mt-2 absolute bg-blue-950 right-4"
          style={{ position: "absolute" }}
        >
          <div onClick={() => router("/")} className="p-4">
            <h4 className="mb-4 text-sm font-medium leading-none">Customers</h4>

            {customers !== null &&
              customers.map((customer) => {
                const containerClasses = clsx(
                  "text-sm",
                  "cursor-pointer",
                  "pl-2",
                  "rounded-md",
                  "py-1",
                  "hover:bg-blue-900",
                  "transition",
                  {
                    "bg-blue-900": selectedCustomer === customer.id,
                  },
                  "duration-100",
                );
                return (
                  <div
                    onClick={() => {
                      setIsCustomerOpen(false);
                      toggleCustomerId(customer.id);
                      setSelectedCustomer(customer.id);
                    }}
                    key={customer.id}
                  >
                    <div className={containerClasses}>{customer.name}</div>
                    <Separator className="my-2 bg-gray-600 " />
                  </div>
                );
              })}
          </div>
        </ScrollArea>
      ) : (
        <></>
      )}

      {isAgronomistOpen ? (
        <ScrollArea
          className="h-72 w-48 rounded-md  absolute mt-2 bg-blue-950 right-4"
          style={{ position: "absolute" }}
        >
          <div onClick={() => router("/")} className="p-4">
            <h4 className="mb-4 text-sm font-medium leading-none">
              Agronomists
            </h4>

            {agronomists !== null &&
              agronomists.map((agronomist) => {
                const containerClasses = clsx(
                  "text-sm",
                  "cursor-pointer",
                  "pl-2",
                  "rounded-md",
                  "py-1",
                  "hover:bg-blue-900",
                  "transition",
                  {
                    "bg-blue-900": selectedAgronomist === agronomist.id,
                  },
                  "duration-100",
                );
                return (
                  <div
                    onClick={() => {
                      toggleAgronomistId(agronomist.id);
                      setSelectedAgronomist(agronomist.id);
                      setIsAgronomistsOpen(false);
                    }}
                    key={agronomist.id}
                  >
                    <div className={containerClasses}>{agronomist.name}</div>

                    <Separator className=" mt-1 my-2 bg-gray-600" />
                  </div>
                );
              })}
          </div>
        </ScrollArea>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Header;
