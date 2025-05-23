import {
  React,
  useState,
  useCallback,
  ActivityIndicator,
  GiftedChat,
  Send,
  MessageText,
  Bubble,
  SystemMessage,
  Message,
  useQuery,
  useMutation,
  GET_MESSAGES,
  POST_MESSAGE,
  GetData,
  RFPercentage,
  Text,
  wp,
  hp,
  AVATAR,
} from "../api/constants";

function Chat({ userUUID, driverUUID, uuidTrip }) {
  const [userID, setUserID] = useState(null);
  const { data, loading, error, stopPolling } = useQuery(GET_MESSAGES, {
    variables: {
      uuidtrip: uuidTrip,
      uuid: userUUID,
    },
   /*  pollInterval: 1000, */
    notifyOnNetworkStatusChange: true,
    onCompleted: () => {
      setMessages(data.messages);
    },
  });
  const [
    postMessage,
    { called, error: ERROR, loading: LOADING, data: DATA },
  ] = useMutation(POST_MESSAGE, { refetchQueries: { GET_MESSAGES } });
  const [messages, setMessages] = useState([]);
  const onSend = useCallback((messages = []) => {
    postMessage({
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

  return (
    <GiftedChat
      keyboardShouldPersistTaps='always'
      onLoadEarlier={() => {
        <ActivityIndicator />;
      }}
      isKeyboardInternallyHandled={true}
      inverted={false}
      /* renderCustomView={() => (
        <View style={{ backgroundColor: "red" }}>
          <Text>Custom View Right here</Text>
        </View>
      )} */
      renderMessage={(props) => (
        <Message
          {...props}
          containerStyle={{
            left: {},
            right: {},
          }}
        />
      )}
      renderMessageText={(props) => (
        <MessageText
          {...props}
          containerStyle={{
            left: {
              alignItems: "flex-start",
              width: wp(40),
            },
            right: {
              /* backgroundColor: "red", */
              alignItems: "flex-end",
              width: wp(40),
            },
          }}
          textStyle={{
            left: { color: "black" },
            right: { color: "#6c63ff" },
          }}
          linkStyle={{
            left: { color: "orange" },
            right: { color: "orange" },
          }}
          customTextStyle={{
            fontSize: RFPercentage(2),
          }}
        />
      )}
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
        <AVATAR
          {...props}
          containerStyle={{
            left: { borderWidth: 1, borderRadius: wp(20) },
            right: {},
          }}
          imageStyle={{
            left: {},
            right: {},
          }}
        />
      )}
      renderBubble={(props) => (
        <Bubble
          {...props}
          /* renderTime={() => (
            <Text
              style={{
                fontSize: RFPercentage(1.5),
                color: "gray",
              }}
            >
              {props.currentMessage.createdAt.split(" ")[1].split(":")[0]} :{" "}
              {props.currentMessage.createdAt.split(" ")[1].split(":")[1]}
            </Text>
          )} */
          // renderTicks={() => <Text>Ticks</Text>}
          containerStyle={{
            left: {},
            right: {},
          }}
          wrapperStyle={{
            left: {},
            right: { backgroundColor: "#f2f2f2" },
          }}
          bottomContainerStyle={{
            left: {},
            right: {},
          }}
          tickStyle={{}}
          usernameStyle={{ color: "tomato", fontWeight: "100" }}
          containerToNextStyle={{
            left: { borderColor: "navy" },
            right: {},
          }}
          containerToPreviousStyle={{
            left: {},
            right: {},
          }}
        />
      )}
      renderSend={(props) => {
        return (
          <Send
            {...props}
            containerStyle={{
              height: hp(5),
              borderWidth: null,
              flex: 0.5,
              borderRadius: wp(20),
              justifyContent: "center",
              backgroundColor: "#6c63ff",
              alignSelf: "center",
              marginBottom: hp(1),
              marginRight: wp(1),
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
        borderWidth: wp(0.5),
        borderTopColor: "#6c63ff",
        backgroundColor: "#f2f2f2",
        height: hp(6),
        /* marginBottom: hp(0.5), */
      }}
      messages={messages}
      onSend={(messages) => {
        onSend(messages);
      }}
    />
  );
}

export default Chat;
