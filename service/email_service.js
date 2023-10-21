const nodemailer = require("nodemailer");

class sendMailService {
  static mailSend() {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "testiinngg0001@gmail.com",
        pass: "qilx yvaq fqkm bfrx",
      },
    });

    // doc.pipe(res);

    const mailOptions = {
      from: "testiinngg0001@gmail.com",
      to: "rahulskhan002@gmail.com",
      subject: "Your Invoice",
      text: "Please find the attached invoice.",
      //   attachments: [{ filename: "invoice.pdf" }], // Attach the PDF
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Email could not be sent: " + error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  }
}

export default sendMailService;
