import OtpService from "../../../service/otp-service";
import CustomerLoginModel from "../../../models/customer/customer_login";
import SmsService from "../../../service/sms_service";

const SendOtpController = {
  async sendOtp(req, res) {
    const { phone } = req.body;

    if (/^\d{10}$/.test(phone)) {
      const otp = await OtpService.generateOtp();
      console.log(otp);
      try {
        await SmsService.otpSendSms(phone, otp);
        res.status(200).json({
          status: true,
          data: {
            msg: "Verification code has been sent.",
            verification_code: otp,
          },
        });
      } catch (err) {
        console.log(err);
        res.status(200).json({
          status: false,
          data: {
            msg: "message sending failed",
          },
        });
      }
    } else if (phone == undefined) {
      res.status(200).json({
        status: false,
        data: { msg: "Phone field is required!" },
      });
    } else {
      res.status(200).json({
        status: false,
        data: { msg: "Mobile number should be 10 digit long." },
      });
    }
  },

  async checkMobile(req, res) {
    const { mobile } = req.body;

    const user = await CustomerLoginModel.findOne({
      mobile: mobile,
    });
    console.log(`data  sss ${user} and ${mobile}`);
    if (user == null) {
      res.json({
        status: false,
        data: { msg: "Mobile number not exists" },
      });
    } else {
      res.json({
        status: true,
        data: { msg: "Mobile number already exists!" },
      });
    }
  },
};

export default SendOtpController;
