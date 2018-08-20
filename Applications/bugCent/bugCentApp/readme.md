# Details in Version 1.0.0

## Introduction
bugCent runs on a server that stores the information on the sponsors, bugs, programs, and developers on a (PostgreSQL) database. It can receive any request detailed in bugCentApp/server/route/index.js. The handling of the requests are detailed in the files under bugCentApp/server/controllers. The database schema and migrations are handled in bugCentApp/server/models and bugCentApp/server/migrations respectively. bugCentApp/server/config/config.json handles the location and details of the database. Check bugCentApp/package.json for the detailed dependencies.

## Installation
Install NodeJS at https://nodejs.org/en/ and run npm install in ncent.github.io/Applications/bugCentApp/.

## Implementation
1. NodeJS and PostgreSQL with Sequelize


## Resources
1. User:
- UUID
- Name
- Email
- isCompany (boolean value to record whether a user is a company)
- list of bug_uuid's


2. Bug:
- UUID
- Status
- Description
- List of user_UUIDs

3.  bugUser:
- UUID
- user_uuid
- bug_uuid
- Status
- List of Developer_UUID

