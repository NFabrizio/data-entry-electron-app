# data-entry-electron-app

This is a basic Electron app that renders a data table with some sample data.  

The data table is editable, and changes to the data (editing existing data,  
adding rows and deleting rows) are saved to a local file for use when restarting  
the application.  

This application also includes a simple example of how to implement a content  
security policy in an Electron app using gulp templating.

## Installation and Set Up  
Below are the instructions for installing this application.  
*These instructions are valid as of 2019.08.14*

### Environment Set Up  
1. Clone this repository to your local environment.  
  1. Fork this Github repo.  
    1. In a web browser, visit https://github.com/NFabrizio/data-entry-electron-app  
    2. Click the Fork button in the upper right corner of the screen  
    3. In the "Where should we fork this repository?" pop up, select your username.  
    Github should create a fork of the repo in your account  
  2. Clone your fork of the data-entry-electron-app repo.  
    1. In the terminal on your local environment, navigate to the directory where  
    you want to clone the data-entry-electron-app repo  
      `cd ~/path/to/your/directory`  
    2. In the terminal, run:  
      `git clone [clone-url-for-your-fork]`  
      The URL should be in the format git@github.com:YourUsername/data-entry-electron-app.git  

## Application Use  
1. Install the dependencies.  
  `npm install`  
2. Run the application.  
  `npm start`  
3. Make updates to the data by clicking the pencil icon to edit a row.  
4. Add new data by clicking the plus icon in the upper right corner of the app.  
5. Delete rows from the data by clicking the trash can icon at the left side of the row.  
