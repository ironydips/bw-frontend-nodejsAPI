(function( angular ){
  "use strict";

  function Session()
  {
    var session;
    return session = {
              sessionID: "",
              user: {
                      email: "",
                      password: ""
                    },

              isLoggedIn : function() {
                    return (session.sessionID != null);
              }
    };
  }

  
  function SessionController( session, $cookieStore )
  {
    session.saveUser = saveUser();

 
    function loadLastUser()
    {
      session.user = $cookieStore.get('user') || null;
      $cookieStore.remove('user');
    }

    function saveUser(email, password)
    {
        session.user.email = email;
        session.user.password = password;

        $cookieStore.put('user', session.user );
    }

  }


 
  function Authenticator( session, $http, $log )
  {

    var URLS = {
      LOGIN : "authenticateUser?&email={email}&password={password}",
      LOGOUT: "clearSession"
    };

    return {
      login : loginUser,
      logout: logoutUser
    };

    
    function loginUser(email, password)
    {
      session.sessionID = null; 

      return $http.get( supplant( URLS.LOGIN, {
                      email:email,
                      password:password
                  }) )
                  .then(  onAuthenticated )
                  .catch( onRejectedRequest );

      
      function onAuthenticated( results )
      {
        session.sessionID = results.sessionID;
        session.saveUser( email, password );

        return session.user;
      }

    }


    function logoutUser()
    {
      return $http.get( URLS.LOGOUT)
                  .then(function(){
                     session.sessionID = null;
                     return true;
                  })
                  .catch( onRejectedRequest) ;

    }

    function onRejectedRequest( fault )
    {
      $log.debug( fault.reason );
      throw fault;  
    }
  }



  angular.module('bathwaterApp.session'  , ['ngCookies'])
         .value(      'session'          , Session())
         .factory(    'authenticator'    , [ 'session', '$http', '$log', Authenticator] )
         .controller( 'SessionController', [ 'session', '$cookieStore' , SessionController]);

})( window.angular );