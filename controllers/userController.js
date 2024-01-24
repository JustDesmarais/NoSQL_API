const User = require('../models/index')

module.exports = {
    // get all users
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // get single user
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        .select('-__v')
        .populate('thoughts')
        .populate('friends');

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // update user info
  async updateUser(req, res) {
    try {
        const userUpdate = await User.findOneAndUpdate({ _id: req.params.userId}, req.body, {new: true});

        if (!userUpdate) {
            res.status(404).json({message: 'No user with that ID'})
        }

        res.status(200).json(userUpdate);
    } catch (err) {
        res.status(500).json(err);
    }
  },
  // add friend 
  async addFriend(req, res) {
    try {
        const userUpdate = await User.findOne({ _id: req.params.userId} );
        // add push function and then save
        userUpdate.friends.push(req.params.friendId);
        await userUpdate.save();
        res.status(200).json(userUpdate);
    } catch (err) {
        res.status(500).json(err);
    }
  },
  async removeFriend(req, res) {
    try {
        const userUpdate = await User.findOne({ _id: req.params.userId} );
        // add push function and then save
        userUpdate.friends.id(req.params.friendId).deleteOne();
        await userUpdate.save();
        res.status(200).json(userUpdate);
    } catch (err) {
        res.status(500).json(err);
    }
  },
  // create a new user
  async createUser(req, res) {
    try {
      const dbUserData = await User.create(req.body);
      res.json(dbUserData);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async deleteUser(req, res) {
    try {
        const user = await User.deleteOne({ _id: req.params.userId });

        if (user.deletedCount === 0) {
            return res.status(404).json({ message: 'No user with that ID'})
        }

        res.status(200).json('User Deleted');
    } catch (err) {
        res.status(500).json(err);
    }
  }
};
