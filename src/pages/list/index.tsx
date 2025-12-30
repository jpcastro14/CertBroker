import { faMoneyBill1 } from "@fortawesome/free-regular-svg-icons/faMoneyBill1";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  BrokerContext,
  type BrokerStateProps,
  type Sales,
} from "../../contexts/brokerProvider";
import { useContext, useEffect, useState } from "react";
import { BrokerApi } from "../../services/api";
import { Link } from "react-router";
import { FilterComponent } from "./FilterComponent";
import { useForm } from "react-hook-form";
import { saleSchema, type SaleSchema } from "../brokerProfile/schema";
import { zodResolver } from "@hookform/resolvers/zod";

export function List() {
  const [brokers, setBrokers] = useState<BrokerStateProps[]>([]);
  const [parameter, setParameter] = useState("-title");
  const [openSaleModal, setOpenSaleModal] = useState(false);
  const [sale, setSale] = useState<string>("");
  const [brokerSaleInfo, setBrokerSaleInfo] =
    useState<Partial<BrokerStateProps>>();
  const { brokerList, createList, clearList, open, setOpen } =
    useContext(BrokerContext);

  useEffect(() => {
    const getData = async () => {
      await BrokerApi.get(`brokers?_sort=${parameter}`)
        .then((response) => setBrokers(response.data))
        .catch((error) => console.log(error));
    };
    getData();
  }, [parameter]);

  function setFilter(param?: string) {
    if (!param) {
      setParameter("-sales");
      return;
    }
    setParameter(param);
  }

  const toggleModalOpen = ({ id, title, creci }: BrokerStateProps) => {
    setOpenSaleModal(!openSaleModal);
    setBrokerSaleInfo({
      id,
      title,
      creci,
    });
    console.log(brokerSaleInfo);
  };

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SaleSchema>({
    resolver: zodResolver(saleSchema),
    mode: "onSubmit",
    defaultValues: {
      saleValue: "55.442.123,648",
    },
  });

  function createSale(data: SaleSchema) {
    if (sale.length <= 0) {
      setError("saleValue", {
        type: "min",
        message: "Informe o valor da venda",
      });
    } else {
      const finalSale: Sales = {
        title: data.title,
        saleValue: sale,
        saleDate: new Date().toString(),
      };

      const saleBroker = brokers.find((item) => item.id === brokerSaleInfo?.id);
      saleBroker?.sales.push(finalSale);
      console.log(saleBroker);
    }
  }

  function handleSale(e: React.ChangeEvent<HTMLInputElement>) {
    const overpriced = /([0-9]{2})([0-9]{3})([0-9]{3})([0-9]{3})/;
    const formattedSaleValue = e.target.value.replace(
      overpriced,
      "$1.$2.$3,$4"
    );
    setSale(formattedSaleValue);
  }

  return (
    <>
      <dialog id="SaleModal" className="modal" open={openSaleModal}>
        <div className="modal-box bg-white ">
          <h3 className="font-bold text-lg text-slate-600">
            Cadastro de venda
          </h3>
          <p className="py-4 text-slate-500 ">
            Informar venda para o corretor{" "}
            <strong>
              {brokerSaleInfo?.title} - {brokerSaleInfo?.creci}
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
            {/* if there is a button in form, it will close the modal */}
            <button
              className="btn btn-success"
              onClick={() => handleSubmit(createSale)()}
            >
              Informar Venda
            </button>
            <button
              className="btn btn-error"
              onClick={() => setOpenSaleModal(!openSaleModal)}
            >
              Fechar
            </button>
          </div>
        </div>
      </dialog>

      <dialog id="AlreadyOnRowAlert" className="modal" open={open}>
        <div className="modal-box bg-white ">
          <h3 className="font-bold text-lg text-slate-600">Ops!</h3>
          <p className="py-4 text-slate-500 ">
            O corretor ja está na fila de atendimento
          </p>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-error" onClick={() => setOpen(!open)}>
                Fechar
              </button>
            </form>
          </div>
        </div>
      </dialog>

      <div id="PageTitle" className="max-w-7xl xl:mx-auto">
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
              className="w-full max-h-72 max-w-94 card card-side shadow"
            >
              <Link to={`/brokerProfile/${item.id}`}>
                <div
                  id="profilePicture"
                  className="bg-slate-100 min-w-24 h-full justify-center flex pt-6"
                >
                  <img
                    src={item.photo}
                    alt="Movie"
                    className="w-20 h-20 btn btn-circle object-cover"
                  />
                </div>
              </Link>

              <div
                id="CardInfo"
                className=" min-w-44 min-h-72 max-w-44 card-body pl-2 bg-white text-black"
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

                <h2 id="CardTitle" className="card-title">
                  {item.title}
                </h2>
                <span
                  id="CardTeam"
                  className="border border-slate-700 rounded-full pl-1 flex justify-center "
                >
                  Equipe {item.team}
                </span>
                <div id="CardSales" className="card-actions justify-start">
                  <span className=" overflow-y-hidden max-h-32 rounded px-1 flex flex-col bg-slate-50 w-full justify-center ">
                    <p className="text-xl">Vendas: {item.sales.length} </p>
                    {item.sales.map((item) => (
                      <p key={item.id} className="text-slate-400 border-b">
                        {item.title} - {new Date(item.saleDate).getMonth()}
                        {"/"}
                        {new Date(item.saleDate).getMonth()}
                      </p>
                    ))}
                  </span>
                </div>
                <div
                  id="profileActions"
                  className=" w-full h-full items-end mt-4 grid grid-cols-2 gap-1"
                >
                  <button
                    className="btn btn-error"
                    onClick={() => clearList(item)}
                  >
                    Sair
                  </button>
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

      {/* ---------------------- Corretores disponíveis ---------------------- */}

      <div id="PageTitle" className="w-full max-w-7xl mx-auto shadow-2xs">
        <h2 className="max-w-7xl text-black text-xl mt-10 mx-4">
          Corretores disponíveis
        </h2>
      </div>

      <FilterComponent setParam={setFilter} />
      <div
        id="AvailableBrokersCardContainer"
        className=" w-full max-w-7xl mx-auto pb-20 flex flex-col items-center sm:grid-cols-2 lg:grid-cols-3 md:grid grid-cols-4 xl:grid-cols-4"
      >
        {brokers.map((item) => (
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
                <Link to={`/brokerProfile/${item.id}`}>
                  <img
                    src={item.photo}
                    alt="Movie"
                    className="w-20 h-20 btn btn-circle object-cover"
                  />
                </Link>
              </div>
              <div
                id="CardInfo"
                className="w-80 xl:max-w-44 h-50 card-body pl-2 bg-white text-black"
              >
                <h2 id="CardTitle" className="card-title">
                  {item.title}
                </h2>

                <span
                  id="CardTeam"
                  className="border border-slate-600 rounded-full pl-1 flex justify-center "
                >
                  Equipe {item.team}
                </span>
                <div id="profileActions" className="w-full mt-4">
                  <button
                    className="btn btn-warning w-full "
                    onClick={() => createList(item)}
                  >
                    Adicionar à fila
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
function register(
  arg0: string
): import("react/jsx-runtime").JSX.IntrinsicAttributes &
  import("react").ClassAttributes<HTMLInputElement> &
  import("react").InputHTMLAttributes<HTMLInputElement> {
  throw new Error("Function not implemented.");
}
function setError(arg0: string, arg1: { type: string; message: string }) {
  throw new Error("Function not implemented.");
}
