import axios from "axios";

export class GoogleRecaptcha {
  GOOGLE_RECAPTCHA_KEY: string;
  SiteVerficationURL: string;

  constructor(recaptcha: string) {
    this.GOOGLE_RECAPTCHA_KEY = process.env.GOOGLE_RECAPTCHA_KEY;
    this.SiteVerficationURL = `https://www.google.com/recaptcha/api/siteverify?secret=${this.GOOGLE_RECAPTCHA_KEY}&response=${recaptcha}`;
  }

  static validateRecaptcha = async (Recaptcha) => {
    const recap = new GoogleRecaptcha(Recaptcha);
    try {
      const response = await axios.post(recap.SiteVerficationURL);
      return response;
    } catch (exception) {
      throw new Error(exception);
    }
  };
}
