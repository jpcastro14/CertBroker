import { useState } from "react";
import { useAuth } from "../../contexts/authProvider/useAuth";

export function Header() {
  const [open, setOpen] = useState(false);
  const auth = useAuth();
  return (
    <>
      <div className=" w-full bg-blue-950 justify-center flex h-20 px-5">
        <div className="w-full max-w-7xl flex justify-between items-center text-white ">
          <h4 className="font-medium text-2xl xl:text-6xl ">SureBroker</h4>
          {auth.email && (
            <button className="btn btn-warning" onClick={() => setOpen(!open)}>
              Deslogar
            </button>
          )}
        </div>
      </div>

      <dialog id="my_modal_4" className="modal" open={open}>
        <div className="modal-box w-80 max-w-5xl absolute right-15 top-15 ">
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">Click the button below to close</p>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button, it will close the modal */}
              <button className="btn" onClick={() => setOpen(!open)}>
                Close
              </button>
              <button className="btn" onClick={() => setOpen(!open)}>
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}
