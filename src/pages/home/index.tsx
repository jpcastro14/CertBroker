import { faAddressBook } from "@fortawesome/free-regular-svg-icons/faAddressBook";
import { faMoneyBill1 } from "@fortawesome/free-regular-svg-icons/faMoneyBill1";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function Home() {
  return (
    <>
      <h2 className="max-w-7xl text-black text-xl mt-10 pl-4 mx-4">
        Fila de corretores
      </h2>
      <div
        id="CardContainer"
        className=" w-full max-w-7xl mx-auto flex flex-col items-center sm:grid-cols-2 lg:grid-cols-3 md:grid grid-cols-4 xl:grid-cols-4"
      >
        <div
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
              <img
                src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
                alt="Movie"
                className="w-20 h-20 btn btn-circle object-cover"
              ></img>
            </div>
            <div
              id="CardInfo"
              className=" min-w-44 min-h-72 max-w-44 card-body pl-2 bg-white text-black"
            >
              <span
                id="CardAdvise"
                className="absolute rounded-full bg-warning p-1 -top-3 right-2"
              >
                <p className="text-slate-">Corretor da vez</p>
              </span>

              <h2 id="CardTitle" className="card-title">
                Silvio Rodrigues
              </h2>
              <span
                id="CardTeam"
                className="border border-success rounded-full pl-1 flex justify-center "
              >
                Equipe Breno
              </span>
              <div id="CardSales" className="card-actions justify-start">
                <span className=" rounded px-1 flex flex-col bg-slate-50 w-full justify-center ">
                  <p className="text-xl">Vendas: 4 </p>
                  <p className="text-slate-400 border-b">Le Parc - 12/10 </p>
                  <p className="text-slate-400 border-b">Bothanic - 08/01 </p>
                  <p className="text-slate-400 border-b">Urban Life - 31/10</p>
                  <p className="text-slate-400 border-b">Urban Life - 22/04</p>
                </span>
              </div>
              <div
                id="profileActions"
                className=" w-full mt-4 grid grid-cols-2 gap-1 justify-evenly"
              >
                <button className="btn btn-warning">
                  Info
                  <FontAwesomeIcon icon={faAddressBook} />
                </button>
                <button className="btn btn-success">
                  Venda
                  <FontAwesomeIcon icon={faMoneyBill1} />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div
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
              <img
                src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
                alt="Movie"
                className="w-20 h-20 btn btn-circle object-cover"
              ></img>
            </div>
            <div
              id="CardInfo"
              className=" min-w-44 min-h-72 max-w-44 card-body pl-2 bg-white text-black"
            >
              <span
                id="CardAdvise"
                className="absolute rounded-full bg-warning p-1 -top-3 right-2"
              >
                <p className="text-slate-">Corretor da vez</p>
              </span>

              <h2 id="CardTitle" className="card-title">
                Silvio Rodrigues
              </h2>
              <span
                id="CardTeam"
                className="border border-success rounded-full pl-1 flex justify-center "
              >
                Equipe Breno
              </span>
              <div id="CardSales" className="card-actions justify-start">
                <span className=" rounded px-1 flex flex-col bg-slate-50 w-full justify-center ">
                  <p className="text-xl">Vendas: 4 </p>
                  <p className="text-slate-400 border-b">Le Parc - 12/10 </p>
                  <p className="text-slate-400 border-b">Bothanic - 08/01 </p>
                  <p className="text-slate-400 border-b">Urban Life - 31/10</p>
                  <p className="text-slate-400 border-b">Urban Life - 22/04</p>
                </span>
              </div>
              <div
                id="profileActions"
                className=" w-full mt-4 grid grid-cols-2 gap-1 justify-evenly"
              >
                <button className="btn btn-warning">
                  Info
                  <FontAwesomeIcon icon={faAddressBook} />
                </button>
                <button className="btn btn-success">
                  Venda
                  <FontAwesomeIcon icon={faMoneyBill1} />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div
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
              <img
                src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
                alt="Movie"
                className="w-20 h-20 btn btn-circle object-cover"
              ></img>
            </div>
            <div
              id="CardInfo"
              className=" min-w-44 min-h-72 max-w-44 card-body pl-2 bg-white text-black"
            >
              <span
                id="CardAdvise"
                className="absolute rounded-full bg-warning p-1 -top-3 right-2"
              >
                <p className="text-slate-">Corretor da vez</p>
              </span>

              <h2 id="CardTitle" className="card-title">
                Silvio Rodrigues
              </h2>
              <span
                id="CardTeam"
                className="border border-success rounded-full pl-1 flex justify-center "
              >
                Equipe Breno
              </span>
              <div id="CardSales" className="card-actions justify-start">
                <span className=" rounded px-1 flex flex-col bg-slate-50 w-full justify-center ">
                  <p className="text-xl">Vendas: 4 </p>
                  <p className="text-slate-400 border-b">Le Parc - 12/10 </p>
                  <p className="text-slate-400 border-b">Bothanic - 08/01 </p>
                  <p className="text-slate-400 border-b">Urban Life - 31/10</p>
                  <p className="text-slate-400 border-b">Urban Life - 22/04</p>
                </span>
              </div>
              <div
                id="profileActions"
                className=" w-full mt-4 grid grid-cols-2 gap-1 justify-evenly"
              >
                <button className="btn btn-warning">
                  Info
                  <FontAwesomeIcon icon={faAddressBook} />
                </button>
                <button className="btn btn-success">
                  Venda
                  <FontAwesomeIcon icon={faMoneyBill1} />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div
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
              <img
                src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
                alt="Movie"
                className="w-20 h-20 btn btn-circle object-cover"
              ></img>
            </div>
            <div
              id="CardInfo"
              className=" min-w-44 min-h-72 max-w-44 card-body pl-2 bg-white text-black"
            >
              <span
                id="CardAdvise"
                className="absolute rounded-full bg-warning p-1 -top-3 right-2"
              >
                <p className="text-slate-">Corretor da vez</p>
              </span>

              <h2 id="CardTitle" className="card-title">
                Silvio Rodrigues
              </h2>
              <span
                id="CardTeam"
                className="border border-success rounded-full pl-1 flex justify-center "
              >
                Equipe Breno
              </span>
              <div id="CardSales" className="card-actions justify-start">
                <span className=" rounded px-1 flex flex-col bg-slate-50 w-full justify-center ">
                  <p className="text-xl">Vendas: 4 </p>
                  <p className="text-slate-400 border-b">Le Parc - 12/10 </p>
                  <p className="text-slate-400 border-b">Bothanic - 08/01 </p>
                  <p className="text-slate-400 border-b">Urban Life - 31/10</p>
                  <p className="text-slate-400 border-b">Urban Life - 22/04</p>
                </span>
              </div>
              <div
                id="profileActions"
                className=" w-full mt-4 grid grid-cols-2 gap-1 justify-evenly"
              >
                <button className="btn btn-warning">
                  Info
                  <FontAwesomeIcon icon={faAddressBook} />
                </button>
                <button className="btn btn-success">
                  Venda
                  <FontAwesomeIcon icon={faMoneyBill1} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
