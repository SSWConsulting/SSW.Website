const matter = require('gray-matter');
const fs = require('fs');

const GetPeopleProfiles = ( {
  github,
  context,
  peopleDirectory,
  websiteContentPath,
  websitePublicPath,
  presentersPath,
  peopleImagePath
} ) => {
  const presentersDirectory = `${websiteContentPath}/${presentersPath}`;
  const peopleImageDirectory = `${websitePublicPath}/${peopleImagePath}`;

  fs.mkdirSync(presentersDirectory, { recursive: true });
  fs.mkdirSync(peopleImageDirectory, { recursive: true });

  var people = fs.readdirSync(peopleDirectory);

  people = people.filter(peopleFolder => peopleFolder.includes('-') && peopleFolder !== 'We-are-hiring')

  people.forEach(person => {
    const presenterFilePath = `${presentersDirectory}/${person.toLocaleLowerCase()}.mdx`
    const existingPresenterFile = fs.existsSync(presenterFilePath);
    var presenterJson = {}

    // Don't Overwrite existing fields that we can't get from the people profiles
    if (existingPresenterFile) {
      presenterJson = matter.read(presenterFilePath).data ?? {};
    }

    const profileImageRelativePath = `${peopleImagePath}/${person}.jpg`;
    const peopleProfileImagePath = `${peopleDirectory}/${person}/Images/${person}-Profile.jpg`;

    presenterJson.profileImg = presenterJson.profileImg ?? ``;

    if (fs.existsSync(peopleProfileImagePath)) {
      fs.copyFileSync(peopleProfileImagePath, `${websitePublicPath}/${profileImageRelativePath}`);
      presenterJson.profileImg = `/${profileImageRelativePath}`;
    }

    presenterJson.presenter = presenterJson.presenter ?? {
      name: `${person.replace('-', ' ')}`,
      peopleProfileURL: `https://ssw.com.au/people/${person}`,
    };

    const file = matter.read(`${peopleDirectory}/${person}/${person}.md`);
    const contentFiltered = file.content?.split(/\n\s*\n/).filter(line => !line.includes('imgBadge')).join();
    presenterJson.about = presenterJson.about ?? contentFiltered?.split(/\n/, 4).join();

    fs.writeFileSync(presenterFilePath, matter.stringify('', presenterJson));
  })
}

module.exports = GetPeopleProfiles;
