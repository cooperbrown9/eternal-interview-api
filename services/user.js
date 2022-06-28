import { User } from "../models/index.js";

export async function create(user) {
  const u = await User.create(user);

  return u;
}

export async function get(userId) {
  const u = await User.findById(userId);

  return u;
}

export async function find(nameText) {
  const users = await User.find({ name: { $regex: nameText, $options: "i" } }).lean();
  console.log(users);
  return users;
}

export async function update(user) {
    const userId = user._id;
    
    // dont mess with the ID (in prod I would make a check for this on the User model itself)
    delete user._id;
    console.log(user)
    const u = await User.findByIdAndUpdate(userId, { $set: { ...user }}, { new: true })

    return u;
}