const User = require("../models/user");
const mongoose = require("mongoose");
const user = require("../models/user");
const { ObjectId } = mongoose.Schema;

exports.createOrUpdateUser = async (req, res) => {
  const { email } = req.user;

  const user = await User.findOneAndUpdate(
    { email },
    { name: email.split("@")[0], picture },
    { new: true }
  );
  if (user) {
    // console.log("USER UPDATED", user);
    res.json(user);
  } else {
    const newUser = await new User({
      email,
      name: email.split("@")[0],
      picture,
    }).save();
    // console.log("USER CREATED", newUser);
    res.json(newUser);
  }
};

exports.currentUser = async (req, res) => {
  User.findOne({ email: req.user.email }).exec((err, user) => {
    if (err) throw new Error(err);
    res.json(user);
  });
};
exports.User = async (req, res) => {
  const { email } = req.user;
  console.log(email);
  try {
    let user = await User.findOne({ email: req.user.email });
    if (user) {
      res.json(user);
    } else {
      user = await User.findOneAndUpdate(
        { email },
        { name: email.split("@")[0] },
        { new: true }
      );
      if (user) {
        //  console.log("USER UPDATED", user);
        res.json(user);
      } else {
        const newUser = await new User({
          email,
          name: email.split("@")[0],
        }).save();
        // console.log("USER CREATED", newUser);
        res.json(newUser);
      }
    }
  } catch (error) {
    console.log(error);
  }
};

exports.updateUser = async (req, res) => {
  //console.log(req.body);
  const { email } = req.user;
  const { hobby, quote, bio, imgurl } = req.body;
  try {
    const updatedUser = await User.findOneAndUpdate(
      { email },
      { hobby, quote, bio, $push: { picture: imgurl } },

      { new: true }
    ).exec();
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ error });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email })
      .populate("message.connect")
      .exec();

    (user.bio = user.bio || ""),
      (user.hobby = user.hobby || ""),
      (user.gender = user.gender || ""),
      (user.quote = user.quote || ""),
      (user.picture = user.picture || []),
      console.log(user.message);
    res.json(user);
  } catch (error) {
    console.log(error);
  }
};

exports.registerUser = async (req, res) => {
  const { email } = req.user;
  const { age, gender } = req.body;
  // console.log(req.body);

  try {
    const user = await User.findOne({ email });
    if (user) {
      res.status(400).json({ data: "User already exists" });
    }

    const newUser = await new User({
      email,
      name: email.split("@")[0],
      age,
      gender,
    }).save();
    res.json(newUser);
  } catch (error) {
    console.log(error);
  }
};

exports.initialSearch = async (req, res) => {
  const { minAge, maxAge, genderOut } = req.body;
  const { email, _id } = req.user;
  const test = await User.findOne({ email }).exec();
  //console.log(test._id, "And", req.user._id);
  try {
    const user = await User.find({
      _id: { $ne: _id },
      age: { $gte: minAge, $lte: maxAge },
      gender: genderOut,
    }).exec();
    //console.log(user);
    res.json(user);
  } catch (error) {
    console.log(error);
  }
};

exports.messages = async (req, res) => {
  const { email, uid } = req.user;
  const { id, txt } = req.body;
  console.log(req.user.user_id);

  const newmessages = {
    sender: uid.toString(),
    content: txt,
    date: new Date(),
  };

  try {
    let userone = await User.findOne({ email }).exec();

    const user = await User.findById(id)
      .populate("messages", "sender content date ")
      .exec();
    (user.messages.from = uid),
      (user.messages.content = txt),
      (messages.date = new Date()),
      user.messages.push(newmessages);
    console.log(userone);
    res.status(200).send("user");
  } catch (error) {
    res.status(400).json({ error });
  }
};
exports.messages = async (req, res) => {
  const { email, uid } = req.user;
  const { id, txt } = req.body;

  const messages = {
    from: uid.toString(),
    content: txt,
    date: new Date(),
  };
  try {
    //let sentUser = await User.findOne({ email }).exec();
    let user = await User.findById(id).exec();
    const sentUser = await User.findOneAndUpdate(
      { email },
      {
        $push: {
          messageSent: {
            content: txt,
            date: new Date(),
            receiver: id,
          },
        },
      },
      { new: true }
    ).exec();
    const receivedUser = await User.findByIdAndUpdate(
      id,
      {
        $push: {
          messageReceived: {
            content: txt,
            date: new Date(),
            sender: sentUser._id,
          },
        },
      },
      { new: true }
    ).exec();
    console.log(receivedUser.messageReceived);
    res.status(200).send("updatedUser");
  } catch (error) {
    res.status(400).json({ error });
  }
};
exports.messages2 = async (req, res) => {
  const { email, uid } = req.user;
  const { id, txt } = req.body;

  const messages = {
    from: uid.toString(),
    content: txt,
    date: new Date(),
  };
  try {
    //let sentUser = await User.findOne({ email }).exec();
    let user = await User.findById(id).exec();
    const sentUser = await User.findOneAndUpdate(
      { email },
      {
        $push: {
          messageSent: {
            content: txt,
            date: new Date(),
            receiver: id,
          },
        },
      },
      { new: true }
    ).exec();
    const receivedUser = await User.findByIdAndUpdate(
      id,
      {
        $push: {
          messageReceived: {
            content: txt,
            date: new Date(),
            sender: sentUser._id,
          },
        },
      },
      { new: true }
    ).exec();
    console.log(receivedUser.messageReceived);
    res.status(200).send("updatedUser");
  } catch (error) {
    res.status(400).json({ error });
  }
};

