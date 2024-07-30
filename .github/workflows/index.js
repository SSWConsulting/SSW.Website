const script = require('./get-people-profiles.js');

script({
  github: {},
  context: {},
  peopleDirectory: '../../../SSW.People.Profiles',
  presentersDirectory: './presenters',
  peopleImageDirectory: './presenters/images'
})
