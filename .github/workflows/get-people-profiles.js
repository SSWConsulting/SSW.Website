const matter = require('gray-matter');
const fs = require('fs');

const CopyPeopleImage = (peopleDirectory, peopleImageDirectory, person) => {
  const imagePath = `${peopleImageDirectory}/${person}.jpg`;

  fs.copyFile(`${peopleDirectory}/${person}/images/${person}-Profile.jpg`, `${peopleImageDirectory}/${person}.jpg`, (err) => {});
  return imagePath;
}

const GetPeopleProfiles = ( {github, context, peopleDirectory, presentersDirectory, peopleImageDirectory} ) => {
  var people = fs.readdirSync(peopleDirectory);
  const presenters = fs.readdirSync(presentersDirectory);

  people = people.filter(peopleFolder => peopleFolder.includes('-'))

  people.forEach(person => {
    const presenterJson = {
      content: '',
      data: {}
    }

    const file = matter.read(`${peopleDirectory}/${person}/${person}.md`);

    presenterJson.data.profileImg = CopyPeopleImage(peopleDirectory, peopleImageDirectory, person);
    presenterJson.data.presenter = {
      name: `${person.replace('-', ' ')}`,
      peopleProfileURL: `https://ssw.com.au/people/${person}`,
    },
    presenterJson.data.about = file.content;

    fs.writeFileSync(`${presentersDirectory}/${person.toLocaleLowerCase()}.mdx`, matter.stringify('', presenterJson.data));
  })
}

module.exports = GetPeopleProfiles;
