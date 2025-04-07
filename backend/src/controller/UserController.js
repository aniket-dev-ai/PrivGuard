import UserSchema from "../Model/UserModel.js";
import generateProfilePic from "../Utils/generateProfilePic.js";

export const createUser = async (req, res) => {
  try {
    const { FirstName, LastName, Email, PassHashed } = req.body;
    console.log(FirstName, LastName, Email, PassHashed);
    if (!FirstName || !Email || !PassHashed || !LastName) {
      return res.status(400).json({ message: "Please fill all fields" });
    }
    const user = new UserSchema({ Email, FirstName, LastName });

    user.PassHashed = await user.hashPassword(PassHashed);

    await user.save();
    res.status(201).json({ user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const loginuser = async (req, res) => {
  try {
    const { Email, PassHashed } = req.body;
    console.log(Email, PassHashed);
    if (!Email || !PassHashed) {
      return res.status(400).json({ message: "Please fill all fields" });
    }
    const user = await UserSchema.findOne({ Email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const isMatch = await user.comparePassword(PassHashed);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = user.generateAuthToken();
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });
    console.log(token);
    console.log(user);
    res.status(200).json({ token, user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
