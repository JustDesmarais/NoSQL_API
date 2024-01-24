const { Thought, User } = require('../models');

module.exports = {
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.staus(200).json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId });

      if (!thought) {
        return res.status(404).json({ message: 'No Thought with that ID' });
      }

      res.status(200).json(thought);
    } catch (err) {
      res.status(500).json(err)
    }
  },
  // create a new Thought
  async createThought(req, res) {
    try {
      const thought = await Thought.create(
        {
            thoughtText: req.body.thoughtText,
            username: req.body.username
        }
      );
      const user = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $addToSet: { thoughts: thought._id } },
        { new: true }
      );

      if (!user) {
        return res
          .status(404)
          .json({ message: 'Thought posted, but found no user with that ID' });
      }

      res.json('Created the Thought 🎉');
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  async updateThought(req, res) {
    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { thoughtText: req.body.thoughtText },
            { new: true }
            );
        if (!thought) {
            return res.status(404).json({ message: 'Thought ID not found'})
        }
        res.status(200).json(thought);
    } catch (err) {
        res.status(500).json(err);
    }
  },
  async deleteThought(req, res) {
    try {
        const thought = await Thought.deleteOne({ _id: req.params.thoughtId });

        if (thought.deletedCount === 0) {
            res.status(404).json({ message: 'Thought ID not found'});
        }

        res.status(200).json({ message: 'Thought deleted' })
    } catch(err) {
        res.status(500).json(err);
    }
  },
  async addReaction(req, res) {
    try {
        const thought = await Thought.findOne({ _id: req.params.thoughtId });
        
        if (!thought) {
            return res.status(404).json({message: 'Thought ID not found'})
        };

        thought.reactions.push({ reactionBody: req.body.reactionBody, username: req.body.username});
        thought.isNew;
        await thought.save();

        res.status(200).json(thought.reactions);
    } catch (err) {
        res.status(500).json(err);
    }
  }, 
  async deleteReaction(req, res) {
    try {
        const thought = await Thought.findOne({ _id: req.params.thoughtId});
        thought.reactions.id(req.body.reactionId).deleteOne();

        if (!thought) {
            return res.status(404).json({message: 'Thought ID not found'})
        } else if (thought.reactions.deletedCount === 0) {
            return res.status(404).json({message: 'Reaction ID not found'});
        }

        res.status(200).json({message: 'Reaction Deleted'});
    } catch (err) {
        res.status(500).json(err);
    }
  }
};
