// install express mysql2 dotenv cors (body-parser is still in express)
const express = require('express');
const mysql = require('mysql2');
const dotenv = require('dotenv');
const bodyparser = require('body-parser')
const cors = require('cors')

const app = express()
dotenv.config();

app.use(bodyparser.json());
app.use(cors());


// user db function with .env and mysql2 
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log("Connected Server successfully !")
})

// Use query for mysql this path is universal / 
app.get('/', (req, res) => {
    const query = `SELECT 
        vl.video_id, 
        vl.video_url, 
        vl.video_thumbnail, 
        vl.video_title, 
        vl.video_created_at, 
        c.channel_id, 
        c.channel_name, 
        c.channel_profile_picture, 
        p.view_count
    FROM video_long vl 
    JOIN channels c ON vl.channel_id = c.channel_id
    JOIN popular p ON vl.video_id = p.video_id
    `;

    db.query(query, (err, result) => {
        if (err) {
            console.error("Error for fecth data !", err)
            res.status(500).send("Error for fecth data !")
        } else {
            res.send(result);
        }
    });

});
// path short samething / 
app.get('/short', (req, res) => {
    const query = `SELECT 
        vs.video_id, 
        vs.video_url, 
        vs.video_thumbnail, 
        vs.video_title, 
        vs.video_created_at, 
        c.channel_id, 
        c.channel_name, 
        c.channel_profile_picture, 
        p.view_count
    FROM videos_short vs 
    JOIN channels c ON vs.channel_id = c.channel_id
    JOIN popular p ON vs.video_id = p.video_id
    `;

    db.query(query, (err, result) => {
        if (err) {
            console.error("Error for fecth data !", err)
            res.status(500).send("Error for fecth data !")
        } else {
            res.send(result);
        }
    });

});

// subscribe 
app.get('/subscribe', (req, res) => {
    const user_id = req.query.user_id; // Is important don't foget defind user_id use with req.query
    if (!user_id) {
        res.status(400).send("Please enter user_id");
        return;
    }
    const query = ` 
    SELECT u.user_id, u.user_name, u.user_profile_picture,
       c.channel_id, c.channel_name, c.channel_profile_picture
        FROM users u
        JOIN channel_subscribe cs ON u.user_id = cs.user_id
        JOIN channels c ON cs.channel_id = c.channel_id
        WHERE u.user_id = ?
    `;

    const values = [user_id];

    db.query(query, values,(err, result) => {
        if (err) {
            console.error("Error for fecth data !", err)
            res.status(500).send("Error for fecth data !")
        } else {
            res.json(result);
        }
    })
}
);

// Get Result from search
app.get('/result', (req,res) => {
    const { search_query } = req.query;

    const query = `
    SELECT vl.video_id, vl.video_title, vl.video_created_at, vl.video_thumbnail,
           c.channel_name, c.channel_profile_picture,
           p.view_count
    FROM video_long vl
    JOIN channels c ON vl.channel_id = c.channel_id 
    JOIN popular p ON vl.video_id = p.video_id
    WHERE vl.video_title LIKE ? OR c.channel_name LIKE ?;
`;
    
    db.query(query, [`%${search_query}%`, `%${search_query}%`], (err, result) => {
        if (err) {
            console.error("Error for fecth data !", err);
            res.status(500).send("Error for fecth data !");
        }else {
            res.json(result);
        }
    })
})

// Watch /
app.get('/watch', (req,res) => {
    console.log(req.query)
    const{ v }= req.query; //feel like /result function = req.query not same / subscribe 
    if (!v) {
        res.status(400).send("Invalid video parameter");
        return;
    }

    const query = `
      SELECT
        vl.video_id,
        vl.video_title, 
        vl.video_description,
        vl.video_duration,
        vl.video_thumbnail,
        vl.video_url,
        vl.video_created_at,
        c.channel_name,
        c.channel_profile_picture, 
        p.view_count,
        p.like_count,
        (SELECT COUNT(*) FROM channel_subscribe WHERE channel_id = vl.channel_id AND user_id = ?) AS is_subscribed,
        (
            SELECT GROUP_CONCAT(CONCAT(u.user_name, ': ', cm.comment_text) ORDER BY cm.comment_created_at SEPARATOR '\n')
            FROM comments cm
            JOIN users u ON cm.user_id = u.user_id
            WHERE cm.video_id = vl.video_id  
        ) AS comments  

        FROM video_long vl 
        JOIN channels c ON vl.channel_id = c.channel_id
        JOIN popular p ON vl.video_id = p.video_id 
        WHERE vl.video_id = ?;
    `;

        // return video from watch
    db.query(query, [v, v], (err, result) => {
        if(err) {
            console.error('Error for searching:',err);
            res.status(500).send('Error for searching');
        }else {
            const video = result[0];
            const comments = video.comments.split('\n').map(comment => {
                const [username, content] = comment.split(': ');
                return { [username]: { content } };
            });
            video.comments = comments;
            res.json([video]);
        }
    });
});

// Expole to listen PORT 3000
app.listen(3000, () => {
    console.log('Example for listen PORT : 3000')
});