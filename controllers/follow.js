import { FollowService } from "../services/index.js";


export async function list(req, res, next) {
    const { userId } = req.params;
    const { query } = req;

    try {
        let f;
        if(query.type == 'following') {
            f = await FollowService.listFollowing(userId)
        } else {
            f = await FollowService.listFollowers(userId)
        }

        return res.status(200).send(f)
    } catch(e) {
        return next(e)
    }
}

export async function follow(req, res, next) {
    const { userId } = req.params;
    const { following } = req.body;
    
    try {

        const f = await FollowService.follow(userId, following)

        return res.status(200).send(f)
    } catch(e) {
        return next(e)
    }
}

export async function unfollow(req, res, next) {
    const { userId } = req.params;
    const { following } = req.body;
    console.log('body', req.body)

    try {
        const f = await FollowService.unfollow(userId, following)

        return res.status(200).send(f)
    } catch(e) {
        return next(e)
    }
}

export async function isFollowing(req, res, next) {
    const { userId, followingId } = req.params;

    try {
        const f = await FollowService.isFollowing(userId, followingId)

        return res.status(200).send(f)
    } catch(e) {
        return next(e)
    }
}