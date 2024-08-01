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
script({
  github,
  context,
  peopleDirectory: `${process.env.GITHUB_WORKSPACE}/ssw-people-profiles`,
  websiteContentPath: `${process.env.GITHUB_WORKSPACE}/main/content`,
  websitePublicPath: `${process.env.GITHUB_WORKSPACE}/main/public`,
  presentersPath: `presenters`,
  peopleImagePath: `images/people`
});
