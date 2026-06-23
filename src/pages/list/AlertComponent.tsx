import { useContext } from "react";
import { BrokerContext } from "../../contexts/brokerProvider";

type AlertComponentProps = {
  message?: string;
};

export function AlertComponent({ message }: AlertComponentProps) {
  const { open, setOpen } = useContext(BrokerContext);

  return (
    <dialog id="AlreadyOnRowAlert" className="modal" open={open}>
      <div className="modal-box bg-white ">
        <h3 className="font-bold text-lg text-slate-600">Ops!</h3>
        <p className="py-4 text-slate-500 ">
          {message || "O corretor ja está na fila de atendimento"}
        </p>
        <div className="modal-action">
          <form method="dialog">
            <button className="btn btn-error" onClick={() => setOpen(!open)}>
              Fechar
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
}
