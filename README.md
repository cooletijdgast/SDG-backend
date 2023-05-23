# Angular Amigo's SDG Webapp Backend

To initialize the repository on your machine, run the following command in the root directory:
```sh
npm install
```

To run the application, simply run the following command:
```sh
npm start
```

After you have installed the packages, create a database and a user with a password that has all privileges on that database. Put the database and user data into a .env file in the root directory.
Also make sure you selected the correct database, with the DB_SELECT variable in .env file. Either choose SEQUELIZE or MYSQL.
Take a look at the .env-example to know what your .env file should look like.

## Architecture

We use an adaptation of the Model - Controller - View architecture. In our case we use the controller - service - repository structure. We also use Models in every single layer.
---

### Controller

This is the first of the three layers. A request is sent to this layer, but won't pass it. Instead of sending our entire request to the next layer, we only sent parameters/objects we will use in the other layers.

Eventually, when the other layers have attempted to retreive, create, update or delete data, this layer will handle the response as well.
---

### Service

In this layer, we will enforce the business rules of our application. For example, a comment can consist of a total of max. 500 characters. This is the layer where this rule will be applied.
---

### Repository

This is the last layer. It is the layer where the actual functions and methods are executed to retreive, create, update or delete data.
---

### Models

The models are used to define our business models & also to create our database tables. 
---

## Communication
In the "util" directory, you'll find "communication.ts". Within this file there is a generic class called JSend. By adding this class to our responses as json, we ensure that we use one standard way of communication. To become more familiar with JSend, please check the [JSend Documentation](https://github.com/omniti-labs/jsend)