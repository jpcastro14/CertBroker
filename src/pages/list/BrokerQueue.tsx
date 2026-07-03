import { useContext, useState } from "react";
import {
  BrokerContext,
  type BrokerStateProps,
} from "../../contexts/brokerProvider";
import { NewSaleModal } from "./SaleModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyBill1 } from "@fortawesome/free-regular-svg-icons/faMoneyBill1";
import { Link } from "react-router";

export function BrokerQueue() {
  const { brokerList, clearList } = useContext(BrokerContext);
  const [openSaleModal, setOpenSaleModal] = useState(false);
  const [brokerPayload, setBrokerPayload] = useState<BrokerStateProps>(
    {} as BrokerStateProps,
  );

  const toggleModalOpen = (item: BrokerStateProps) => {
    setOpenSaleModal(!openSaleModal);
    setBrokerPayload(item);
  };

  return (
    <>
      <div id="BrokerQueue" className="max-w-7xl xl:mx-auto">
        <div className="flex flex-col items-start mt-10 md:flex-row lg:flex-row xl:flex-row px-2 ">
          <h2 className="text-black text-xl mx-4">Fila de corretores</h2>
          {brokerList.length > 0 && (
            <button
              className=" w-full btn btn-success btn-sm px-2 md:max-w-50 lg:max-w-50 xl:max-w-50 "
              onClick={() => clearList()}
            >
              Próximo da fila
            </button>
          )}
        </div>
      </div>

      <NewSaleModal
        isModalOpen={openSaleModal}
        closeModal={() => setOpenSaleModal(false)}
        payload={brokerPayload}
      />

      <div
        id="BrokerQueueContainer"
        className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-4 px-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        {brokerList.map((item, index) => (
          <div
            key={item.id}
            id="CardWrapper"
            className="mt-10 w-full max-w-64 justify-self-center rounded border border-slate-200"
          >
            <div id="CardBackground" className="max-h-72 card card-side shadow">
              <div
                id="CardInfo"
                className="min-h-72 card-body bg-white text-black"
              >
                {index == 0 && (
                  <span
                    id="CardAdvise"
                    className="absolute rounded-full bg-error bg- p-1 px-4 -top-3 right-2"
                  >
                    <p className="text-slate-900">Corretor da vez</p>
                  </span>
                )}

                {index != 0 && (
                  <span
                    id="BrokerIndex"
                    className="absolute btn btn-circle border-slate-200 rounded-full bg-warning p-1 -top-3 right-2"
                  >
                    <p className="text-slate-900 text-xl font-semibold">
                      {index + 1}
                    </p>
                  </span>
                )}
                <Link to={`/brokerProfile/${item.id}`}>
                  <h2 id="CardTitle" className="card-title">
                    {item.title}
                  </h2>
                </Link>

                <span
                  id="CardTeam"
                  //className="border border-slate-700 rounded-full pl-1 flex justify-center"
                  className={`${item.team === "Breno" ? "border-green-500" : "border-yellow-500"} border rounded-full pl-1 flex justify-center `}
                >
                  Equipe {item.team}
                </span>
                <div id="CardSales" className="card-actions justify-start">
                  <span className=" overflow-y-scroll max-h-30 mb-auto rounded bg-slate-50 w-full justify-center ">
                    <p className="text-xl">Vendas: {item.sales.length} </p>
                    {item.sales.map((item) => (
                      <p
                        key={item.id}
                        className="text-slate-400 border-b px-2 hover:bg-slate-100"
                      >
                        {item.title.charAt(0).toUpperCase() +
                          item.title.slice(1)}{" "}
                        - {new Date(item.saleDate).getMonth() + 1}
                        {"/ " + new Date(item.saleDate).getFullYear()}
                      </p>
                    ))}
                  </span>
                </div>
                <div
                  id="profileActions"
                  className=" w-full h-full items-end mt-4 grid grid-cols-2 gap-1"
                >
                  {index != 0 && (
                    <button
                      className="btn btn-error"
                      onClick={() => clearList(item)}
                    >
                      Sair
                    </button>
                  )}

                  <button
                    onClick={() => toggleModalOpen(item)}
                    className="btn btn-success"
                  >
                    <FontAwesomeIcon icon={faMoneyBill1} />
                    Venda
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
