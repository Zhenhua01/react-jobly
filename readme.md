# React Jobly App

[Live Demo (Netlify)](https://jobly-zhl.netlify.app)

Project: Frontend React application for users to create a profile, view companies, and apply to available job posts from each company.

## Available Scripts

### Docker (optional):
To spin up containerized application, run this in the project directory.
Open [http://localhost:3000](http://localhost:3003) to view it in browser:

    docker build -t react-jobly . && docker run -d --name jobly-app -p 3000:3000 react-jobly

### In the project directory, you can:

Install required dependencies from package.json:

    npm install

Run the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in browser:

    npm start

Launch the test runner with interactive watch mode:

    npm test

### Notes

This application connects to a RESTful API built on an Express backend that is deployed on Heroku.

[Express Jobly Backend API](https://github.com/zhenhua01/express-sql-jobly)
