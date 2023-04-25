# Air Ticket Booking

It is an Air Ticket booking system that allows users to book flights for their desired destinations.

```
For Creating This Backend App I have Used Node.js, Express.js, Mongo Atlas, JsonWebToken, Bcrypt
```
---
# Dependencies

>     "bcrypt": "^5.1.0"

>      "dotenv": "^16.0.3"

>     "express": "^4.18.2"

>     "jsonwebtoken": "^9.0.0"

>     "mongoose": "^7.0.5"

>     "nodemon": "^2.0.22"
---
# Model

- User Model 

```
    name: {type: String,required:true},
    email: {type: String,required:true},
    password: {type: String,required:true}
```

- Flights Model

```
    airline: {type: String,required:true},
    flightNo: {type: String,required:true},
    departure: {type: String,required:true},
    arrival: {type: String,required:true},
    departureTime: {type: Date,required:true},
    arrivalTime: {type:Date,required:true},
    seats: {type: Number,required:true},
    price: {type: Number,required:true}
```
### In departureTime and arrivalTime, the time should be given in this form: 
```
    "departureTime": "2023-04-25T11:41:42.023Z",
    "arrivalTime": "2023-04-25T12:41:42.023Z",
``` 
> You can get this formet using the "new Date()" method.
### If you don't follow this format, then you're not going to have the expected output.
- Booking Model
```
    user : { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    flight : { type: mongoose.Schema.Types.ObjectId, ref: 'Flight' }
```

----
# Endpoints
>     POST: /api/register
For Register  body :{name,email,password}
- This endpoint allow users to register their account.

>      POST: /api/login
For Register  body :{email,password}
- This endpoint allow users to login.

>      GET:  /api/flights
- This endpoint return a list of all available flights.

>       GET: api/flights/:id
- This endpoint return the details of a specific flight identified by its ID.

>       POST: api/flights/:id

-  This endpoint allow users to add new flights to the system.

>       PATCH: /api/flights/:id 
- This endpoint allow users to update the details of a specific flight identified by its ID.

>       DELETE: /api/flights/:id 
-  This endpoint allow users to delete a specific flight identified by its ID.
>       POST: /api/booking 
-This endpoint allow the user to book flights.
```
For booking, you have to login first or You can't book any flights.
```
