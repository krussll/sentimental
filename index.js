var express = require('express');
var app = express();

var mysql = require('mysql')
var connection = mysql.createConnection({
  host     : 'sabaik6fx8he7pua.chr7pe7iynqr.eu-west-1.rds.amazonaws.com',
  user     : 'fqdewcxvxfjui14h',
  password : 'kx7feygtucynujt9',
  database : 'fb5j2q5iy3xcz54z'
});

connection.connect(function(err){
  if(err) {
      console.log("Error connecting database ... nn");
  }
});

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  var query = connection.query('CALL gettweetmatch(0.08)', function(err, rows, fields) {
      if (err) throw err;

      var song = rows[0][0]["song"];
      var artist = rows[0][0]["artist"];
      var videoId = rows[0][0]["video_id"];

      response.render('pages/index', { song: song, artist: artist, videoId: videoId});
  });
});

app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
