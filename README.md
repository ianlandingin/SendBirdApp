Requirements:
1. Add edit details page/component (getUpdateUserInfo)
2. Track when a channel is created
3. Add APIs in backend:
        a. Save to the database the details of a channel created.
	■ Channel URL (from sendbird)
	■ Created by identifier (assumption id of user that created the channel)
	■ Chatmate identifier (only 1-1 channels are saved in the database)
	■ Deleted or not 
	■ Total number of messages sent on channel (default 0) (assuming count has maximum of 32,000 then deleted oldest messages)
	■ When the channel is created (assuming only needs date )
	■ Other data that you think is good to store in the database
        b. Save to the database when a user is created (when site is opened, a user is automatically created)
	■ User identifier
	■ User nickname
	■ User profile URL
	■ Deleted or not
	■ When the user is created
	■ Other data that you think is good to store in the database
4. Update user entry when nickname or image is updated

Database Schema:
CREATE DATABASE "FSD_2023_Landingin";

channels:
- channel_url (string) PRIMARY KEY
- user_id_owner (string) (one-to-many with user)
- chatmate_id (string)
- messages (integer)
- date_created (date)
- members (array)

CREATE TABLE channels(
channel_url  VARCHAR NOT NULL PRIMARY KEY,
owner_user_id VARCHAR(50) NOT NULL REFERENCES users(id),
chatmate_id VARCHAR(50) NOT NULL,
messages SMALLINT NOT NULL DEFAULT 0,
date_created TIMESTAMPTZ DEFAULT NOW()
);

users:
- id (string)
- nickname (string)
- profile_url (string)
- is_deleted (boolean)
- date_created (date)
- contacts (array)

CREATE TABLE users(
id  VARCHAR(50) NOT NULL PRIMARY KEY,
nickname  VARCHAR(50) NOT NULL,
profile_url  VARCHAR NOT NULL,
is_deleted BOOL DEFAULT 'no',
date_created TIMESTAMPTZ DEFAULT NOW()
);


Upon Starting this task, I've followed the given instructions in the Full-Stack Developer Technical Task_Apptain GmbH_v7.pdf file.
And did extensive research and reading in the sendbird official website.

I was able to get the APP_ID and USER_ID from the sample app given by the link in the pdf file.
I've tried dozens of times integrating but to no avail. It seems that an ACCESS_TOKEN is needed and I tried my best to find that using my browser dev tools.
Still to no avail. 

I've decided to create my own APP as suggessted by the sendbird "Send your first message" tutorial. 
I was able to create my own APP and integrate it to a customized React app code. 

Issues:
- Module instructiosn are lacking
- Documentation
- limited to no instructional videos in youtube or other resource websites.

Assuming I was able to get the module to fetch user data, channel data, etc from the APP.

I've developed the backend using nodejs expressjs.

2 routes for API endpoints:
- userRoutes
- channelRoutes

I've also created postman/thunder client collection, both for prod and local hosts, during endpoint testing.

I would like to Thank you for giving me this challenge and task and for giving me the opportunity to apply for the position.
