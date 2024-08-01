const script = require('./get-people-profiles.js');

script({
  github: {},
  context: {},
  peopleDirectory: '../../../SSW.People.Profiles',
  websiteContentPath: './content',
  websitePublicPath: './public',
  presentersPath: 'presenters',
  peopleImagePath: 'images/people'
})