exports.getUpdatedMessages = async (req, res) => {
  const { email, _id } = req.user;

  // const msgReceived = req.user.messageReceived;
  // const msgSent = req.user.messageSent;
  //  msgReceived.map((x)=>{
  //    x.sender ===.receiver?
  //  })

  // const unreadMsg = msg.map((x) => x.read === "No");

  try {
    //console.log(msg, "AND", unreadMsg);
    res.send("lol");
  } catch (error) {
    console.log(error);
  }
};

exports.messages1 = async (req, res) => {
  const { email, uid } = req.user;
  const { id, txt } = req.body;
  const date = new Date();
  // console.log(id);

  try {
    const rUser = await User.findById(id).exec();
    const sUser = await User.findOne({ email }).exec();
    console.log(rUser.message, sUser.message);
    //console.log(rUser);
    sUser.message.map((x) => {
      // console.log(x.connect);
      x.connect == rUser._id.toString() &&
        x.content.push({ body: txt, to: true, date });
    });
    rUser.message.map((x) => {
      x.connect == sUser._id.toString() &&
        x.content.push({ body: txt, to: false, date });
    });
    rUser.save();
    sUser.save();

    res.status(200).send("oo");
  } catch (error) {
    res.status(400).json({ error });
  }
};
exports.newMessage = async (req, res) => {
  const { email, uid } = req.user;
  const { id, txt } = req.body;
  const date = new Date();
  console.log("arrived");

  try {
    const rUser = await User.findById(id).exec();
    const sUser = await User.findOne({ email }).exec();
    sUser.message = [
      ...sUser.message,
      {
        connect: rUser._id,
        content: { body: txt, date, to: false },
      },
    ];
    rUser.message = [
      ...rUser.message,
      {
        connect: sUser._id,
        content: { body: txt, date, to: false },
      },
    ];
    rUser.save();
    sUser.save();
    console.log("new messages", rUser._id.toString(), txt, rUser.message);

    res.status(200).send(sUser.messages);
  } catch (error) {
    res.status(400).json({ error });
  }
};

exports.newMessage1 = async (req, res) => {
  const { email, uid } = req.user;
  const { id, txt } = req.body;
  console.log(id);

  try {
    const rUser = await User.findById(id).populate("message.connect").exec();
    const sUser = await User.findOne({ email })
      .populate("message.connect")
      .exec();
    //console.log(sUser.message);
    const retrievMsgS =
      sUser.message.length > 0 &&
      sUser.message.find(
        (x) => x.connect && x.connect._id.toString() === rUser._id.toString()
      );
    const retrievMsgR =
      rUser.message.length > 0 &&
      rUser.message.find(
        (x) => x.connect && x.connect._id.toString() === sUser._id.toString()
      );
    console.log(retrievMsgS, "&&&&&", retrievMsgR);
    if (retrievMsgS) {
      //console.log(retrievMsgS, retrievMsgR);
      retrievMsgS.content.push({ body: txt, to: false, date: new Date() });
      retrievMsgR.content.push({ body: txt, to: true, date: new Date() });
    } else {
      sUser.message = [
        ...sUser.message,
        {
          connect: rUser._id,
          content: { body: txt, to: false, date: new Date() },
        },
      ];
      rUser.message = [
        ...rUser.message,
        {
          connect: sUser._id,
          content: { body: txt, to: true, date: new Date() },
        },
      ];
    }
    await rUser.save();
    await sUser.save();
    //console.log("new messages", rUser._id.toString(), txt, rUser.message);

    res.status(200).send(sUser);
  } catch (error) {
    console.log(error);
  }
};

exports.addFriend = async (req, res) => {
  const { email, uid } = req.user;
  const { id } = req.body;

  try {
    const userToadd = await User.findById(id);
    const updatedUser = await User.findOneAndUpdate(
      { email },
      { $addToSet: { friends: userToadd._id } },
      { new: true }
    ).exec();
    res.json({ updatedUser });
  } catch (error) {
    console.log(error);
  }
};

exports.listFriend = async (req, res) => {
  const { email, uid } = req.user;
  const { id, txt } = req.body;

  try {
    const user = await User.findOne({ email }).populate("friends").exec();
    res.json({ user: user.friends });
  } catch (error) {
    console.log(error);
  }
};
