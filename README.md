# ECS193 Energy Viz Tool

The Energy Data Visualization Tool was developed as an in-house tool for engineers at the UC Davis Energy Conservation Office (ECO).  It allows ECO staff to pull, analyze, and visualize Heating, Ventilation and Air Conditioning (HVAC) datasets in an efficient and intuitive manner. The application will be used by ECO engineers and other technical users in the optimization of HVAC systems to identify operational issues and opportunities for energy efficiency upgrades.  

## Demo ##

frontend: https://energytool-frontend.herokuapp.com/#/dashboard

backend: https://ecs193energytool.herokuapp.com/api/graphql

## Requirements ##
-   MongoDB 5.0.6
-   Express 4.15.3
-   React 16.3.2
-   Npm 5.8.0
-  Graphql 0.11.7

Other Dependencies in root/package.json and frontend/package.json

##### Frontend Framework
-   React-bootstrap 0.32.1
##### Test Framework
-   Jest: 20.0.4

## Getting Started ##

1) clone the repository to your local machine: 
`git clone https://github.com/ucdavis/ECS193-EnergyVisTool.git`

2) Install dependencies: 
   - under the frontend foler: `npm install`
   - under the main folder: `npm install`

3) Start Dev server: 
`npm start`

Dev Server on http://localhost:4000/
Frontend on http://localhost:3000/


## Available Scripts ##
-   `npm test` \
Launches the test runner in the interactive watch mode. See the section about running tests for more information.

-    `npm run build` \
Builds the app for production to the build folder. It correctly bundles React in production mode and optimizes the build for the best performance. The build is minified and the filenames include the hashes. 

## Deployment (Heroku) ##
-   Set up:
    -   Download Heroku CLI to manage and scale your applications.
    -   once installed, you can use the heroku command from your command shell. 
    -   Log in using the email address and password you used when creating your Heroku account. 
    
-   Prepare the app 
    -   clone the application so that you have a local version of the code that you can then deploy to Heroku, execute the following commands in your local command shell or terminal: 
    -   `git clone https://github.com/ucdavis/ECS193-EnergyVisTool.git`
    -   You now have a functioning git repository that contains a simple application as well as a package.json file, which is used by Node’s dependency manager.    
    
-   Deploy the app  
    -   Create an app on Heroku, which prepares Heroku to receive your source code. 
        `heroku create` 
        
    -   When you create an app, a git remote (called heroku) is also created and associated with your local git repository. Heroku generates a random name (in this case `sharp-rain-871`) for your app, or you can pass a parameter to specify
        Now deploy your code:  
        `git push heroku master`
    -   The application is now deployed. 
        Ensure that at least one instance of the app is running:   
        -   Frontend: `heroku ps:scale web=1` 
        -   Backend: `heroku ps:scale server=1` 
-   Define a Procfile
     -  Use a Procfile, a text file in the root directory of your application, to explicitly declare what command should be executed to start your app.
        -   Backend server deployment, your Procfile should be  
            `server: npm run dev`
        -   Frontend server deployment, your Procfile should be  
            `web: cd ./frontend && npm install && npm start`    
-   View logs   
    -   Heroku treats logs as streams of time-ordered events aggregated from the output streams of all your app and Heroku components, providing a single channel for all of the events.        
    -   View information about your running app using one of the logging commands   
            `heroku logs --tail`

##  Future Frontend Developing Guide ##
#### Importing a Component
This project setup supports ES6 modules thanks to Babel.
While you can still use `require()` and `module.exports`, we encourage you to use import and export instead.    
For example: `Button.js`
```js
import React, { Component } from 'react';
class Button extends Component { 
  render() 
    {  }
}

export default Button; // Don’t forget to use export default!
```

`DangerButton.js`
```js
import React, { Component } from 'react';
import Button from './Button'; // Import a component from another file
class DangerButton extends Component {
  render() { return <Button color="red" />;  }}
  
export default DangerButton;
```

**Be aware of the difference between default and named exports. It is a common source of mistakes.**
We suggest that you stick to using default imports and exports when a module only exports a single thing (for example, a component). That’s what you get when you use export default Button and import Button from `'./Button'`.
Named exports are useful for utility modules that export several functions. A module may have at most one default export and as many named exports as you like.


## TroubleShooting ##
##### `npm start` doesn’t detect changes

When you save a file while npm start is running, the browser should refresh with the updated code.
   
If this doesn’t happen, try one of the following workarounds:  

If your project is in a Dropbox folder, try moving it out.  

If the watcher doesn’t see a file called `index.js` and you’re referencing it by the folder name, you need to restart the watcher due to a Webpack bug.   

Some editors like Vim and IntelliJ have a “safe write” feature that currently breaks the watcher. You will need to disable it. Follow the instructions in “Adjusting Your Text Editor”.

If your project path contains parentheses, try moving the project to a path without them. This is caused by a Webpack watcher bug.`  

On Linux and macOS, you might need to tweak system settings to allow more watchers.  

If the project runs inside a virtual machine such as (a Vagrant provisioned) VirtualBox, create an .env file in your project directory if it doesn’t exist, and add `CHOKIDAR_USEPOLLING=true` to it. This ensures that the next time you run npm start, the watcher uses the polling mode, as necessary inside a VM. 

If none of these solutions help please leave a comment in this thread.    

##### npm test hangs on macOS Sierra

If you run npm test and the console gets stuck after printing `react-scripts test --env=jsdom` to the console there might be a problem with your Watchman installation as described in facebookincubator/create-react-app#713.
We recommend deleting node_modules in your project and running `npm install` (or yarn if you use it) first. If it doesn't help, you can try one of the numerous workarounds mentioned in these issues:

facebook/jest#1767  
facebook/watchman#358   
ember-cli/ember-cli#6259    
It is reported that installing Watchman 4.7.0 or newer fixes the issue. If you use Homebrew, you can run these commands to update it:   

```bash
watchman shutdown-server

brew update

brew reinstall watchman

```

You can find other installation methods on the Watchman documentation page.     
If this still doesn’t help, try running `launchctl unload -F ~/Library/LaunchAgents/com.github.facebook.watchman.plist` 

There are also reports that uninstalling Watchman fixes the issue. So if nothing else helps, remove it from your system and try again.

    
### links ###
- [Lucidchart architecture diagram](https://www.lucidchart.com/invitations/accept/a2470714-8a58-46f8-ad44-b606e36f35c6)
- [Google Drive folder](https://drive.google.com/drive/folders/1iVGZd3-YfzJQoPSfGcn9IAad768XqOfa?usp=sharing) containing tags you can query through the PI Web API, along with some rules/examples: - 
- Link to the old ECS193 project from 2017 in AngularJS, [for reference]( https://github.com/ECS193EnergyDashboard/EnergyDashboard)


### Contact ###
[Aidan Bean](ajuengli@ucdavis.edu)      
[Disha Bendre](dbendre@ucdavis.edu)      
[Tony Xiao](bxiao@ucdavis.edu)   
[Yepu Xie](ypxie@ucdavis.edu)

