export function Home() {
  return (
    <>
      <h2 className="text-black text-xl mt-10 pl-4 mx-4">Fila de corretores</h2>
      <div
        id="CardWrapper"
        className=" w-full flex flex-col items-center md:grid grid-cols-3"
      >
        <div className=" min-w-l max-w-xl justify-self-center mt-10 mx-2">
          <div className="w-full max-w-94  card card-side bg-base-300 shadow-sm">
            <figure>
              <img
                src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
                alt="Movie"
              />
            </figure>
            <div
              id="CardInfo"
              className=" min-w-44 min-h-72 max-w-44 card-body pl-2 bg-white text-black border rounded  "
            >
              <span className="absolute rounded-full bg-warning p-1 -top-3 right-2">
                <p className="text-black">Corretor da vez</p>
              </span>
              <h2 className="card-title">Silvio Rodrigues</h2>
              <span className="border border-success rounded-full pl-1 flex justify-center ">
                Equipe Breno
              </span>
              <div className="card-actions justify-start">
                <span className=" rounded p-1 flex flex-col justify-center ">
                  <p className="text-xl">Vendas: 4 </p>
                  <p className="text-slate-400 border-b">Le Parc </p>
                  <p className="text-slate-400 border-b">Bothanic </p>
                  <p className="text-slate-400 border-b">Urban Life</p>
                  <p className="text-slate-400 border-b">Urban Life</p>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className=" min-w-l max-w-xl justify-self-center mt-10 mx-2">
          <div className="card w-full max-w-94 card-side bg-base-300 shadow-sm">
            <figure>
              <img
                src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
                alt="Movie"
              />
            </figure>
            <div
              id="CardInfo"
              className="  min-w-44 min-h-72 max-w-44 card-body pl-2 bg-white text-black border rounded  "
            >
              <h2 className="card-title">Bethania lalalala</h2>
              <span className="border border-error rounded-full pl-1 flex justify-center ">
                Equipe Mara
              </span>
              <div className="card-actions justify-start">
                <span className=" rounded p-1 flex flex-col justify-center ">
                  <p className="text-xl">Vendas: 2 </p>
                  <p className="text-slate-400 border-b">Le Parc - 12/04 </p>
                  <p className="text-slate-400 border-b">Bothanic </p>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
