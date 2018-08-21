const db = require('../db');

const seedUsers = () => db.Promise.map([
  {email: 'BestTutor', password: 'tutor101'},
  {email: 'BetterTutor', password: 'tutor102'},
  {email: 'BestStudent', password: 'tutor102'},
  {email: 'harry@hogwarts.edu', password: 'ronismyfriend'},
  {email: 'johnn@john.com', password: 'johnjohn'},
], user => db.model('users').create(user));

const seedRequests = () => db.Promise.map([
  {sender_id: 1, receiver_id: 3}
], request => db.model('requests').create(request));

 db.didSync
   .then(() => db.sync({force: true}))
   .then(seedUsers)
   .then(users => console.log(`Seeded ${users.length} users OK`))
   .then(seedRequests)
   .then(requests => console.log(`Seeded ${requests.length} requests OK`))
   .catch(error => console.error(error))
   .finally(() => db.close());
