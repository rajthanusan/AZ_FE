// // import React, { useState } from "react";
// // import axios from "axios";

// // const Chatbox = () => {
// //   const [messages, setMessages] = useState([{ text: "Hello! How can I assist you?", sender: "bot" }]);
// //   const [inputText, setInputText] = useState("");

// //   const sendMessage = async (text) => {
// //     const userMessage = { text, sender: "user" };
// //     setMessages([...messages, userMessage]);

// //     try {
// //       const response = await axios.post(
// //         "https://az-be-nine.vercel.app/api/aichat/chat", // Request to your backend
// //         {
// //           message: text, // Send the user input to the backend
// //         }
// //       );

// //       const botMessage = {
// //         text: response.data.message, // The message returned by the backend
// //         sender: "bot",
// //       };

// //       setMessages([...messages, userMessage, botMessage]);
// //     } catch (error) {
// //       const errorMessage = { text: "Oops! Something went wrong.", sender: "bot" };
// //       setMessages([...messages, userMessage, errorMessage]);
// //     }
// //   };

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     if (inputText.trim()) {
// //       sendMessage(inputText);
// //       setInputText("");
// //     }
// //   };

// //   return (
// //     <div className="chatbox-container">
// //       <div className="chatbox-messages">
// //         {messages.map((message, index) => (
// //           <div key={index} className={`chatbox-message ${message.sender}`}>
// //             <span>{message.text}</span>
// //           </div>
// //         ))}
// //       </div>
// //       <form onSubmit={handleSubmit} className="chatbox-input">
// //         <input
// //           type="text"
// //           value={inputText}
// //           onChange={(e) => setInputText(e.target.value)}
// //           placeholder="Type your message..."
// //         />
// //         <button type="submit">Send</button>
// //       </form>
// //     </div>
// //   );
// // };

// // export default Chatbox;
// import React, { useState } from "react";
// import axios from "axios";
// import ReactMarkdown from "react-markdown";
// import "../style/Chatbot.css";

// function Chatbot() {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const [isLoading, setIsLoading] = useState(false);

//   const sendMessage = async (e) => {
//     e.preventDefault();
//     if (input.trim() === "") return;

//     const newMessage = { text: input, sender: "user" };
//     setMessages([...messages, newMessage]);
//     setInput("");
//     setIsLoading(true);

//     try {
//       const response = await axios.post("https://az-be-nine.vercel.app/api/aichat/chat", {
//         message: input,
//       });
//       const botMessage = { text: response.data.response, sender: "bot" };
//       setMessages((prevMessages) => [...prevMessages, botMessage]);
//     } catch (error) {
//       console.error("Error sending message:", error);
//       const errorMessage = {
//         text: "Sorry, there was an error processing your request.",
//         sender: "bot",
//       };
//       setMessages((prevMessages) => [...prevMessages, errorMessage]);
//     }

//     setIsLoading(false);
//   };

//   return (

//     <div className="chatbot-container">
//       <div className="chat-header">AI Assistant</div>
//       <div className="chat-messages">
//         {messages.map((message, index) => (
//           <div key={index} className={`message ${message.sender}`}>
//             {message.sender === "bot" ? (
//               <ReactMarkdown>{message.text}</ReactMarkdown>
//             ) : (
//               message.text
//             )}
//           </div>
//         ))}
//         {isLoading && <div className="message bot">Thinking...</div>}
//       </div>
//       <form onSubmit={sendMessage} className="chat-input-form">
//         <input
//           type="text"
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           placeholder="Type your message..."
//           className="chat-input"
//         />
//         <button type="submit" className="chat-send-button">
//           Send
//         </button>
//       </form>
//     </div>
//   );
// }

// export default Chatbot;
