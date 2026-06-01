import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useParams } from "react-router-dom";
import { clientSchema, type ClientSchema } from "./schema";
import { useFetchBrokers } from "../../customHooks/useFetchBrokers";
import { useState } from "react";
import { message } from "antd";
import { v4 as uuid } from "uuid";

export function ClientsTable() {
  const { id } = useParams();
  const { brokerById } = useFetchBrokers("false", id);
  const [open, setOpen] = useState(false);
  const phonePattern: RegExp = /(^)([0-9]{2})([0-9]{1})([0-9]{4})([0-9]{4})/;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ClientSchema>({
    resolver: zodResolver(clientSchema),
  });

  function handleCreateClient(data: ClientSchema) {
    const newClient: ClientSchema = {
      id: uuid(),
      name: data.name,
      isServer: data.isServer,
      salary: data.salary,
      interest: data.interest,
      contact: data.contact,
      email: data.email,
    };

    brokerById?.clients.push(newClient);

    axios
      .put(`http://localhost:3000/brokers/${id}`, brokerById)
      .then((response) => {
        if (response.status === 200) {
          setOpen(false);
          message.success("Cliente cadastrado com sucesso!");
          /* setTimeout(() => {
            window.location.reload();
          }, 3000); */
        }
      })
      .catch((error) => {
        message.error("Erro ao cadastrar cliente: " + error.message);
      });
  }

  return (
    <>
      <div
        id="clientsWrapper"
        className="max-w-7xl mx-auto shadow border-slate-200 p-4 rounded "
      >
        <div
          id="ClientsContainer"
          className="w-full bg-white rounded p-4 shadow"
        >
          <p className="text-slate-900 border bg-yellow-400 border-white p-2 rounded ">
            Clientes
          </p>
          <button
            onClick={() => setOpen(true)}
            className="btn font-medium bg-red-400 mb-4 w-full xl:w-50 "
          >
            Cadastrar Novo Cliente
          </button>
          <div className="overflow-x-auto">
            <table className="table table-md text-slate-700 ">
              <thead className="text-slate-700">
                <tr>
                  <th className="w-0">Servidor</th>
                  <th>Nome</th>
                  <th>Salário</th>
                  <th>Interesses</th>
                  <th>Contato</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {brokerById?.clients.map((client) => (
                  <tr key={client.id} className="border-b border-slate-200">
                    <th
                      className={
                        client.isServer ? "bg-green-100 w-0 " : "bg-white w-0"
                      }
                    >
                      {client.isServer ? <span>Servidor</span> : ""}
                    </th>
                    <td>{client.name}</td>
                    <td>
                      {client.salary.toLocaleString("pt-br", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </td>
                    <td>{client.interest}</td>
                    <td>
                      {client.contact
                        .toString()
                        .replace(phonePattern, "$1 ($2) $3 $4 $5")}
                    </td>
                    <td>{client.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <dialog
        data-close-on-click-outside
        id="ChangeContactModal"
        className="modal w-full items-center justify-stretch border-0 p-0"
        open={open}
      >
        <div
          id="FormWrapper"
          className="m-4 max-w-3xl w-full p-4 mx-auto rounded-md bg-white "
        >
          <p className="text-slate-900 font-medium border flex justify-between bg-yellow-400 border-white p-2 rounded ">
            Cadastrar novo cliente
          </p>
          <div className="grid grid-cols-2 gap-2 ">
            <fieldset className="fieldset col-span-2 xl:col-span-2 ">
              <legend className="fieldset-legend">Nome</legend>
              <input
                {...register("name")}
                type="text"
                className="input w-full"
              />
              {errors.name && (
                <p className="text-red-500">{errors.name.message}</p>
              )}
            </fieldset>
            <fieldset className="fieldset col-span-2 xl:col-span-1 border-b border-gray-200 rounded ">
              <legend className="fieldset-legend">Servidor?</legend>
              <input
                {...register("isServer")}
                type="checkbox"
                className="input checkbox justify-self-center  "
              />
              {errors.isServer && (
                <p className="text-red-500">{errors.isServer.message}</p>
              )}
            </fieldset>
            <fieldset className="fieldset col-span-2 xl:col-span-1">
              <legend className="fieldset-legend">Salário</legend>
              <input
                {...register("salary")}
                className="input w-full"
                type="number"
                maxLength={6}
              />
              {errors.salary && (
                <p className="text-red-500">{errors.salary.message}</p>
              )}
            </fieldset>
            <fieldset className="fieldset col-span-2 xl:col-span-1 ">
              <legend className="fieldset-legend">Interesse</legend>
              <select {...register("interest")} className="input w-full">
                <option defaultValue={"Selecione"}>Selecione</option>
                <option value="venda">Venda</option>
                <option value="aluguel">Aluguel</option>
              </select>
              {errors.interest?.message && (
                <p className="text-red-500">{errors.interest.message}</p>
              )}
            </fieldset>
            <fieldset className="fieldset col-span-2 xl:col-span-1">
              <legend className="fieldset-legend">Telefone</legend>
              <input
                type="text"
                {...register("contact")}
                className="input  w-full "
                maxLength={11}
              />
              {errors.contact?.message && (
                <p className="text-red-500">{errors.contact.message}</p>
              )}
            </fieldset>
            <fieldset className="fieldset col-span-2 xl:col-span-2">
              <legend className="fieldset-legend">Email</legend>
              <input
                type="text"
                {...register("email")}
                className="input  w-full "
              />
              {errors.email?.message && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
            </fieldset>
            <fieldset className="fieldset flex items-center col-span-2 xl:col-span-1">
              <button
                className="btn bg-blue-400 w-full "
                value="Cancelar"
                onClick={() => handleSubmit(handleCreateClient)()}
              >
                Salvar
              </button>

              <button
                className="btn bg-red-400 w-full "
                onClick={() => setOpen(!open)}
              >
                Cancelar
              </button>
            </fieldset>
          </div>
        </div>
      </dialog>
    </>
  );
}
