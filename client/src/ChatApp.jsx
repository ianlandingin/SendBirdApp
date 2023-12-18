import { useState } from "react";
import ChannelList from "@sendbird/uikit-react/ChannelList";
import Channel from "@sendbird/uikit-react/Channel";
import ChannelSettings from "@sendbird/uikit-react/ChannelSettings";

const ChatApp = () => {
  const [currentChannel, setCurrentChannel] = useState(null);
  const currentChannelUrl = currentChannel ? currentChannel.url : "";
  const [showSettings, setShowSettings] = useState(false);
  var channelChatDiv = document.getElementsByClassName("channel-chat")[0];

  const renderSettingsBar = () => {
    channelChatDiv.style.width = "100%";
    channelChatDiv.style.cssFloat = "left";
  };

  const hideSettingsBar = () => {
    channelChatDiv.style.width = "100%";
    channelChatDiv.style.cssFloat = "right";
  };

  return (
    <div className="channel-wrap">
      <div className="channel-list">
        <ChannelList
          onChannelSelect={(channel) => {
            setCurrentChannel(channel);
          }}
        />
      </div>
      <div className="channel-chat">
        <Channel
          channelUrl={currentChannelUrl}
          onChatHeaderActionClick={() => {
            setShowSettings(!showSettings);
            renderSettingsBar();
          }}
        />
      </div>
      {showSettings && (
        <div className="channel-settings">
          <ChannelSettings
            channelUrl={currentChannelUrl}
            onCloseClick={() => {
              setShowSettings(false);
              hideSettingsBar();
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ChatApp;
