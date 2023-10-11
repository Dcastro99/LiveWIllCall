import nodemailer from "nodemailer";
//ourr awxa nghn wrqf

const sendEmail = async (option) => {
    console.log("option", option.email);
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });
    const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: option.email,
        subject: option.subject,
        html: option.messege,
    };

    await transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
            console.log(err);
        } else {
            console.log("Email sent: " + info.response);
        }
    });
};

export { sendEmail };
