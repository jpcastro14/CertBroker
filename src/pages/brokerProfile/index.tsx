import { Link, useParams } from "react-router";
import { useState } from "react";
import { BrokerApi } from "../../services/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleLeft } from "@fortawesome/free-regular-svg-icons/faArrowAltCircleLeft";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateSchema, type BrokerSchema } from "./schema";
import { message } from "antd";
import { useFetchBrokers } from "../../customHooks/useFetchBrokers";

export function BrokerProfile() {
  const { id } = useParams();
  const { brokerById } = useFetchBrokers("false",id);
  const [visible, setVisible] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const phonePattern = /(^)([0-9]{2})([0-9]{1})([0-9]{4})([0-9]{4})/;
  const {
    getValues,
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<BrokerSchema>({
    resolver: zodResolver(updateSchema),
    defaultValues: {
      title: brokerById?.title,
      email: brokerById?.email,
    },
    mode: "onBlur",
  });
  
  function updateContact() {
    const values = getValues();

    const updatedBrokerData = {
      ...brokerById,
      title: values.title,
      creci: values.creci,
      email: values.email,
      phoneNumber: values.phoneNumber,
    };

    BrokerApi.put(`/broker/${id}`, updatedBrokerData).then((r) => {
      if (r.status == 200) {
        messageApi.info({
          type: "success",
          content: "Informações atualizadas com êxito.",
        });
        setTimeout(() => {
          window.location.reload();
        }, 2000);
        setVisible(!visible);
      }
    });
  }

  const bigestSalary = brokerById?.clients.sort((a,b)=> b.salary - a.salary) 


  return (
    <>
      {contextHolder}
      <dialog id="ChangeContactModal" className="modal" open={visible}>
        <div className="modal-box bg-white">
          <h3 className="font-bold text-lg text-slate-700">Alterar contatos</h3>

          <div id="FormWrapper" className="m-4">
            <div className="grid grid-cols-2 gap-2 ">
              <fieldset className="fieldset col-span-2 xl:col-span-1 ">
                <legend className="fieldset-legend">Nome</legend>
                <input
                  {...register("title")}
                  type="text"
                  className="input w-full"
                  defaultValue={
                    brokerById?.title ? brokerById?.title : undefined
                  }
                />
                {errors.title && (
                  <p className="text-red-500">{errors.title.message}</p>
                )}
              </fieldset>
              <fieldset className="fieldset col-span-2 xl:col-span-1 ">
                <legend className="fieldset-legend">Creci</legend>
                <input
                  {...register("creci")}
                  className="input w-full"
                  type="text"
                  maxLength={6}
                />
                {errors.creci && (
                  <p className="text-red-500">{errors.creci.message}</p>
                )}
              </fieldset>
              <fieldset className="fieldset col-span-2">
                <legend className="fieldset-legend">Email</legend>
                <input
                  {...register("email")}
                  type="text"
                  className="input w-full"
                />
                {errors.email?.message && (
                  <p className="text-red-500">{errors.email.message}</p>
                )}
              </fieldset>
              <fieldset className="fieldset col-span-2">
                <legend className="fieldset-legend">Telefone</legend>
                <input
                  type="text"
                  {...register("phoneNumber")}
                  className="input  w-full "
                  maxLength={11}
                />
                {errors.phoneNumber?.message && (
                  <p className="text-red-500">{errors.phoneNumber.message}</p>
                )}
              </fieldset>
            </div>
          </div>

          <div className="modal-action grid grid-cols-2 w-full">
            <button
              className="btn btn-success "
              onClick={() => handleSubmit(updateContact)()}
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

      {/* -------------------- Return Button -------------------- */}
      <div
        id="ReturnButtonWrapper"
        className="mt-6 max-w-7xl mx-auto pl-4 xl:pl-0 "
      >
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

      {/* -------------------- Return Button -------------------- */}

      <div
        id="BrokerProfileWrapper"
        className="max-w-7xl mx-2 mt-10 xl:mx-auto "
      >
        <div
          id="BrokerProfile"
          className="w-full max-w-7xl mx-auto mt-10 flex flex-col items-center align-middle md:flex-row xl:flex-row  p-4 xl:shadow rounded-md"
        >
          <img
            id="BrokerProfilePicture"
            className="btn btn-circle h-40 w-40 m-2 object-cover border-2 border-blue-800"
            src={brokerById?.photo}
          />
          <div
            id="BrokerRegister"
            className=" relative w-full rounded p-6 mt-4 flex flex-col gap-3 border-slate-300 xl:h-40 xl:ml-4 justify-center bg-slate-100"
          >
            <p className="text-slate-600 font-medium text-2xl">
              {brokerById?.title} - CRECI {brokerById?.creci}
            </p>
            <p className="text-slate-400 font-medium text-xl ">
              {brokerById?.phoneNumber &&
                brokerById?.phoneNumber
                  .toString()
                  .replace(phonePattern, "$1 ($2) $3 $4 $5")}
            </p>
            <p className="text-slate-400 font-medium text-xl uppercase">
              {brokerById?.email}
            </p>
            <button
              className="btn btn-warning xl:hidden"
              onClick={() => setVisible(!visible)}
            >
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


      {brokerById && brokerById.sales?.length > 0 && <div
        id="SalesWrapper"
        className="mb-4 max-w-7xl bg-white mt-6 mx-6 xl:mx-auto flex flex-col xl:flex-row xl: shadow rounded-md p-4 gap-4 "
      >
        <div
          id="SalesContainer"
          className="w-full bg-white rounded p-4 shadow "
        >
          <p className="text-slate-900 bg-green-300 p-2 rounded">
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
                {brokerById &&
                  brokerById.sales?.map((sale) => (
                    <tr key={sale.id} className="border-b border-slate-200">
                      <th>{sale.id.toString().slice(2,7).toUpperCase()}</th>
                      <td>{sale.title}</td>
                      <td>
                        {sale.saleValue.toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })}
                      </td>
                      <td>
                        {new Date(sale.saleDate).getMonth() + 1 } /{" "}
                        {new Date(sale.saleDate).getFullYear()}
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-slate-50" >
                    <th>Total</th>
                    <td></td>
                    <td className="bg-slate-50" >{brokerById.sales.reduce((acc,sale)=> acc + sale.saleValue,0).toLocaleString('pt-br',{style:"currency",currency:'BRL'})}</td>
                    <td></td>
                  </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div
          id="ComissionsContainer"
          className="w-full bg-white rounded p-4 shadow"
        >
          <p className="text-slate-900 bg-blue-300 p-2 rounded ">
            Comisssões
          </p>
          <table className="table table-md text-slate-700 ">
            <thead className="text-slate-700">
              <tr>
                <th>#</th>
                <th>Empreendimento</th>
                <th>Valor</th>
                <th>Comissão</th>
              </tr>
            </thead>
            <tbody>
              {brokerById &&
                brokerById.sales.map((comission) => (
                  <tr key={comission.id} className="border-b border-slate-200">
                    <th>{comission.id.toString().slice(2,8).toUpperCase()}</th>
                    <td>{comission.title}</td>
                    <td>{(comission.saleValue * 0.003).toLocaleString('pt-br',{style:'currency',currency:"BRL"})}</td>
                    <td>{(comission.saleValue * 0.003).toLocaleString('pt-br',{style:'currency',currency:"BRL"})}</td>
                  </tr>
                ))}
                <tr className="bg-slate-50" >
                  <th>Total</th>
                  <td></td>
                  <td></td>
                  <td className="font-bold" >{brokerById.sales.reduce((acc, sale)=> acc + sale.saleValue * 0.003,0).toLocaleString('pt-br',{style:"currency", currency:"BRL"})}</td>
                </tr>
            </tbody>
          </table>
        </div>
      </div> }
      <div id="clientsWrapper" className="max-w-7xl mx-auto" >
                        <div
          id="ClientsContainer"
          className="w-full bg-white rounded p-4 shadow"
        >
          <p className="text-slate-900 border bg-yellow-400 border-white p-2 rounded ">
            Clientes
          </p>
          <table className="table table-md text-slate-700 ">
            <thead className="text-slate-700">
              <tr>
                <th>Servidor</th>
                <th>Nome</th>
                <th>Salário</th>
                <th>Interesses</th>
                <th>Contato</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {bigestSalary &&
                bigestSalary.map((client) => (
                  <tr key={client.id} className="border-b border-slate-200">
                    <th className={client.servidor ? "bg-green-100 w-0 " : "bg-white w-0"  } >{client.servidor ? <span>Servidor</span> : "" }</th>
                    <td>{client.name}</td>
                    <td>{(client.salary).toLocaleString('pt-br',{style:'currency',currency:"BRL"})}</td>
                    <td>{client.interest.map((item)=> <h6 className="text-xs" >{item}</h6>)}</td>
                    <td>{client.contact.toString()
                  .replace(phonePattern, "$1 ($2) $3 $4 $5")}</td>
                  <td>{client.email}</td>
                  </tr>

                ))}
            </tbody>
          </table>
        </div>
      </div>
      <div>
      </div>
      
    </>
  );
}
