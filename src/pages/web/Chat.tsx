import { useState, useRef, useEffect } from "react";
import PrimaryButton from "../../components/PrimaryButton";
import TextInput from "../../components/TextInput";
import axios from "axios";
import ConversationHistory from "../../components/ConversationHistory";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { RiSendPlaneFill } from "react-icons/ri";

type ChatMessage = {
  owner: string | null;
  content: string | null;
};

export default function Chat() {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
  };

  const sendMessage = async () => {
    if (newMessage !== "") {
      const message = { owner: "me", content: newMessage };
      try {
        await axios.post("/sendMessage", {
          message: newMessage,
        });
      } catch (error) {
        console.log(error);
      }

      setChatMessages((prevMessages) => [...prevMessages, message]);
      setNewMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  return (
    <>
      <div className="relative w-3/5 mx-auto h-full border-x-2 pt-16">
        <div className="h-5/6 px-2 overflow-y-auto">
          {chatMessages.map((message, index) => (
            <div key={index} className="flex items-center my-1 w-max">
              <p className="bg-indigo-200 rounded-lg py-1 px-2">
                {message.content}
              </p>
              <p className="flex">
                <IoCheckmarkDoneSharp className=" text-green-500" />
              </p>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="absolute bottom-0 flex w-full p-5 pt-8 border-t-2 border-gray-200 rounded-t-lg">
          <TextInput
            id="message"
            type="text"
            value={newMessage}
            name="message"
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            className="mt-1 block w-full ml-2"
            isFocused={true}
          />
          <PrimaryButton onClick={sendMessage}>
            <RiSendPlaneFill className="text-xl" />
          </PrimaryButton>
        </div>
      </div>
      <ConversationHistory />
    </>
  );
}
