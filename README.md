# How to run

- Clone the repo<br>
- Enter repo folder<br>
- Install dependencies for frontend and backend<br>
  `npm install`<br>
  `cd frontend`<br>
  `npm install`<br>
  (if there are npm errors, try add "--legacy-peer-deps" at the end)
- Run on localhost<br>
  `cd ..`<br>
  `npm start`<br>
  Open http://localhost:3030/<br>
- Check backend api<br>
  Open http://localhost:3030/skishop/{route}<br>
  Replace {route} with according route
 
# Deployment
 https://ski-shop.herokuapp.com/

# Login
- Admin login<br>
  Email: TestAdmin1<br>
  Password: Thisis1securepassword!<br>
 
- User login<br>
  Email: TestUser1<br>
  Password: Thisisalso1securepassword!<br>
 
  Email: TestUser2<br>
  Password: Thisisalso1securepassword!<br>
  
 # API TEST
  The sign in and sign up api are not able to test from curl since we made it JSON form, but you can test it through Advanced REST client in Chrome,Here are
  examples of our test result (other curl commands can be found in the curl_tester.txt file)  
  
  **Sign in:**
  
  ![My Image](signinTest.png)
  
  **Sign up:**
  
  ![My Image](signupTest.png)
  
 # SQL FILE
  ***Sing we are using NoSQL method in our project, we do not have a SQL file to create and poplulate data. Instead, we have several mongoose Sechema components and
    seed router in our backend to simulate the creating and populating of data.***
  
