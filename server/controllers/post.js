const amqp = require("amqplib/callback_api");
const dotenv = require("dotenv");
const { google } = require("googleapis");

const Post = require("../models/Post");
const User = require("../models/User");

dotenv.config();

const QUEUE = process.env.QUEUE || "";

module.exports = {
  /**
   * @api {post} /api/v1/post Create new post
   * @apiName CreatePost
   *
   * @apiBody {Object} post Post
   * @apiBody {String} post[user] User's ID
   * @apiBody {String} post[content] Content of post
   * @apiBody {String[]} post[[photos]] Optional photos pf post
   *
   * @apiSuccess {Object} Created Post
   * @apiSuccessExample {json} Success-Response:
   *
   * HTTP/1.1 200 OK
   * {
   *    "user": "0123456789",
   *    "content": "post's description"
   * }
   *
   * @apiError UserNotFound The Id's user was not found
   * @apiErrorExample {json} Error-Response:
   *
   * HTTP/1.1 404 NOT FOUND
   * {
   *    "error": "UserNotFound"
   * }
   *
   */
  createPost: async (req, res) => {
    const { author, displayName, description, picture } = req.body;

    const createdPost = {
      author,
      displayName,
      description,
      picture,
    };

    const user = await User.findOne({ _id: author }).catch((err) => {
      console.error(err.message);
      res.sendStatus(500);
      return;
    });
    if (!user) {
      res.status(404).json({ error: "User Not Found" });
      return;
    }

    amqp.connect("amqp://rabbit", (error, connection) => {
      if (error) {
        console.error(error.message);
        res.sendStatus(500);
        return;
      }

      /* producer send post post to consumer */
      connection.createChannel((err, channel) => {
        if (err) {
          console.error(err.message);
          res.sendStatus(500);
          return;
        }

        channel.assertQueue(QUEUE);
        channel.sendToQueue(QUEUE, Buffer.from(JSON.stringify(createdPost)));
      });

      /* consumer save created post */
      connection.createChannel((err, channel) => {
        if (err) {
          console.error(err.message);
          res.sendStatus(500);
          return;
        }

        channel.assertQueue(QUEUE);
        channel.consume(QUEUE, async (message) => {
          const post = JSON.parse(message.content.toString());
          channel.ack(message);
          await Post.create(post).catch((err) => {
            console.error(err.message);
            res.sendStatus(500);
            return;
          });
        });
      });
    });

    // Create a new calender instance.
    const calendar = google.calendar({
      version: "v3",
      access_token: req.session.accessToken,
    });

    // Create a new event start date instance for temp uses in our calendar.
    const eventStartTime = new Date();
    eventStartTime.setDate(eventStartTime.getDay() + 1);

    // Create a new event end date instance for temp uses in our calendar.
    const eventEndTime = new Date();
    eventEndTime.setDate(eventEndTime.getDay() + 1);

    // Create a dummy event for temp uses in our calendar
    const event = {
      summary: author,
      description: description,
      colorId: 1,
      start: {
        dateTime: eventStartTime,
        timeZone: "Europe/Rome",
      },
      end: {
        dateTime: eventEndTime,
        timeZone: "Europe/Rome",
      },
    };

    calendar.freebusy.query(
      {
        resource: {
          timeMin: eventStartTime,
          timeMax: eventEndTime,
          timeZone: "Europe/Rome",
          items: [{ id: "primary" }],
        },
      },
      (err, res) => {
        // Check for errors in our query and log them if they exist.
        if (err) return console.error("Free Busy Query Error: ", err);

        // Create an array of all events on our calendar during that time.
        const eventArr = res.data.calendars.primary.busy;

        // Check if event array is empty which means we are not busy
        if (eventArr.length === 0)
          // If we are not busy create a new calendar event.
          return calendar.events.insert(
            { calendarId: "primary", resource: event },
            (err) => {
              // Check for errors and log them if they exist.
              if (err)
                return console.error("Error Creating Calender Event:", err);
              // Else log that the event was created.
              return console.log("Calendar event successfully created.");
            }
          );

        // If event array is not empty log that we are busy.
        return console.log(`Sorry I'm busy...`);
      }
    );
    res.status(200).json(createdPost);
  },

  /**
   * @api {get} /api/v1/post Get all post
   * @apiName GetAllPost
   *
   * @apiSuccess {Object} Return all post
   * @apiSuccessExample {json} Success-Response:
   *
   * HTTP/1.1 200 OK
   * [
   *    {
   *        "user": "0123456789",
   *        "content": "post's description #1"
   *    },
   *    {
   *        "user": "9876543210",
   *        "content": "post's description #2"
   *    }
   * ]
   *
   * @apiError UserNotFound The Id's user was not found
   * @apiErrorExample {json} Error-Response:
   *
   * HTTP/1.1 404 NOT FOUND
   * {
   *    "error": "UserNotFound"
   * }
   *
   */
  getAllPost: async (req, res) => {
    const post = await Post.find({}).catch((err) => {
      console.error(err.message);
      res.sendStatus(500);
    });
    res.status(200).json(post);
  },

  /**
   * @api {get} /api/v1/post/:id Get all user's post
   * @apiName GetUserPost
   *
   * @apiParam {String} id User's ID
   *
   * @apiSuccess {Object} Return user's post
   * @apiSuccessExample {json} Success-Response:
   *
   * HTTP/1.1 200 OK
   * [
   *    {
   *        "user": "0123456789",
   *        "content": "post's description #1"
   *    },
   *    {
   *        "user": "0123456789",
   *        "content": "post's description #2 with photos",
   *        "photos": ["photo#1.jpg", "photo#2.pgn"]
   *    }
   * ]
   *
   * @apiError UserNotFound The Id's user was not found
   * @apiErrorExample {json} Error-Response:
   *
   * HTTP/1.1 404 NOT FOUND
   * {
   *    "error": "UserNotFound"
   * }
   *
   */

  getUserPost: async (req, res) => {
    const { id } = req.params;
    const post = await Post.find({ author: id }).catch((err) => {
      console.error(err.message);
      res.sendStatus(404);
    });
    res.status(200).json(post);
  },

  /**
   * @api {patch} /api/v1/post/:id Update post
   * @apiName UpdatePostById
   *
   * @apiParam {String} id Post's ID
   *
   * @apiBody {Object} post Post
   * @apiBody {String} post[user] User's ID
   * @apiBody {String} post[content] Content of updated post
   *
   * @apiSuccess {Object} Return updated post
   * @apiSuccessExample {json} Success-Response:
   *
   * HTTP/1.1 200 OK
   * [
   *    {
   *        "user": "0123456789",
   *        "content": "post's description #1 updated"
   *    }
   * ]
   *
   * @apiError UserNotFound The Id's user was not found
   * @apiErrorExample {json} Error-Response:
   *
   * HTTP/1.1 404 NOT FOUND
   * {
   *    "error": "UserNotFound"
   * }
   *
   */
  updatePostById: async (req, res) => {
    const { author, displayName, description, picture } = req.body;

    const updatedPost = {
      author,
      displayName,
      description,
      picture,
    };

    const { id } = req.params;

    const post = await Post.findOneAndUpdate({ _id: id }, updatedPost).catch(
      (err) => {
        console.error(err.message);
        res.sendStatus(500);
        return;
      }
    );
    if (!post) {
      res.status(404).json({ error: "Post Not Found" });
      return;
    }
    res.status(200).json(post);
  },

  /**
   * @api {delete} /api/v1/post/ Delete all post
   * @apiName DeleteAllPost
   *
   * @apiSuccess {Object} Return deleted post
   * @apiSuccessExample {json} Success-Response:
   *
   * HTTP/1.1 200 OK
   * [
   *    {
   *        "user": "0123456789",
   *        "content": "post's description #1 deleted"
   *    }
   * ]
   *
   * @apiError UserNotFound The Id's user was not found
   * @apiErrorExample {json} Error-Response:
   *
   * HTTP/1.1 404 NOT FOUND
   * {
   *    "error": "UserNotFound"
   * }
   *
   */
  deleteAllPost: async (req, res) => {
    const post = await Post.remove({}).catch((err) => {
      console.error(err.message);
      res.sendStatus(404);
    });
    res.status(200).json(post);
  },

  /**
   * @api {delete} /api/v1/post/:user/:id Delete user's post
   * @apiName DeleteUserPost
   *
   * @apiParam {String} user User's ID
   * @apiParam {String} id Post's ID
   *
   * @apiSuccess {Object} Return deleted post
   * @apiSuccessExample {json} Success-Response:
   *
   * HTTP/1.1 200 OK
   * [
   *    {
   *        "user": "0123456789",
   *        "content": "post's description #1 deleted"
   *    }
   * ]
   *
   * @apiError UserNotFound The Id's user was not found
   * @apiErrorExample {json} Error-Response:
   *
   * HTTP/1.1 404 NOT FOUND
   * {
   *    "error": "UserNotFound"
   * }
   *
   */
  deletePostById: async (req, res) => {
    const { author, description, picture } = req.body;

    const deletedPost = {
      author,
      description,
      picture,
    };

    const { id } = req.params;

    const post = await Post.remove({
      _id: id,
      author: deletedPost.author,
    }).catch((err) => {
      console.error(err.message);
      res.sendStatus(500);
      return;
    });
    if (!post) {
      res.status(404).json({ error: "Post Not Found" });
      return;
    }
    res.status(200).json(post);
  },
};
