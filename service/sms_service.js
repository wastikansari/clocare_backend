import SmsConfig from "../config/sms";

const SmsService = {
  async otpSendSms(phone, otp) {
    var message = `${otp} is your OTP for CLOCARE Account Verification. Thank you.`;
    await SmsConfig.send(phone, message);
  },

  async orderPlaceSms(phone, orderId) {
    console.log(`SmsService call ${phone} and ${orderId}`);
    var message = `Thank You. Your order has been placed. Your Order ID ${orderId}. You will be notified by SMS for each stage of your order. Thanks, Clocare`;
    await SmsConfig.send(phone, message);
  },
};

export default SmsService;
