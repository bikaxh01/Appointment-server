import { Resend } from "resend";
const resend = new Resend("re_WP1UzfKo_ED3bcUStFoehReH8udy2fu2W");

// Use this `html` string as the body of your email.

export const sendEmail = async (
  email: string,
  verificationCode: number,
  fullName: string
) => {
  const htmlTemplate = `<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      background-color: #f4f4f4;
      font-family: Arial, sans-serif;
    }
    .container {
      background-color: #fff;
      padding: 20px;
      margin: 40px auto;
      max-width: 600px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    .header {
      background-color: #0073e6;
      color: white;
      padding: 20px;
      text-align: center;
      border-radius: 8px 8px 0 0;
    }
    .content {
      padding: 20px;
      text-align: center;
    }
    .verification-code {
      font-size: 24px;
      color: #0073e6;
      margin: 20px 0;
    }
    .footer {
      padding: 10px;
      text-align: center;
      color: #888;
      font-size: 12px;
    }
  </style>
</head>

<body>
  <div class="container">
    <div class="header">
      <h1>Appointment Booking Account Verification</h1>
    </div>
    <div class="content">
      <p>Hello, ${fullName.toUpperCase()}</p>
      <p>To complete your registration, please use the verification code below:</p>
      <div class="verification-code">${verificationCode}</div>
      <p>Please don't share this code with anyone. If you didn't request this, please ignore this message.</p>
      <p>Thank you, and we wish you good health!</p>
    </div>
    <div class="footer">
      <p>© 2024 HealthCare Services</p>
    </div>
  </div>
</body>
</html>
`;
  const { data, error } = await resend.emails.send({
    from: "CareMe <noreplay@bikash.cloud>",
    to: email,
    subject: "Verification Mail",
    html: htmlTemplate,
  });


  return data
};
