import "./App.css";
import Creator from "./components/Creator";
import { AgoraRTCProvider } from "agora-rtc-react";
import { config, useRTCClient } from "./common/rtc-config";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Audience from "./components/Audience";
import Landing from "./components/Landing";

function App() {
  const rtc__client = useRTCClient(config);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route
          path="/creator"
          element={
            <AgoraRTCProvider value={rtc__client}>
              <Creator rtc__client={rtc__client} />
            </AgoraRTCProvider>
          }
        />
        <Route
          path="/audi"
          element={
            <AgoraRTCProvider client={rtc__client}>
              <Audience rtc__client={rtc__client} />
            </AgoraRTCProvider>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
