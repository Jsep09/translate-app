import { useEffect, useState } from "react";
import "./App.css";
import Api from "./api/api";
import languages from "./Isocode/";

function App() {
  const [text, setText] = useState("");
  const [translation, setTranslation] = useState("");
  const [lang1Select, setlang1Select] = useState("en");
  const [lang2Select, setlang2Select] = useState("th");

  const handelsendDataToApi = async () => {
    if (text) {
      const response = await Api(text, lang1Select, lang2Select);
      let translationResult = response.data.responseData.translatedText;

      setTranslation(translationResult);
    }
  };
  // switch ภาษา
  const handelSwitchBut = () => {
    setText(translation);
    setTranslation(text);
    setlang1Select(lang2Select);
    setlang2Select(lang1Select);
  };

  // ถ้าหาก state text ถูกเคลียร์ออกหมดก็จะทำการเคลียร์ State translation ออกด้วยและ [arg2] คือตรวจจับ state นั้น
  useEffect(() => {
    if (text == "") {
      setTranslation("");
    }
  }, [text]);

  const handelCopyToClipboard = (text) => {
    if (!text) {
      return console.log("No text to copy");
    }
    navigator.clipboard
      .writeText(text)
      .then(() => {
        console.log("success");
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
  return (
    <div className=" bg-slate-600">
      {/* contianer */}
      <div className="container sm:mx-auto md:mx-auto flex justify-center items-center h-screen">
        {/* main box */}
        <div className="box-border justify-center items-center w-4/5 sm:w-3/4 md:w-3/4 lg:w-3/4 xl:w-1/2 2xl:w-1/2 h-1/2 md:h-2/4 2xl:h-3/4 p-6 bg-white rounded-md">
          {/* text area box */}
          <div className="flex flex-row flex-wrap w-full sm:w-full h-3/4 border border-slate-300 rounded-t-lg">
            <div className="w-full sm:w-full md:w-1/2 border-b sm:border-b md:border-b-0 md:border-r border-slate-300 pl-4 pt-2 ">
              <textarea
                className="box-border w-full h-full resize-none focus:outline-none"
                value={text}
                type="text"
                placeholder="Enter text"
                onChange={(e) => {
                  setText(e.target.value);
                }}
              ></textarea>
            </div>
            <div className="w-full sm:w-full md:w-1/2  pl-4 pt-2">
              <textarea
                className="box-border w-full h-full resize-none focus:outline-none bg-inherit"
                type="text"
                value={translation}
                placeholder="Translation"
                readOnly
                disabled
              ></textarea>
            </div>
          </div>
          {/* button & option group box */}
          <div className="w-full h-10 border border-t-0 border-slate-300 rounded-b-lg flex flex-row justify-between items-center">
            <div className="button-group1 flex flex-row  justify-center gap-4 pl-4 pr-6 border-r-2  border-slate-300">
              <div className="volume-1 flex items-center ">
                <button>
                  <svg
                    class="h-6 w-6 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                    />
                  </svg>
                </button>
              </div>
              <div className="copy-1 flex items-center">
                <button onClick={() => handelCopyToClipboard(text)}>
                  <svg
                    class="h-6 w-6 text-gray-500"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    {" "}
                    <path stroke="none" d="M0 0h24v24H0z" />{" "}
                    <rect x="8" y="8" width="12" height="12" rx="2" />{" "}
                    <path d="M16 8v-2a2 2 0 0 0 -2 -2h-8a2 2 0 0 0 -2 2v8a2 2 0 0 0 2 2h2" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="lang-1">
              <select
                className="focus:outline-none w-32"
                name="lang1"
                id=""
                value={lang1Select}
                onChange={(e) => {
                  setlang1Select(e.target.value);
                }}
              >
                {languages.map((lang) => {
                  return <option value={lang.code}>{lang.name}</option>;
                })}
              </select>
            </div>

            <div className="switch flex items-center ">
              <button onClick={handelSwitchBut}>
                <svg
                  class="h-5 w-5 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                  />
                </svg>
              </button>
            </div>
            <div className="lang-2">
              <select
                className="focus:outline-none w-32"
                name="lang1"
                id=""
                // มันรู้ได้ไงว่าต้องเป็นตัวไหนใน Array object มันเลือก select option ให้เลยจากการ map value={lang.code} ก็จะดูให้ว่า default คือตัวไหน
                value={lang2Select}
                onChange={(e) => {
                  setlang2Select(e.target.value);
                }}
              >
                {languages.map((lang) => {
                  return <option value={lang.code}>{lang.name}</option>;
                })}
              </select>
            </div>
            <div className="button-group2 flex flex-row justify-center gap-4 pr-4 pl-6 border-l-2  border-slate-300 ">
              <div className="copy-2 flex items-center">
                <button onClick={() => handelCopyToClipboard(translation)}>
                  <svg
                    class="h-6 w-6 text-gray-500"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    {" "}
                    <path stroke="none" d="M0 0h24v24H0z" />{" "}
                    <rect x="8" y="8" width="12" height="12" rx="2" />{" "}
                    <path d="M16 8v-2a2 2 0 0 0 -2 -2h-8a2 2 0 0 0 -2 2v8a2 2 0 0 0 2 2h2" />
                  </svg>
                </button>
              </div>
              <div className="volume-2 flex items-center">
                <button>
                  <svg
                    class="h-6 w-6 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <button
            onClick={handelsendDataToApi}
            className="border-solid bg-blue-600 text-white rounded-md mt-3 w-full py-2"
          >
            Translate text
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
