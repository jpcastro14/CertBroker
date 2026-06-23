type AlertComponentProps = {
  open: boolean;
  message?: string;
  setOpen?: React.MouseEventHandler<HTMLButtonElement>;
};

export function AlertComponent({
  open,
  message,
  setOpen,
}: AlertComponentProps) {
  return (
    <dialog id="AlreadyOnRowAlert" className="modal" open={open}>
      <div className="modal-box bg-white ">
        <h3 className="font-bold text-lg text-slate-600">Ops!</h3>
        <p className="py-4 text-slate-500 ">
          {message || "O corretor ja está na fila de atendimento"}
        </p>
        <div className="modal-action">
          <form method="dialog">
            <button className="btn btn-error" onClick={setOpen}>
              Fechar
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
}
