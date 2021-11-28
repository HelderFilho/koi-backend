module.exports = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://koimedia-frontend.herokuapp.com')
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
    next()
  }
  