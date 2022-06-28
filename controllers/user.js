import { UserService } from "../services/index.js";

export async function create(req, res, next) {
  try {
    const user = await UserService.create({ ...req.body });

    return res.send(user);
  } catch (e) {
    return next(e);
  }
}

export async function get(req, res, next) {
  const { userId } = req.params;

  try {
    const user = await UserService.get(userId);

    return res.send(user);
  } catch (e) {
    return next(e);
  }
}

export async function find(req, res, next) {
  const { name } = req.query;
  if (!name || name.length == 0) return res.send([]);

  try {
    const users = await UserService.find(req.query.name);

    return res.send(users);
  } catch (e) {
    return next(e);
  }
}

export async function update(req, res, next) {
  const { user } = req.body;

  if (req.session.user._id !== user._id) return res.status(404).send({ errors: ["Must update your own account"] });

  try {
    const u = await UserService.update(user);

    return res.send(u);
  } catch (e) {
    return next(e);
  }
}
