import { User } from '../models/index.js';

export async function create(user) {
    const u = await User.create(user)

    return u;
}

export async function get(userId) {
    const u = await User.findById(userId)

    return u;
}

export async function find(nameText) {
    
    const users = await User.find({ name: { "$regex": nameText, "$options": "i" } }).lean()
    console.log(users)
    return users;
}