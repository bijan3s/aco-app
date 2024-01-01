interface ConversationHistoryProps {
  selectChat: (userId: number) => void;
}
const ConversationHistory: React.FC<ConversationHistoryProps> = ({
  selectChat,
}) => {
  return (
    <>
      <div className="absolute w-1/5 top-0 right-0">
        <button
          className="w-full flex border-2 border-gray-200 rounded-lg p-5 my-1 items-center hover:shadow-xl hover:border-indigo-600 transition-all duration-300"
          onClick={() => selectChat(12)}
        >
          <div className=" text-center pl-2 w-1/2 text-green-500 text-base">
            online
          </div>
          <div className="text-center pl-2 w-1/4">Clone</div>
          <div className="text-center w-1/4">
            <img
              src="https://th.bing.com/th/id/OIP._BJIyi7vgdT1CQgBdT4mfQHaLD?w=204&h=305&c=7&r=0&o=5&dpr=1.3&pid=1.7"
              className="rounded-full h-14 w-14 object-cover"
            />
          </div>
        </button>

        <button
          className="w-full flex border-2 border-gray-200 rounded-lg p-5 my-1 items-center hover:shadow-xl hover:border-indigo-600 transition-all duration-300"
          onClick={() => selectChat(7)}
        >
          <div className=" text-center pl-2 w-1/2 text-gray-500 text-opacity-70 text-sm">
            last seen recently
          </div>
          <div className="text-center pl-2 w-1/4">Hybrid</div>
          <div className="text-center w-1/4">
            <img
              src="https://th.bing.com/th/id/OIP.wIv0fSnikn6517xcB7XOugHaKZ?w=126&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
              className="rounded-full h-14 w-14 object-cover"
            />
          </div>
        </button>
      </div>
    </>
  );
};

export default ConversationHistory;
