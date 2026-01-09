# MySMSMessenger

MySMSMessenger is a full-stack application for sending and managing SMS messages. It consists of a **backend** built with Ruby on Rails and MongoDB, and a **frontend** built with Angular.

Live url: https://mysmsmessenger.netlify.app/
---

## **Features**
- Send SMS messages using Twilio.
- View message history.
- User authentication and authorization.

---

## **Backend Setup**

### **Steps**
1. Clone the repository: git clone https://github.com/your-repo/MySMSMessenger.git
2. cd MySMSMessenger/backend
3. Create a free account in twilio and get the credentials and from,to phone numbers   
4. Rename .env.example to .env and add values
5. Use docker to start the container

## **Frontend Setup**

### **Steps**
1. Navigate to the frontend directory
cd ../frontend/my-sms-messenger
2. Install dependencies:
npm install
3. Start the server
ng serve
4. Open the application in your browser:
http://localhost:4200

## **Deployment**
1. Backend hosting platform: Heroku
2. Frontend hosting platform: Netlify
3. Created mongodb connection in mongodb atlas
4. Steps
    Pushed code to Github
    Conned Github with Heroku
    Added Enviornemnt variables in Settings
    Deploy the application
    Continous deployment enabled through Github