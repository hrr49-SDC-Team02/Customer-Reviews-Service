const mysql = require('mysql2');

const con = mysql.createConnection({
  host: 'localhost',
  port: '3306',
  user: 'sammy',
  password: 'password',
  database: 'beartnt_reviews'
});
console.log('just about to connect!');

con.connect(err => {
  console.log('am i gonna connect or nooot?');
  err ? console.log(err) : console.log('Connected to the database!!');
});

const postDataToRatings = (params, id, callback) => {
  id = id || 5;
  var query = `INSERT INTO ratings VALUES (${params}, ${params.cleanliness}, ${params.communication}, ${params.checkin}, ${params.accuracy}, ${params.location}, ${params.value})`;
  con.query(query, (err, res) => {
    if (err) {
      callback(err);
    } else {
      con.end();
      callback(null, res);
    }
  });
};

const postDataToReviews = (params, id, callback) => {
  id = id || 5;
  var query = `INSERT INTO reviews VALUES (${params.name}, ${params.date}, ${params.reviewBody}, ${params.profilePic}, ${id})`;
  con.query(query, (err, res) => {
    err ? callback(err) : callback(null, res);
  });
};

const getAllDataFromTable = (table, id, callback) => {
  id = id || 5;
  var query = `SELECT * FROM ${table} WHERE ratingsId = ${id}`;
  con.query(query, (err, res) => {
    err ? callback(err) : callback(null, res);
  });
};
// the connection doesn't seem to close, which is odd

// update review function
const updateReview = (params, id, callback) => {
  id = id || 5;
  var updateSnippet = '';
  for (let key of params) {
    updateSnippet += `${key}: ${params[key]},`;
  }
  var query = `UPDATE [LOW_PRIORITY] [IGNORE] reviews
               SET
                  ${updateSnippet}
               WHERE ratingsId = ${id}`;
  con.query(query, (err, res) => {
    err ? callback(err) : callback(null, res);
  });
};

// update rating function
const updateRatings = (params, id, callback) => {
  id = id || 5;
  var updateSnippet = '';
  for (let key of params) {
    updateSnippet += `${key}: ${params[key]},`;
  }
  var query = `UPDATE [LOW_PRIORITY] [IGNORE] ratings
               SET
                  ${updateSnippet}
               WHERE ratingsId = ${id}`;
  con.query(query, (err, res) => {
    err ? callback(err) : callback(null, res);
  });
};

// delete review function
const deleteReview = (id, callback) => {
  id = id || 5;
  var query = `DELETE FROM reviews
               WHERE ratingsId = ${id}`; // does this handle foreign keys? probably not
  con.query(query, (err, res) => {
    err ? callback(err) : callback(null, res);
  });
};


module.exports = {
  postDataToRatings,
  postDataToReviews,
  getAllDataFromTable,
  updateReview,
  updateRatings,
  deleteReview,
  con
};