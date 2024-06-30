JournalHub
JournalHub is a Node.js and MongoDB application for creating, reading, updating, and deleting journal entries.

Features
User registration and authentication using JWT
Create, read, update, and delete journal entries
Store data in MongoDB
Redis integration for caching
React frontend (in progress)
Prerequisites
Node.js (version 16)
MongoDB
Redis
Installation
Clone the repository:

git clone https://github.com/your-username/JournalHub.git
cd JournalHub
Install dependencies:

npm install
Create a .env file in the root directory and add the following variables:

MONGO_URI=mongodb://localhost:27017/journalhub
JWT_SECRET=your_jwt_secret
REDIS_URL=redis://localhost:6379
Start MongoDB and Redis services.

Start the server:

npm run start-server
If you want to work on the React frontend, navigate to the client directory and install dependencies:

cd client
npm install
Start the React development server:

npm start
Usage
Register a new user:

curl -X POST http://localhost:5000/register -H "Content-Type: application/json" -d '{
    "name": "John Doe",
    "email": "johndoe@example.com",
    "password": "password123"
}'
Log in with the registered user to get a JWT token:

curl -X POST http://localhost:5000/login -H "Content-Type: application/json" -d '{
    "email": "johndoe@example.com",
    "password": "password123"
}'
Use the JWT token to create a journal entry:

curl -X POST http://localhost:5000/journalEntries -H "Authorization: Bearer <your_jwt_token>" -H "Content-Type: application/json" -d '{
    "date": "2024-06-27T00:00:00Z",
    "title": "My Journal Entry",
    "content": "This is the content of my journal entry."
}'
Fetch all journal entries for a user:

curl -X GET http://localhost:5000/journalEntries/user/<user_id> -H "Authorization: Bearer <your_jwt_token>"
Contributing
Fork the repository
Create a new branch (git checkout -b feature-branch)
Make your changes
Commit your changes (git commit -m 'Add some feature')
Push to the branch (git push origin feature-branch)
Create a pull request 
AUTHORS
Monwabisi ndlovu
Abdulrazzaq Liasu                                                                                                                                       
Oluwatosin  
Licens
This project is licensed under the MIT License.
