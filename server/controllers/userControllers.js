import { UserModel } from "../models/userModels.js";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

export const UserIndex = async (req, res) => {
  try {
    const users = await UserModel.find({});
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Error fetching users" });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Invalid user ID format" });
  }
};

export const UpdateUser = async (req, res) => {
  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name, email: req.body.email, age: req.body.age },
      { new: true }
    );
    if (!updatedUser) return res.status(404).json({ error: "User not found" });
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: "Error updating user" });
  }
};

export const createUser = async (req, res) => {
  try {
    const newUser = await UserModel.create(req.body);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ error: "Error creating user" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const deletedUser = await UserModel.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ error: "User not found" });
    res.json({ message: "User deleted successfully", deletedUser });
  } catch (err) {
    res.status(500).json({ error: "Error deleting user" });
  }
};

export const sendEmail = async (req, res) => {
  const { to, subject, text, html } = req.body;
  console.log("Received email payload:", { to, subject, text, html });
  const attachments = req.files && req.files.length > 0 ? req.files.map(file => ({
    filename: file.originalname,
    path: file.path
  })) : [];
  // Use environment variables for your credentials:
  const transporter = nodemailer.createTransport({
    secure: true,
    port: 465,
    host: 'smtp.gmail.com',
    auth: {
      user: "YOUR_EMAIL_ID",
      pass: "YOUR_PASSWORD",
    },
  });

    try {
      const info = await transporter.sendMail({
        from: "YOUR_EMAIL" ,
        to: to,
        subject: subject || "Welcome user",
        text: text || "Verall development of the personality and mind of the people. It also puts a person in action and in a competitive state. Furthermore, it improves efficiency and desire to achieve the goal. It leads to stability and improvement in work.",
        html: html,
      attachments: attachments,  
      });

    console.log('Message sent: %s', info.messageId);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
};
