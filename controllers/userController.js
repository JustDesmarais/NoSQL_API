const { User } = require('../models/index');

module.exports = {
    // get all users
    // tested successfully 
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
      console.log(err);
    }
  },
  // get single user
  // tested successfully
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
  // tested successfully
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
  // tested successfully
  async addFriend(req, res) {
    try {
        const userUpdate = await User.findOne({ _id: req.params.userId} );

        if (!userUpdate) {
            res.status(404).json({message: 'No user with that ID'})
        }

        // add push function and then save
        userUpdate.friends.push(req.params.friendId);
        await userUpdate.save();
        res.status(200).json(userUpdate);
    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
  },
  //tested successfuly
  async removeFriend(req, res) {
    try {
        const userUpdate = await User.findOne({ _id: req.params.userId});
        // pull function removes string from friends array
        userUpdate.friends.pull(req.params.friendId)
        await userUpdate.save();
        res.status(200).json(userUpdate);
    } catch (err) {
        res.status(500).json(err);
        console.log(err)
    }
  },
  // create a new user
  // tested successfully 
  async createUser(req, res) {
    try {
      const dbUserData = await User.create(req.body);
      res.json(dbUserData);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // delete a user
  // tested successfully
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
