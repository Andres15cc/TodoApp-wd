const logoutRouter = require('express').Router();

logoutRouter.get('/', async (request, response) => {
   
    
    const cookieOptions = {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        sameSite: 'None',
        path: '/' 
    };

   
    response.clearCookie('accessToken', cookieOptions);
    response.clearCookie('accesToken', cookieOptions);

    
    return response.sendStatus(204);
});

module.exports = logoutRouter;