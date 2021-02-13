import React, { useState, useCallback, useEffect } from "react";
import { ActivityIndicator } from "react-native";
import {
  GiftedChat,
  Send,
  MessageText,
  Bubble,
  Avatar,
  SystemMessage,
  Message,
} from "react-native-gifted-chat";
import { useQuery, useMutation } from "@apollo/client";
import { GET_MESSAGES, POST_MESSAGE } from "../../src/utilites/Queries";
import { GetData } from "../utilites/GFunctions";
import { RFPercentage } from "react-native-responsive-fontsize";
import { Text, View } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
function Chat({ userUUID, driverUUID, uuidTrip }) {
  const [userID, setUserID] = useState(null);
  const { data, loading, error, stopPolling } = useQuery(GET_MESSAGES, {
    variables: {
      uuidtrip: uuidTrip,
      uuid: userUUID,
    },
    pollInterval: 500,
    notifyOnNetworkStatusChange: true,
    onCompleted: () => {
      setMessages(data.messages);
    },
  });
  const [
    PostMessage,
    { called, error: ERROR, loading: LOADING, data: DATA },
  ] = useMutation(POST_MESSAGE, { refetchQueries: { GET_MESSAGES } });
  const [messages, setMessages] = useState([]);
  const onSend = useCallback((messages = []) => {
    console.log(messages[0].text, userUUID, uuidTrip);

    PostMessage({
      variables: {
        text: messages[0].text,
        uuid: userUUID,
        uuidtrip: uuidTrip,
      },
    });
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
  }, []);
  React.useEffect(() => {
    GetData("userID").then((value) => setUserID(JSON.parse(value)));
  }, []);
  /* React.useEffect(() => {
    return () => {
      stopPolling();
    };
  }); */
  return (
    <GiftedChat
      keyboardShouldPersistTaps={true}
      onLoadEarlier={() => {
        <ActivityIndicator />;
      }}
      isKeyboardInternallyHandled={true}
      inverted={false}
      renderMessage={(props) => (
        <Message
          {...props}
          // renderDay={() => <Text>Date</Text>}
          containerStyle={{
            left: { backgroundColor: "lime", marginBottom: hp(5) },
            right: { backgroundColor: "gold", marginBottom: hp(5) },
          }}
        />
      )}
      /* renderMessageText={(props) => (
        <MessageText
          {...props}
          containerStyle={{
            left: { backgroundColor: "yellow" },
            right: { backgroundColor: "purple" },
          }}
          textStyle={{
            left: { color: "red" },
            right: { color: "green" },
          }}
          linkStyle={{
            left: { color: "orange" },
            right: { color: "orange" },
          }}
          customTextStyle={{ fontSize: RFPercentage(3), lineHeight: wp(1) }}
        />
      )} */
      /* renderAccessory={() => (
        <View
          style={{
            flex: 1,
            backgroundColor: "red",
            borderRadius: wp(20),
            top: hp(2),
          }}
        ></View>
      )} */
      /* renderSystemMessage={(props) => (
        <SystemMessage
          {...props}
          containerStyle={{ backgroundColor: "pink" }}
          wrapperStyle={{ borderWidth: 10, borderColor: "yellow" }}
          textStyle={{ color: "crimson", fontWeight: "900" }}
        />
      )} */
      user={{ _id: userID }}
      renderAvatar={(props) => (
        <Avatar
          {...props}
          containerStyle={{
            left: { borderWidth: 3, borderColor: "red" },
            right: {},
          }}
          imageStyle={{
            left: { borderWidth: 3, borderColor: "blue" },
            right: {},
          }}
        />
      )}
      renderBubble={(props) => (
        <Bubble
          {...props}
          // renderTime={() => <Text>Time</Text>}
          // renderTicks={() => <Text>Ticks</Text>}
          containerStyle={{
            left: {
              borderColor: "red",
              borderWidth: wp(1.5),
            },
            right: {
              borderColor: "blue",
              borderWidth: wp(1.5),
            },
          }}
          wrapperStyle={{
            left: {
              borderColor: "tomato",
              borderWidth: 4,
            },
            right: {
              borderColor: "tomato",
              borderWidth: 4,
              backgroundColor: "transparent",
            },
          }}
          bottomContainerStyle={{
            left: { borderColor: "purple", borderWidth: 4 },
            right: {},
          }}
          tickStyle={{}}
          usernameStyle={{ color: "tomato", fontWeight: "100" }}
          containerToNextStyle={{
            left: { borderColor: "navy", borderWidth: 4 },
            right: {},
          }}
          containerToPreviousStyle={{
            left: { borderColor: "mediumorchid", borderWidth: 4 },
            right: {},
          }}
        />
      )}
      renderSend={(props) => {
        return (
          <Send
            {...props}
            containerStyle={{
              margin: wp(0.5),
              borderWidth: null,
              flex: 0.5,
              borderRadius: wp(20),
              justifyContent: "center",
              backgroundColor: "#6c63ff",
            }}
          >
            <Text
              style={{
                alignSelf: "center",
                color: "white",
                fontWeight: "bold",
                fontSize: RFPercentage(3),
              }}
            >
              Send
            </Text>
          </Send>
        );
      }}
      renderAvatarOnTop
      placeholder={"Chat with driver..."}
      isTyping={true}
      containerStyle={{
        borderRadius: wp(20),
        borderColor: "#6c63ff",
        borderWidth: wp(2),
        borderTopColor: "#6c63ff",
        backgroundColor: "#f2f2f2",
      }}
      style={{ backgrondColor: "green" }}
      messages={messages}
      onSend={(messages) => {
        onSend(messages);
      }}
    />
  );
}

export default Chat;
