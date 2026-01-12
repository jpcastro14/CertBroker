import { useForm } from "react-hook-form";
import { saleSchema, type SaleSchema } from "../brokerProfile/schema";
import type { BrokerStateProps, Sales } from "../../contexts/brokerProvider";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { BrokerApi } from "../../services/api";
import { uuidv4 } from "zod";

type SaleModalProps = {
  isModalOpen: boolean;
  closeModal: () => void;
  payload: BrokerStateProps;
};

export function SaleModal({
  isModalOpen,
  closeModal,
  payload,
}: SaleModalProps) {
  const [sale, setSale] = useState<string>("");
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SaleSchema>({
    resolver: zodResolver(saleSchema),
    mode: "onSubmit",
    defaultValues: {
      saleValue: "",
    },
  });

  function handleSale(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;

    const formattedSaleValue = value
      .replace(/\D/g, "")
      .replace(/(\d)(\d{2})$/, "$1.$2")
      .replace(/(?=(\d{3})+(\D))\B/g, ",");

    setSale(formattedSaleValue);
  }

  function createSale(data: SaleSchema) {
    if (sale.length === 0) {
      setError("saleValue", {
        message: "Informe o valor da venda",
      });
      return;
    }
    const finalSale: Sales = {
      id: crypto.randomUUID(),
      title: data.title,
      saleValue: parseFloat(sale.replace(/,/g, "")),
      saleDate: new Date(),
    };

    payload.sales.push(finalSale);

    BrokerApi.put(`/brokers/${payload?.id}`, payload).then((response) => {
      if (response.status === 200) {
        closeModal();
        console.log("deu certo");
        console.log(response.data);
      }
    });
  }

  return (
    <dialog id="SaleModal" className="modal" open={isModalOpen}>
      <div className="modal-box bg-white ">
        <h3 className="font-bold text-lg text-slate-600">Cadastro de venda</h3>
        <p className="py-4 text-slate-500 ">
          Informar venda para o corretor{" "}
          <strong>
            {payload?.title} - {payload?.creci}
          </strong>
        </p>
        <div id="FormWrapper" className="m-4">
          <div className="grid grid-cols-2 gap-2 ">
            <fieldset className="fieldset col-span-2 xl:col-span-2 ">
              <legend className="fieldset-legend">Empreendimento</legend>
              {errors.title && (
                <p className="text-red-500">{errors.title.message}</p>
              )}
              <input
                {...register("title")}
                type="text"
                className="input w-full"
              />
            </fieldset>
            <fieldset className="fieldset col-span-2">
              <legend className="fieldset-legend">Valor da venda</legend>
              {errors.saleValue && (
                <p className="text-red-500">{errors.saleValue.message}</p>
              )}
              <input
                value={sale}
                onChange={handleSale}
                className="input w-full"
                type="text"
              />
            </fieldset>
          </div>
        </div>
        <div className="modal-action flex gap-4">
          <button
            className="btn btn-success"
            onClick={() => handleSubmit(createSale)()}
          >
            Informar Venda
          </button>
          <button className="btn btn-error" onClick={() => closeModal()}>
            Fechar
          </button>
        </div>
      </div>
    </dialog>
  );
}
