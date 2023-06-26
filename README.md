# UniCar-App

This project is a cross-platform mobile application built with React Native with Expo and Firebase.


## Installation

1. Clone the repository:

 ```bash
 git clone https://github.com/jonaprg/UniCar-App.git
 ```
2. Navigate to the project directory:

 ```bash
cd UniCar-App
```

3. Install the dependencies:

 ```bash
npm install
```

4. Set up Firebase:

  - Create a new Firebase project at https://console.firebase.google.com.
  - Generate your Firebase configuration object.
  - Changes the Firebase configuration in firebaseConfig :
  ```
{
  apiKey: 'apikey',
  authDomain: 'authDomain',
  projectId: 'projectId',
  storageBucket: 'storageBucket',
  messagingSenderId: 'messagingSenderId',
  appId: 'appId',
  measurementId: 'measurementId'
}

```
5. Run with Expo

To run this application using Expo, follow these steps:

- Install the Expo Client app on your iOS or Android device from the App Store or Google Play Store.
- Ensure that your computer and mobile device are connected to the same network.
- In the project directory, run the following command:

```bash
npm run start
```
- The Expo Developer Tools will open in your browser. You will see a QR code on the right side of the screen.
- Open the Expo Client app on your mobile device and scan the QR code using the device's camera. Alternatively, you can sign in to Expo using your credentials and open the project from the "Projects" tab.
- The Expo Client app will load the application, and you can interact with it on your mobile device.
- Any changes you make to the code will be automatically reloaded in the Expo app, allowing you to see the updates in real-time.
- You can also use the Expo Client app to open the application on an emulator if you have one set up.

6. Run with [Backend](https://github.com/jonaprg/UniCar)
- Set up the backend:
- Follow the instructions provided in the project's documentation to set up and configure the backend server.
- Now you need change the file (BASE_URL.js) for your IP address.









