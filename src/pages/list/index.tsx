import { BrokerContext } from "../../contexts/brokerProvider";
import { useContext, useState } from "react";
import { Link } from "react-router";
import { FilterComponent } from "./FilterComponent";
import { useFetchBrokers } from "../../customHooks/useFetchBrokers";
import { AlertComponent } from "./AlertComponent";
import { BrokerQueue } from "./BrokerQueue";

export function List() {
  const [filtered, setFiltered] = useState<string>("");
  const { brokers } = useFetchBrokers(filtered);
  const { createList } = useContext(BrokerContext);

  const setFilter = (param: string) => {
    setFiltered(param);
  };

  const setSearchParam = (value: string) => {
    setFiltered(value || "");
  };
  return (
    <>
      <AlertComponent />
      <BrokerQueue />

      <div id="PageTitle" className="w-full max-w-7xl mx-auto shadow-2xs">
        <h2 className="max-w-7xl text-black text-xl mt-10 mx-4">
          Corretores disponíveis
        </h2>
      </div>

      <FilterComponent setParam={setFilter} setSearchParam={setSearchParam} />
      <div
        id="AvailableBrokersCardContainer"
        className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-4 px-2 pb-20 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        {brokers?.map((item) => (
          <div
            key={item.id}
            id="CardWrapper"
            className="mt-10 w-full max-w-xl justify-self-center rounded border border-slate-200"
          >
            <div
              id="CardBackground"
              className="w-full max-w-94 card card-side shadow"
            >
              <div
                id="profilePicture"
                className="bg-slate-100 min-w-24 justify-center flex pt-6"
              >
                <Link to={`/brokerProfile/${item.id}`}>
                  <img
                    src={item.photo}
                    alt="Movie"
                    className="w-20 h-20 btn btn-circle object-cover"
                  />
                </Link>
              </div>
              <div
                id="CardInfo"
                className="w-80 xl:max-w-44 card-body pl-2 bg-white text-black"
              >
                <h2 id="CardTitle" className="card-title">
                  {item.title}
                </h2>

                <span
                  id="CardTeam"
                  //className="border border-slate-600 rounded-full pl-1 flex justify-center "
                  className={`${item.team === "Breno" ? "bg-success" : "bg-warning"} rounded-full pl-1 flex justify-center `}
                >
                  Equipe {item.team}
                </span>
                <div id="profileActions" className="w-full">
                  <button
                    className="btn btn-info btn-soft w-full "
                    onClick={() => createList(item)}
                  >
                    Adicionar à fila
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
