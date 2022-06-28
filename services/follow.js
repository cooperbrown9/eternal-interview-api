import { Follow, User } from "../models/index.js";

/**
 * @param {*string} userId
 * @returns list of users userId is following
 */
export async function listFollowing(userId) {
    const matches = await Follow.find({ follower: userId }).populate('following');
    const users = matches.map(m => m.following)
    
    return users;
}

/**
 * 
 * @param {*string} userId 
 * @returns  list of followers
 */
export async function listFollowers(userId) {
    const matches = await Follow.find({ following: userId }).populate('follower');
    const users = matches.map(m => m.follower)
    return users;
}

/**
 * @param {*string} follower id of user who is following
 * @param {*string} followee id of user who is being followed
 * @post /follow
 * @returns follow object
 */
export async function follow(follower, following) {
    const f = await Follow.create({ follower, following })

    return f;
}

/**
 * @param {*} follower id of user who is following
 * @param {*} followee id of user who is being followed
 * @post /unfollow
 * @returns unfollowed object
 */
export async function unfollow(follower, following) {

    console.log('deleting', follower, following)
    const f = await Follow.findOneAndDelete({ follower, following })
    console.log('deleted', f)
    return f;
}


/**
 * @param {*} follower id of user who is following
 * @param {*} followee id of user who is being followed
 * @post /follow/:followingId
 * @returns follow object
 */
export async function isFollowing(follower, following) {
    const f = await Follow.exists({ follower, following })

    return f;
}