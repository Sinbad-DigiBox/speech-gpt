import React from "react";
interface Props {
  type: number;
  message: string;
}
export default function Message({ type, message }: Props) {
  return (
    <>
      {type === 1 ? (
        <div className="mr-auto w-10/12 rounded-3xl rounded-tl-none bg-white px-4 py-3 text-xl text-sky-900">
          {message}
        </div>
      ) : (
        <div className="ml-auto w-8/12 rounded-3xl rounded-br-none bg-sky-900 px-4 py-3 text-xl text-white">
          {message}
        </div>
      )}
    </>
  );
}
