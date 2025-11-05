import { useState } from "react";
import { useAuth } from "../../contexts/authProvider/useAuth";
import { faAddressCard } from "@fortawesome/free-regular-svg-icons/faAddressCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
        <div className="modal-box w-80 max-w-5xl">
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">Click the button below to close</p>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button, it will close the modal */}
              <button
                className="btn btn-error mx-4 "
                onClick={() => auth.logout()}
              >
                Sair
              </button>
              <button
                className="btn btn-success"
                onClick={() => setOpen(!open)}
              >
                Cancelar
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}
