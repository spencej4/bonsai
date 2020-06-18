# About
### Placeholder App for future build.

# Local Dev Environment vs Production Environment 
###     In package.json
###         -for Dev: "start": "react-scripts start",
###         -for Production: "start": "node server/index.js",


# To Run:
###  1:   Open Terminal (for client side)
####           cd into: Desktop/Project Router/ the one with routes
####             'npm start' 

###  2:   Open Terminal (for server side, Heroku)
####           cd into: Desktop/Project Router/ the one with routes/ server
####              'node index.js' 


# Working thus-far:
###   -Connecting to app in locahost
###   -Connecting to heroku server 
###   -Header with links
###   -Registering via localhost:3000/register
####       - Register page is good. No additional work needed here.
###   -Signing in to server via localhost:3000 
####       - Sign in page is good. No additional work needed here.
####       (this is the default landing page for now...Can change this in /src/routes/index.js)
###   -Mobile menu and link routing


# To switch from dev to production for Square payments (sandbox to real money):
###  -/pages/PaymentPage/ index.js
###     - change base url
### -api.js
###     - change base url

# To - Do:
###  -- Add auth check for login as Admin


