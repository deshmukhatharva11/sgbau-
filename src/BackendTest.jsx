import { useEffect, useState } from "react";

function BackendTest() {
  const [backendMessage, setBackendMessage] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/hello/")
      .then((res) => res.json())
      .then((data) => {
        setBackendMessage(data.message);
      })
      .catch((err) => {
        console.error("Backend not connected:", err);
      });
  }, []);

  return (
    <div>
      <h1>React + Django Test</h1>
      <p>Message from Backend: {backendMessage}</p>
    </div>
  );
}

export default BackendTest;
