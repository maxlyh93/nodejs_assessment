import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [Response1, setResponse1] = useState([]);
  const [Toggle, setToggle] = useState(false);
  const [Response2, setResponse2] = useState("");
  const answer1 = async () => {
    const response = await axios.get("http://localhost:5000/posts");
    setResponse1(response.data);
    console.log(response.data);
    setToggle(true);
  };

  const hideit = async () => {
    // const response = await axios.get("http://localhost:5000/posts");
    setToggle(false);
    setResponse1([]);
    // console.log(response.data);
  };

  // useEffect(() => {}, []);

  return (
    <div className="App h-auto">
      {/* this section is for question 1 */}
      <div className=" w-full bg-cyan-800">
        <div className="flex flex-row bg-blue-500 justify-center">
          {Toggle ? (
            <button
              onClick={hideit}
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Hide
            </button>
          ) : (
            <button
              onClick={answer1}
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Button
            </button>
          )}
          {/* <button
            onClick={answer1}
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Button
          </button> */}
        </div>
        <div className="flex flex-col text-left">
          the reponse is<br></br>
          {Response1.map((item, i) => (
            <div>
              <p>{"{"}</p>
              <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; post_id: {item.post_id}</p>
              <p>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; post_title: {item.post_title}
              </p>
              <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; post_body: {item.post_body}</p>
              <p>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; total_number_of_comments:{" "}
                {item.total_number_of_comments}
              </p>
              <p>{"}"}</p>
            </div>
          ))}
        </div>
      </div>
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="text-3xl font-bold underline text-red-600">
          Hello world!
        </h1>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
