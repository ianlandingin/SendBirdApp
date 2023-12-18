// import React, { useEffect } from "react";
// import SendbirdApp from "@sendbird/uikit-react/App";
import SendbirdProvider from "@sendbird/uikit-react/SendbirdProvider";
// import SendbirdChat from "@sendbird/chat";
// import EditUserProfile from "@sendbird/uikit-react/EditUserProfile";
import { EditUserProfileProvider } from "@sendbird/uikit-react/EditUserProfile/context";
import "@sendbird/uikit-react/dist/index.css";
import ChatApp from "./ChatApp";

const APP_ID = import.meta.env.VITE_APP_ID;
const USER_ID = import.meta.env.VITE_USER_ID;
const NICKNAME = import.meta.env.VITE_NICKNAME;
const ACCESS_TOKEN = import.meta.env.VITE_ACCESS_TOKEN;
console.log(
  document.getElementsByClassName("sendbird-channel-header__title")[0]
);

const App = () => {
  return (
    <div className="App">
      <SendbirdProvider
        appId={APP_ID}
        userId={USER_ID}
        nickname={NICKNAME}
        theme="dark"
        accessToken={ACCESS_TOKEN}
      >
        <ChatApp />
        <EditUserProfileProvider></EditUserProfileProvider>
      </SendbirdProvider>
    </div>
  );
};

export default App;
