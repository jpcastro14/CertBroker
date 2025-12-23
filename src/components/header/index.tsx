import { useState } from "react";
import { useAuth } from "../../contexts/authProvider/useAuth";
import { faAddressCard } from "@fortawesome/free-regular-svg-icons/faAddressCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router";

export function Header() {
  const [open, setOpen] = useState(false);
  const auth = useAuth();
  return (
    <>
      <div className=" w-full  bg-blue-800 drop-shadow-2xl   justify-center flex h-20 px-5">
        <div className="w-full max-w-7xl flex justify-between items-center text-white ">
          <h4 className="font-light text-2xl">SureBroker</h4>
          {auth.email && (
            <button className="btn btn-circle " onClick={() => setOpen(!open)}>
              <FontAwesomeIcon icon={faAddressCard} />
            </button>
          )}
        </div>
      </div>

      <dialog
        id="my_modal_4"
        className="modal"
        open={open}
        onClose={() => setOpen(!open)}
      >
        <div className="modal-box w-100 max-w-5xl">
          <h3 className="font-semibold text-lg  w-full bg-slate-100 rounded p-2">
            Menu
          </h3>
          <div className="modal-action flex  items-stretch">
            {/* if there is a button, it will close the modal */}
            <Link to="/admin">
              <button
                className="btn btn-primary"
                onClick={() => setOpen(!open)}
              >
                Administrador
              </button>
            </Link>

            <button className="btn btn-warning" onClick={() => auth.logout()}>
              Sair
            </button>
            <button className="btn btn-success" onClick={() => setOpen(!open)}>
              Cancelar
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}
