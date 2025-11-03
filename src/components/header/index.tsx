import { useAuth } from "../../contexts/authProvider/useAuth";

export function Header() {
  const auth = useAuth();
  return (
    <>
      <div className=" w-full bg-blue-950 justify-center flex h-20 px-5 ">
        <div className="w-full max-w-7xl flex justify-between items-center text-white ">
          <h4 className="font-medium text-2xl ">SureBroker</h4>
          {auth.email && (
            <button className="btn btn-warning" onClick={auth.logout}>
              Deslogar
            </button>
          )}
        </div>
      </div>
    </>
  );
}
