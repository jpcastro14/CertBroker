import { Link, useParams } from "react-router";
import { useEffect, useState } from "react";
import { BrokerApi } from "../../services/api";
import type { BrokerStateProps } from "../../contexts/brokerProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleLeft } from "@fortawesome/free-regular-svg-icons/faArrowAltCircleLeft";

export function BrokerProfile() {
  const { id } = useParams();
  const [broker, setBroker] = useState<BrokerStateProps>(
    {} as BrokerStateProps
  );

  useEffect(() => {
    const getData = async () => {
      const response = await BrokerApi.get(`/brokers/${id}`);
      setBroker(response.data);
    };
    getData();
  }, []);

  return (
    <>
      <div id="ReturnButtonWrapper" className="mx-6 mt-6">
        <Link to={"/"}>
          <button className="h-12 w-12 flex items-center justify-center border border-slate-200 p-2 rounded-[100px]">
            <FontAwesomeIcon
              icon={faArrowAltCircleLeft}
              size="xl"
              color="black"
            />
          </button>
        </Link>
      </div>
      <div
        id="BrokerProfileWrapper"
        className="max-w-7xl mx-2 mt-10 xl:mx-auto "
      >
        <div
          id="BrokerProfile"
          className="w-full max-w-7xl mx-auto mt-10 flex flex-col items-center md:flex-row xl:flex-row xl:border p-4 xl:shadow rounded-md"
        >
          <img
            className="btn btn-circle h-40 w-40 m-2 object-cover border-2 border-blue-800"
            src={broker.photo}
          />
          <div
            id="BrokerRegister"
            className=" relative w-full rounded p-6 mt-4 flex flex-col gap-3 border-slate-300 xl:h-40 xl:ml-4 justify-center bg-slate-100"
          >
            <p className="text-slate-600 font-medium text-2xl">
              {broker.title} - Creci xxxxxxx
            </p>
            <p className="text-slate-400 font-medium text-xl ">
              (61) 9 9999 9999
            </p>
            <p className="text-slate-400 font-medium text-xl uppercase">
              EmaildoCorretor@email.com
            </p>
            <button className="btn btn-warning xl:hidden">
              Editar Contatos
            </button>
            <button className="btn bg-amber-400 border-0 hidden xl:block absolute right-6 top-6 ">
              Editar Contatos
            </button>
          </div>
        </div>
      </div>

      <div
        id="SalesWrapper"
        className=" mb-4 max-w-7xl mt-6 mx-6 xl:mx-auto flex flex-col xl:flex-row shadow rounded-md p-4 gap-4 "
      >
        <div
          id="SalesContainer"
          className="w-full border border-green-300 rounded p-4 "
        >
          <p className="text-slate-500">Vendas</p>
          <div className="overflow-x-auto text-black">
            <table className="table table-xs">
              <thead className="text-black">
                <tr>
                  <th></th>
                  <th>Nome</th>
                  <th>Valor</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>1</th>
                  <td>Real Esplendor</td>
                  <td>1.200.000</td>
                </tr>
                <tr>
                  <th>2</th>
                  <td>Real Bothanic</td>
                  <td>6.4 M</td>
                </tr>
                <tr>
                  <th>3</th>
                  <td>Real Bauhaus</td>
                  <td>3.4 M</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div
          id="ComissionsContainer"
          className="w-full border border-blue-300 rounded p-4"
        >
          <p className="text-slate-400">Comisssões</p>
        </div>
      </div>
    </>
  );
}
