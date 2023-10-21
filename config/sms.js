const axios = require("axios");
import { SMS_APIKEY, SMS_SENDER } from "../config/index";

const SmsConfig = {
  async send(phone, messages) {
    console.log(`SmsService call ${phone} and ${messages}`);
    try {
      const apiKey = SMS_APIKEY;
      const message = messages;
      const sender = SMS_SENDER;
      const numbers = `91${phone}`;

      const url = `https://api.textlocal.in/send/?apikey=${apiKey}&numbers=${numbers}&message=${encodeURIComponent(
        message
      )}&sender=${sender}`;

      const response = await axios.post(url);
      console.log(`rrrrrrrrrrrrrrrrrrrrrr ${response.message}`);
      return response;
    } catch (error) {
      console.error("Error sending SMS", error);
      return res.status(200).send("Error sending SMS: " + error.message);
    }
  },
};

export default SmsConfig;
