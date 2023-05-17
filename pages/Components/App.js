import React, { useState } from "react";
const App = () => {
  const [stream, setStream] = useState();

  const handleSuccess = (stream) => {
    setStream(stream);
  };

  const handleError = (error) => {
    console.log("Error getting user media:", error);
  };

  const requestMedia = () => {
    getUserMedia({
      audio: true,
      video: true,
    })
      .then(handleSuccess)
      .catch(handleError);
  };

  return (
    <div>
      <button onClick={requestMedia}>Request Media</button>
      {stream && (
        <video autoPlay controls src={stream} />
      )}
    </div>
  );
};

export default App;
