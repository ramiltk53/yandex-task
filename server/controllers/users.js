const users = require("../data/users.json");

const getUsers = (req, res) => {
  res.status(200).json(users);
};

const getUser = (req, res) => {
  const user = users.find((user) => user._id === req.params.id);

  if (!user) {
    return res.status(404).json({ message: 'Нет пользователя с таким id' });
  }

  res.status(200).json(user);
};

module.exports = {
  getUsers,
  getUser
};
