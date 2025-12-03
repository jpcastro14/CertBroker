import { Link, useParams } from "react-router";
import { useEffect, useState } from "react";
import { BrokerApi } from "../../services/api";
import type { BrokerStateProps } from "../../contexts/brokerProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleLeft } from "@fortawesome/free-regular-svg-icons/faArrowAltCircleLeft";
import { useForm } from "react-hook-form";
import { PatternFormat } from "react-number-format";

export function BrokerProfile() {
  const { id } = useParams();
  const [broker, setBroker] = useState<BrokerStateProps>(
    {} as BrokerStateProps
  );
  const [visible, setVisible] = useState(false);
  const {
    getValues,
    register,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const getData = async () => {
      const response = await BrokerApi.get(`/brokers/${id}`);
      setBroker(response.data);
    };
    getData();
  }, []);

  function updateContact() {
    const values = getValues();

    console.log(values);
  }

  return (
    <>
      <dialog id="ChangeContactModal" className="modal" open={visible}>
        <div className="modal-box bg-white w-fit">
          <h3 className="font-bold text-lg text-slate-700">Alterar contatos</h3>

          <div id="FormWrapper" className="m-4">
            <div className="grid grid-cols-2 gap-2 ">
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Nome</legend>
                <input
                  {...register("title")}
                  type="text"
                  className="input"
                  placeholder="Nome Completo"
                  defaultValue={broker.title}
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Creci</legend>
                <PatternFormat
                  {...register("creci")}
                  className="input"
                  displayType="input"
                  format="###### - F"
                />
              </fieldset>
              <fieldset className="fieldset col-span-2">
                <legend className="fieldset-legend">Email</legend>
                <input
                  {...register("email")}
                  type="text"
                  className="input w-full"
                  placeholder="Email"
                />
              </fieldset>
              <fieldset className="fieldset col-span-2">
                <legend className="fieldset-legend">Telefone</legend>
                <PatternFormat
                  {...register("phoneNumber")}
                  className="input  w-full "
                  format="(##) # ####-####"
                />
              </fieldset>
            </div>
          </div>

          <div className="modal-action grid grid-cols-2 w-full">
            <button
              className="btn btn-success "
              onClick={() => updateContact()}
            >
              Alterar Dados
            </button>
            <button
              className="btn btn-error"
              onClick={() => setVisible(!visible)}
            >
              Cancelar
            </button>
          </div>
        </div>
      </dialog>
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
          className="w-full max-w-7xl mx-auto mt-10 flex flex-col items-center md:flex-row xl:flex-row  p-4 xl:shadow rounded-md"
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
            <button
              className="btn bg-amber-400 border-0 hidden xl:block absolute right-6 top-6"
              onClick={() => setVisible(!visible)}
            >
              Editar Contatos
            </button>
          </div>
        </div>
      </div>

      <div
        id="SalesWrapper"
        className=" mb-4 max-w-7xl mt-6 mx-6 xl:mx-auto flex flex-col xl:flex-row shadow rounded-md p-4 gap-4 "
      >
        <div id="SalesContainer" className="w-full rounded p-4 shadow ">
          <p className="text-slate-900 border border-green-300 p-2 rounded">
            Vendas
          </p>

          <div id="SalesTable" className="overflow-x-auto">
            <table className="table table-md text-slate-700 ">
              <thead className="text-slate-700">
                <tr>
                  <th>#</th>
                  <th>Empreendimento</th>
                  <th>Valor</th>
                  <th>Data da venda</th>
                </tr>
              </thead>
              <tbody>
                {broker &&
                  broker.sales?.map((sale) => (
                    <tr key={sale.id} className="border-b border-slate-200">
                      <th>{sale.id}</th>
                      <td>{sale.title}</td>
                      <td>
                        {sale.saleValue.toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })}
                      </td>
                      <td>{sale.date}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>

        <div id="ComissionsContainer" className="w-full rounded p-4 shadow">
          <p className="text-slate-900 border border-blue-300 p-2 rounded ">
            Comisssões
          </p>
          <table className="table table-md text-slate-700 ">
            <thead className="text-slate-700">
              <tr>
                <th>#</th>
                <th>Empreendimento</th>
                <th>Valor</th>
              </tr>
            </thead>
            <tbody>
              {broker &&
                broker.sales?.map((comission) => (
                  <tr key={comission.id} className="border-b border-slate-200">
                    <th>{comission.id}</th>
                    <td>{comission.title}</td>
                    <td>
                      {((comission.saleValue / 100) * 0.2).toLocaleString(
                        "pt-BR",
                        { style: "currency", currency: "BRL" }
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
