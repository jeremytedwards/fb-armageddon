var express = require('express'),
    config  = require( './app.json' ),
    fs      = require( 'fs' ),
    Fitbit  = require( 'fitbit-oauth2' ),
    port    = process.env.PORT || 3000,
    app     = express();

function persistToken( token, cb ) {
    fs.writeFile( 'fb-token.json', JSON.stringify( token ), cb );
}

// Instantiate a fitbit client.  See example config below.
var fitbit = new Fitbit( config.fitbit, persistToken );


app.get( '/fitbit', function( req, res ) {
    // if ( fitbit.getToken() )
    //     res.redirect( '/fitbit/auth' );
    // else  // not sure if this above is working
    res.redirect( fitbit.authorizeURL() );
});


// Callback service parsing the authorization token and asking for the access token.  This
// endpoint is referred to in config.fitbit.authorization_uri.redirect_uri.  See example
// config below.
app.get( '/fitbit/auth', function( req, res, next ) {
    var code = req.query.code;
    fitbit.fetchToken( code, function( err, token ) {
        if ( err ) return next( err );
  res.redirect( '/fb-profile' );
    });
});


// fitbit.request() can be done outside of a web app context, so
// long as a token is available and fitbit.setToken( token ) was
// called.  fitbit.request() will automatically refresh the token
// when required.
app.get( '/fb-profile', function( req, res, next ) {
  fitbit.request({
    uri: "https://api.fitbit.com/1/user/-/profile.json",
method: 'GET',
  }, function( err, body ) {
      if ( err ) return next( err );
var profile = JSON.parse( body );
// res.jsonp( profile );  --> to get json!
res.send( '<pre>' + JSON.stringify( profile, null, 2 ) + '</pre>' );
  });
});

// app.get('/fb-logout', del);
app.get('/fb-logout',function(req, res){
    res.redirect('http://www.fitbit.com/logout');
  });

app.use(express.static('./'));


app.get('*', function(request, response) {
  console.log('New request:', request.url);
  response.sendFile('index.html', { root: '.' });
});

app.listen(port, function() {
  console.log('Server runnning on port ' + port + '!');
});
