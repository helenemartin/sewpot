import EthName from "./EthName";

const Account = function ({ accounts, isLoggedIn, connect }) {
  if (accounts.length > 0) {
    return <EthName address={accounts[0]} />;
  } else {
    return <button onClick={connect}>Connect</button>;
  }
};

export default Account;
