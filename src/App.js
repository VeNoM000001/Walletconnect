import "./App.css";
import { useChain, useMoralis } from "react-moralis";

function App() {
  const {isAuthenticated,authenticate,user,logout}=useMoralis();
  const {chain} =useChain();
  const walletconnectAuth=async ()=>
  {
    try 
    {
      await authenticate({
        provider:"walletConnect",
        signingMessage:"Auth required",
      });
    }
     catch (error) 
    {
      console.error(error) ; 
    }
  };
  const metamaskAuth=async ()=>
  {
    try 
    {
      await authenticate({
        provider:"metamask",
        signingMessage:"Auth required",
      });
    }
     catch (error) 
    {
      console.error(error) ; 
    }
  };
  const logoutWallet = async ()=>
  {
    try
    {
      await logout();
    }
    catch(error)
    {
      console.error(error);
    }
  };
    return(
      <div className="w-screen h-screen flex flex-col py-20 items-center bg-gradient-to-br from-blue-200 to-blue-500">
        {!isAuthenticated ? (
          <>
            <button className="bg-white hover:bg-grey-200 text-blue-500 text2xl font-bold px-6 py-2 rounded-md transform duration-300 walletConnect" onClick={walletconnectAuth}>connect to walletconnect</button>
            <br />
            <button className="bg-white hover:bg-grey-200 text-blue-500 text2xl font-bold px-6 py-2 rounded-md transform duration-300 metamask" onClick={metamaskAuth}>connect to metamask</button>
          </>
        ) : (
        <div>
        <p>Wallet address:{user.get('ethAddress')}</p>
        <p>Chain:{chain?.name}</p>
        <button onClick={logoutWallet} className="bg-white hover:bg-grey-200 text-blue-500 text2xl font-bold px-6 py-2 rounded-md transform duration-300">logout </button>
        </div>
        )}
      </div>
    )
}
export default App;
