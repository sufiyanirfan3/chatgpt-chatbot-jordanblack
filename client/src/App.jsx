import { useState } from "react";
import reactLogo from "./assets/react.svg";
import chatLogo from "./assets/chat.jpeg";
import userLogo from "./assets/user.png";
import recipeGif from "./assets/gif.gif";
import "./App.css";
import { useRef } from "react";
import axios from "axios";

const YOU = "you";
const AI = "ai";
function App() {
  const inputRef = useRef();
  const [qna, setQna] = useState([
    // { from: YOU, value: "FROM ME" },
    // { from: AI, value: ["1 MESSG FROM AI", "2 MESSG FROM AI"] },
  ]);
  const write = (i) => {
    var a = document.getElementsByClassName("question")[i].innerHTML;
    document.getElementsByClassName("in")[0].value = a;
    handleSend();
    // document.getElementsByClassName("in")[0].value="";
    // inputRef.current.value=a
  };

  const [loading, setLoading] = useState(false);
  const updateQna = (from, value) => {
    setQna((qna) => [...qna, { from, value }]);
  };
  const handleSend = () => {
    const question = inputRef.current.value;
    updateQna(YOU, question);
    // setQna([...qna, { from: YOU, value: question }]);
    // console.log({question})
    setLoading(true);
    axios
      .post("http://localhost:3000/chat", {
        question,
      })
      .then((response) => {
        updateQna(AI, response.data.answer);
        if (response) {
          // window.setInterval(function () {
          var elem = document.getElementById("chats");
          if (elem) {
            console.log(elem.scrollHeight);
            elem.scrollTop = elem.scrollHeight*2;
          }
          // }, 1000);
        }
      })
      .finally(() => {
        setLoading(false);
      });
    document.getElementsByClassName("in")[0].value = "";
  };

  const renderContent = (qna) => {
    const value = qna.value;
    if (Array.isArray(value)) {
      return value.map((v) => <p className="message-text">{v}</p>);
    }
    return <p className="message-text">{value}</p>;
  };
  return (
    <>
    <main class="main-container">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <div class="container">
              <div>
                {/* <img
                  src={webLogo}
                  alt=""
                  width="200px"
                  height="50px"
                  // class="avtar"
                /> */}
                <div class="chats" id="chats">
                  {qna.map((qna) => {
                    if (qna.from == YOU) {
                      return (
                        <div class="send chat">
                          <img src={userLogo} alt="" class="avtar" />
                          <p>{renderContent(qna)}</p>
                        </div>
                      );
                    }
                    return (
                      <div class="recieve chat">
                        <img src={chatLogo} alt="" class="avtar" />
                        <pre>
                        <p>{renderContent(qna)}</p>
                        </pre>
                      </div>
                    );
                  })}
                  {loading && (
                    <div class="recieve chat">
                      <img src={chatLogo} alt="" class="avtar" />
                      <p>Emily is typing… please wait… </p>
                    </div>
                  )}
                </div>
              </div>

              <div class="chat-input">
                <input
                  type="text"
                  ref={inputRef}
                  class="form-control col in"
                  placeholder="Type Something"
                />
                <button disabled={loading} class="btn btn-primary" onClick={handleSend}>
                  Send
                </button>
                
              </div>
 
            </div>
          </div>
        </div>
      
       
 
      </div>
    </main>

    </>
  );
}

export default App;
