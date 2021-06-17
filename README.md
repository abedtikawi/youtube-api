# A Node.js REST API built using Express.js that Aggregates the videos of Youtubers & Social Influencers.

> # Assignment Guideline.

---

#### Build Two Endpoints.

---

- User Management Endpoints.
  - Create User.
  - Login User.
  - Refresh Token.
  - Get User Details.
  - Update User Detais.

---

- Videos Endpoints
  - Get a collection of User Videos using the Youtube API.
  - Get Video details for a specific video.

---

## Install Dependencies.

```bash
    npm install
```

## Start server.

```bash
    npm start
```

## Directory and Folder Structure

---

    ### A Top-level directory Folder layout
    ..
    ..
    ├── controllers           # Controller and Logic code files
    |            |── users
    |            |── youtube
    |            └── facebook
    |
    ├── docs                  # Documentation files using apiDocs
    ├── db                    # ODM (Mongoose connector)
    ├── middlewares           # Handles authentication and jwt verification
    |        └── users
    |
    ├── utils                 # Tools and utilities
    ├── models                # Database schema for manipulating data
    |
    ├── routers               # Routing configuration
    |       |── users
    |       |── youtube
    |       └── facebook
    |
    ├── node_modules          # node packages
    ├── main.js               # server entry point
    ├── .env                  # secret tokens and access points
    └── README.md
    ###

---

> ## API Design Users Endpoint
>
> | Route Type | Route           | Params                                                              | Response                |
> | ---------- | --------------- | ------------------------------------------------------------------- | ----------------------- |
> | POST       | /users/login    | email & password                                                    | jwt token & user object |
> | POST       | /users/register | email & password & fullname & youtube_channel_id                    | jwt token & user object |
> | POST       | /users/refresh  | jwt token in ["authorization"] header & jwt refresh token in cookie | jwt token & user object |
> | GET        | /users/me       | jwt token in ["authorization"] header                               | user object             |
> | PUT        | /users/update   | jwt token in ["authorization"] header & update attribute(s)         | user object             |

---

> ## API Design Youtube Endpoint
>
> | Route Type | Route        | Params                                              | Response                                    |
> | ---------- | ------------ | --------------------------------------------------- | ------------------------------------------- |
> | GET        | /youtube/    | jwt token in ["authorization"] header               | collection of youtube videos of quantity 50 |
> | GET        | /youtube/:id | jwt token in ["authorization"] header & id of video | youtube video details with statistics       |

## For Further Documentation, Please refer to the apiDocs found in index.html

---

    ### A Top-level directory layout for the location of docs using apiDocs
    ...
    ...
    ├── docs                # Documentation folder (apiDocs)
    |      |
    |      └── index.html      # More descriptive documentation regarding routes
    |
    ├── controllers
    ├── middlewares
    ├── models
    ├── node_modules
    ...

---

## To test the Endpoints, please refer to the postman link:

>[Youtube-Api-Collection](https://www.getpostman.com/collections/9de395e4dea25aefc17f)
