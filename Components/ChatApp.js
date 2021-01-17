import React, { useState, useCallback, useEffect } from "react";
import { GiftedChat, Send } from "react-native-gifted-chat";
import { Text, View } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
function Chat() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([
      /* {
        _id: 1,
        text: "Hello developer",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "React Native",
          avatar: "https://placeimg.com/140/140/any",
        },
      }, */
    ]);
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
  }, []);

  return (
    <GiftedChat
      renderSend={(props) => {
        return (
          <Send
            {...props}
            containerStyle={{
              borderWidth: null,
              flex: 0.5,
              backgroundColor: "red",
              borderRadius: wp(20),
              justifyContent: "center",
            }}
          >
            <Text style={{ alignSelf: "center" }}>Send</Text>
          </Send>
        );
      }}
      containerStyle={{
        borderRadius: wp(20),
        borderColor: "#6c63ff",
        borderWidth: wp(2),
        borderTopColor: "#6c63ff",
        backgroundColor: "#f2f2f2",
      }}
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: 1,
      }}
      scrollToBottom={true}
      scrollToBottomStyle={{ borderWidth: 6 }}
      scrollToBottomComponent={() => {}}
    />
  );
}

export default Chat;
