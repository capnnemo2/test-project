<html>
  <head>
    <title>Google Sign In</title>
  </head>
  <body>
      <div>
          <h1>Profile Information</h1>
          <p>
              <strong>Id</strong>: <%= user.id %> <br />
              <strong>Email</strong>: <%= user.emails[0].value %><br />
              <strong>Name</strong>: <%= user.displayName %>
          </p>
      </div>
  </body>
</html>;
