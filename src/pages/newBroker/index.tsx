import { zodResolver } from "@hookform/resolvers/zod";
import { updateSchema, type BrokerSchema } from "../brokerProfile/schema";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router";
import { message } from "antd";

export function NewBroker() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm<BrokerSchema>({
    resolver: zodResolver(updateSchema),
    mode: "onBlur",
  });

  function createBroker(data: BrokerSchema) {
    console.log(data);

    const broker = {
      title: data.title,
      creci: data.creci,
      email: data.email,
      phoneNumber: data.phoneNumber,
      photo: `https://ui-avatars.com/api/?name=${data.title}`,
    };

    axios.post(`http://localhost:3000/brokers/`, broker).then((response) => {
      if (response.status == 201) {
        resetField("title"),
          resetField("creci"),
          resetField("email"),
          resetField("phoneNumber");
        message.info("Corretor cadastrado com êxito");
        navigate(`/brokerProfile/${response.data.id}`);
      }
    });
  }

  return (
    <div
      id="ContainerWrapper"
      className="w-full max-w-4xl mx-auto mt-10 border rounded p-4 border-slate-300 "
    >
      <div>
        <p className="text-xl bg-slate-100 rounded p-4 ">
          Incluir novo corretor
        </p>
      </div>

      <div id="FormWrapper" className="m-4 max-w-4xl mx-auto ">
        <div className="grid grid-cols-2 gap-2 ">
          <fieldset className="fieldset col-span-2 xl:col-span-2 ">
            <legend className="fieldset-legend">Nome</legend>
            <input
              {...register("title")}
              type="text"
              className="input w-full"
            />
            {errors.title && (
              <p className="text-red-500">{errors.title.message}</p>
            )}
          </fieldset>
          <fieldset className="fieldset col-span-2 xl:col-span-1">
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
          <fieldset className="fieldset col-span-2 xl:col-span-1 ">
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
          <fieldset className="fieldset col-span-2 xl:col-span-1">
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

      <div className="w-full max-w-4xl flex gap-4 justify-end ">
        <button
          onClick={() => handleSubmit(createBroker)()}
          className="btn btn-success"
        >
          Salvar
        </button>
        <button className="btn btn-warning">Cancelar</button>
      </div>
    </div>
  );
}
