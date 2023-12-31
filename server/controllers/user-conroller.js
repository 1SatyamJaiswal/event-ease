import User from "../model/User.js";
import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";

export const registerUser = asyncHandler(async (req, res) => {
  const { name, age, city, email, password } = req.body;

  if (!name || !age || !city || !email || !password) {
    res.status(400);
    throw new Error("Please enter all the required fields");
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    res.status(400);
    throw new Error("Please enter a valid email address");
  }

  const userExists = await User.findOne({ email: email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists!");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    age,
    city,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(200).json({
      _id: user.id,
      name: user.name,
      age: user.age,
      city: user.city,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      age: user.age,
      city: user.city,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

export const getUser = asyncHandler(async (req, res) => {
  const user_id = req.params.user_id;

  const user = await User.findOne({ _id: user_id });

  if (user_id) {
    res.json({
      _id: user.id,
      name: user.name,
      age: user.age,
      city: user.city,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

export const editUser = asyncHandler(async (req, res) => {
  const user_id = req.params.user_id;
  const { name, age, city } = req.body;
  try {
    const user = await User.updateOne(
      { _id: user_id },
      {
        $set: {
          name: name,
          age: age,
          city: city,
        },
      }
    );
    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    res.status(500);
    console.log(error);
    throw new Error("Error Updating User");
  }
});