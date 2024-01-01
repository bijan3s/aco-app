import React from "react";
import { CgAttachment } from "react-icons/cg";

interface UploadFileDragMessageProps {
  onDrop: (event: React.DragEvent<HTMLDivElement>) => void;
}

const UploadFileDragMessage: React.FC<UploadFileDragMessageProps> = ({
  onDrop,
}) => {
  return (
    <div
      className="w-auto flex h-2/3 text-center items-center rounded-lg shadow-lg m-16 border-2 border-gray-200 "
      onDrop={onDrop}
    >
      <div className="mx-auto text-gray-500">
        شما می توانید فایل خود را در اینجا قرار دهید تا آپلود شود.
        <div className="flex justify-center items-center pt-10">
          <CgAttachment className="text-gray-500 text-3xl" />
        </div>
      </div>
    </div>
  );
};

export default UploadFileDragMessage;
