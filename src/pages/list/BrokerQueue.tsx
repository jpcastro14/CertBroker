import { useContext } from "react";
import { BrokerContext } from "../../contexts/brokerProvider";

export function BrokerQueue() {
  const { brokerList, clearList } = useContext(BrokerContext);
  return (
    <>
      <div id="BrokerRow" className="max-w-7xl xl:mx-auto">
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
    </>
  );
}
