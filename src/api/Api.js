import axios from "axios";
const Api = async (text, lang1, lang2) => {
  try {
    const responses = await axios.get(
      `https://api.mymemory.translated.net/get?q=${text}&langpair=${lang1}|${lang2}`
    );
    return responses;
  } catch (error) {
    console.log("Api catch error ", error);
  }
};

export default Api;
