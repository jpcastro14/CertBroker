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
import { ClientsTable } from "./clientsTable";
import { SalesTable } from "./salesTable";

export function BrokerProfile() {
  const { id } = useParams();
  const { brokerById } = useFetchBrokers(undefined, id);
  const [visible, setVisible] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const phonePattern: RegExp = /(^)([0-9]{2})([0-9]{1})([0-9]{4})([0-9]{4})/;
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

    BrokerApi.put(`/brokers/${id}`, updatedBrokerData).then((r) => {
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

      <SalesTable brokerById={brokerById} />
      <ClientsTable />
    </>
  );
}
