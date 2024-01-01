import { useState, useRef, useEffect, ChangeEvent, DragEvent } from "react";
import PrimaryButton from "../../components/common/PrimaryButton";
import TextInput from "../../components/common/TextInput";
import axios from "axios";
import ConversationHistory from "../../components/chat/ConversationHistory";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { RiSendPlaneFill } from "react-icons/ri";
import { CgAttachment } from "react-icons/cg";
import IconButton from "../../components/common/IconButton";
import UploadFileDragMessage from "../../components/chat/UploadFileDragMessage";
import { useNavigate } from "react-router-dom";

type ChatMessage = {
  owner: string | null;
  content: string | null;
};

export default function Chat() {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState<boolean>(false);
  const navigate = useNavigate();

  //handle change in message input
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
      } catch (error) {}

      setChatMessages((prevMessages) => [...prevMessages, message]);
      setNewMessage("");
    }
  };

  //handle when user press Enter on message input
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  };

  //when new message added it would scroll down
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  //handle when file uploaded changes before it been send
  const handleFileChange = (
    event?: ChangeEvent<HTMLInputElement> | null,
    dropFile?: File
  ) => {
    let file: File | undefined;
    if (dropFile) {
      file = dropFile;
    } else {
      file = event?.target.files?.[0];
    }

    if (file) {
      console.log("Selected file:", file.name);
    }
  };

  //when Attach button clicked it will trigger the file input
  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (!event.currentTarget.contains(event.relatedTarget as Node)) {
      setIsDragOver(false);
    }
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragOver(false);
    if (event.dataTransfer.files && event.dataTransfer.files?.[0]) {
      const file = event.dataTransfer.files[0];
      handleFileChange(null, file);
    }
  };

  const selectChat = (userId: number) => {
    setChatMessages([]);
    navigate(`/chat?user_id=${userId}`, { replace: true });
  };

  return (
    <>
      <div className="relative w-3/5 mx-auto h-full border-x-2 pt-16">
        <div
          className="h-5/6 px-2 overflow-y-auto"
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
        >
          {isDragOver && <UploadFileDragMessage onDrop={handleDrop} />}
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

          <input
            type="file"
            className="hidden"
            ref={fileInputRef}
            onChange={handleFileChange}
          />
          <IconButton onClick={handleButtonClick}>
            <CgAttachment className="text-xl" />
          </IconButton>
          <PrimaryButton onClick={sendMessage}>
            <RiSendPlaneFill className="text-xl" />
          </PrimaryButton>
        </div>
      </div>
      <ConversationHistory selectChat={selectChat} />
    </>
  );
}
