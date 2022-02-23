import { BITLY_TOKEN } from "../env";
import { BitlyClient } from "bitly";
const bitly = new BitlyClient(BITLY_TOKEN as string);

export const shorten = async (url: string) => {
  try {
    if (!url) {
      throw Error('"Please pass a string in URL form');
    }
    let regex: RegExp;
    const expression =
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/gi;
    const exp =
      /^https?:\/\/\w+(\.\w+)*(:[0-9]+)?\/?(\/[-a-zA-Z0-9@:%_+.~#?&]*)*$/;

    if (url.includes("127.0.0.1")) {
      regex = new RegExp(exp);
    } else {
      regex = new RegExp(expression);
    }

    if (url.match(regex) === null) {
      console.log(
        "Please pass a string in URL form, e.g. 'http://www.opencanvas.co.uk'"
      );
      throw Error('"Please pass a string in URL form');
    }
    const response = await bitly.shorten(url);
    console.log(`Your shortened bitlink is ${response.link}`);
    return response.link;
  } catch (error) {
    console.log(error);
  }
};
