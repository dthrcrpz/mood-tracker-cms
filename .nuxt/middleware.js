const middleware = {}

middleware['authenticator'] = require('../middleware/authenticator.js')
middleware['authenticator'] = middleware['authenticator'].default || middleware['authenticator']

export default middleware
