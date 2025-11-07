import { faMoneyBill1 } from "@fortawesome/free-regular-svg-icons/faMoneyBill1";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  BrokerContext,
  type BrokerStateProps,
} from "../../contexts/brokerProvider";
import { useContext, useEffect, useState } from "react";
import { BrokerApi } from "../../services/api";

export function List() {
  const [brokers, setBrokers] = useState<BrokerStateProps[]>([]);
  const { brokerList, createList, clearList } = useContext(BrokerContext);

  useEffect(() => {
    const getData = async () => {
      await BrokerApi.get("brokers")
        .then((response) => setBrokers(response.data))
        .catch((error) => console.log(error));
    };
    getData();
  }, []);

  return (
    <>
      <div id="PageTitle" className="w-full max-w-7xl mx-auto shadow-2xs">
        <h2 className="max-w-7xl text-black text-xl mt-10 mx-4">
          Fila de corretores
        </h2>
        <button className="btn btn-accent" onClick={clearList}>
          limpar fila
        </button>
      </div>
      <div
        id="CardContainer"
        className=" w-full max-w-7xl mx-auto flex flex-col items-center sm:grid-cols-2 lg:grid-cols-3 md:grid grid-cols-4 xl:grid-cols-4"
      >
        {brokerList.map((item, index) => (
          <div
            key={item.id}
            id="CardWrapper"
            className=" min-w-l max-w-xl justify-self-center mt-10 mx-2 border rounded border-slate-200"
          >
            <div
              id="CardBackground"
              className="w-full max-w-94 card card-side shadow"
            >
              <div
                id="profilePicture"
                className="bg-slate-100 min-w-24 justify-center flex pt-6"
              >
                <img
                  src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
                  alt="Movie"
                  className="w-20 h-20 btn btn-circle object-cover"
                ></img>
              </div>
              <div
                id="CardInfo"
                className=" min-w-44 min-h-72 max-w-44 card-body pl-2 bg-white text-black"
              >
                {index == 0 && (
                  <span
                    id="CardAdvise"
                    className="absolute rounded-full bg-error bg- p-1 -top-3 right-2"
                  >
                    <p className="text-slate-900">Corretor da vez</p>
                  </span>
                )}

                {index != 0 && (
                  <span
                    id="CardAdvise"
                    className="absolute btn btn-circle border-slate-200 rounded-full bg-warning p-1 -top-3 right-2"
                  >
                    <p className="text-slate-900">{index + 1}</p>
                  </span>
                )}

                <h2 id="CardTitle" className="card-title">
                  {item.title}
                </h2>
                <span
                  id="CardTeam"
                  className="border border-success rounded-full pl-1 flex justify-center "
                >
                  Equipe {item.team}
                </span>
                <div id="CardSales" className="card-actions justify-start">
                  <span className=" overflow-y-hidden max-h-32 rounded px-1 flex flex-col bg-slate-50 w-full justify-center ">
                    <p className="text-xl">Vendas: {item.sales.length} </p>
                    {item.sales.map((item) => (
                      <p key={item.id} className="text-slate-400 border-b">
                        {item.title} - {item.date}{" "}
                      </p>
                    ))}
                  </span>
                </div>
                <div
                  id="profileActions"
                  className=" w-full h-full items-end mt-4 grid grid-cols-2 gap-1"
                >
                  <button
                    className="btn btn-warning"
                    onClick={() => createList(item)}
                  >
                    Fila
                  </button>
                  <button className="btn btn-success">
                    Venda
                    <FontAwesomeIcon icon={faMoneyBill1} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ---------------------- Corretores disponíveis ---------------------- */}

      <div id="PageTitle" className="w-full max-w-7xl mx-auto shadow-2xs">
        <h2 className="max-w-7xl text-black text-xl mt-10 mx-4">
          Corretores disponíveis
        </h2>
      </div>

      <div
        id="CardContainer"
        className=" w-full max-w-7xl mx-auto flex flex-col items-center sm:grid-cols-2 lg:grid-cols-3 md:grid grid-cols-4 xl:grid-cols-4"
      >
        {brokers.map((item, index: number) => (
          <div
            key={item.id}
            id="CardWrapper"
            className=" min-w-l max-w-xl justify-self-center mt-10 mx-2 border rounded border-slate-200"
          >
            <div
              id="CardBackground"
              className="w-full max-w-94 card card-side shadow"
            >
              <div
                id="profilePicture"
                className="bg-slate-100 min-w-24 justify-center flex pt-6"
              >
                <img
                  src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
                  alt="Movie"
                  className="w-20 h-20 btn btn-circle object-cover"
                ></img>
              </div>
              <div
                id="CardInfo"
                className=" min-w-44 min-h-72 max-w-44 card-body pl-2 bg-white text-black"
              >
                <h2 id="CardTitle" className="card-title">
                  {item.title}
                </h2>
                <span
                  id="CardTeam"
                  className="border border-success rounded-full pl-1 flex justify-center "
                >
                  Equipe {item.team}
                </span>
                <div id="CardSales" className="card-actions justify-start">
                  <span className=" overflow-y-hidden max-h-32 rounded px-1 flex flex-col bg-slate-50 w-full justify-center ">
                    <p className="text-xl">Vendas: {item.sales.length}</p>
                    {item.sales.map((item) => (
                      <p key={item.id} className="text-slate-400 border-b">
                        {item.title} - {item.date}{" "}
                      </p>
                    ))}
                  </span>
                </div>
                <div
                  id="profileActions"
                  className=" w-full h-full items-end mt-4 grid grid-cols-2 gap-1"
                >
                  <button
                    className="btn btn-warning"
                    onClick={() => createList(item)}
                  >
                    Fila
                  </button>
                  <button className="btn btn-success">
                    Venda
                    <FontAwesomeIcon icon={faMoneyBill1} />
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
