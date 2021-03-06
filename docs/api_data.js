define({ "api": [
  {
    "type": "post",
    "url": "/login",
    "title": "Login User",
    "name": "LoginUser",
    "group": "Users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>User's Email</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>User's Password</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "api",
            "description": "<p>Token</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "user",
            "description": "<p>MongoDB User Object</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./controllers/users/loginUser.js",
    "groupTitle": "Users"
  },
  {
    "type": "post",
    "url": "/refresh",
    "title": "Refresh User Token",
    "name": "RefreshToken",
    "group": "Users",
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"cookie\": \"refreshToken=<refresh token>\"\n}",
          "type": "String"
        },
        {
          "title": "Header-Example:",
          "content": "{\n  \"authorization\": \"Bearer <your token>\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>User Token</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "User",
            "description": "<p>MongoDB user Object</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./controllers/users/refreshToken.js",
    "groupTitle": "Users"
  },
  {
    "type": "post",
    "url": "/register",
    "title": "Register User",
    "name": "RegisterUser",
    "group": "Users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "fullName",
            "description": "<p>User's Full Name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>User's Email</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "youtube_channel_id",
            "description": "<p>User's Youtube Channel Id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>User's Password</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "api",
            "description": "<p>Token</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "user",
            "description": "<p>MongoDB User Object</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./controllers/users/createUser.js",
    "groupTitle": "Users"
  },
  {
    "type": "post",
    "url": "/update",
    "title": "User Update",
    "name": "UpdateUser",
    "group": "Users",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "json",
            "optional": false,
            "field": "token",
            "description": "<p>Authorization value.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"authorization\": \"Bearer token\"\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "fullName",
            "description": "<p>User's Full Name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>User's Email</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>User's Password</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "youtube_channel_id",
            "description": "<p>User's Youtube channel ID</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "user",
            "description": "<p>MongoDB User Object</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./controllers/users/updateUser.js",
    "groupTitle": "Users"
  },
  {
    "type": "post",
    "url": "/me",
    "title": "User Details",
    "name": "findUser",
    "group": "Users",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "json",
            "optional": false,
            "field": "token",
            "description": "<p>Authorization value.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "\n{\n  \"authorization\": \"Bearer token\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "user",
            "description": "<p>MongoDB User Object</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./controllers/users/findUser.js",
    "groupTitle": "Users"
  },
  {
    "type": "get",
    "url": "/",
    "title": "Get User videos",
    "name": "Get_Youtube_Videos",
    "group": "Youtube",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "json",
            "optional": false,
            "field": "token",
            "description": "<p>Authorization value.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"authorization\": \"Bearer token\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "api",
            "description": "<p>Array of objects with 50 as max youtube video results</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./controllers/youtube/userVideos.js",
    "groupTitle": "Youtube"
  },
  {
    "type": "get",
    "url": "/:id",
    "title": "Get User videos details",
    "name": "VideoDetails",
    "group": "Youtube",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "json",
            "optional": false,
            "field": "token",
            "description": "<p>Authorization value.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"authorization\": \"Bearer token\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "api",
            "description": "<p>Videos Object</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./controllers/youtube/videoDetails.js",
    "groupTitle": "Youtube"
  }
] });
