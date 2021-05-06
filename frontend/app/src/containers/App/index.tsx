import { FC, CSSProperties } from "react";

export interface AppProps {
  rootStyle?: CSSProperties;
}

export const App: FC<AppProps> = ({ children, rootStyle }) => {
  return <div style={{ ...rootStyle }}>{children}</div>;
};

App.defaultProps = {
  rootStyle: {
    minHeight: "100%",
    display: "flex",
    flexDirection: "column",
    position: "relative",
  },
};

export default App;

// import React from "react";
// import logo from "icons/logo.svg";
// import "./App.css";

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.tsx</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
