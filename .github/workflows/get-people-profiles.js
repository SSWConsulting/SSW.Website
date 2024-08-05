const matter = require('gray-matter');
const fs = require('fs');

const GetPeopleProfiles = async ( {
  github,
  context,
  peopleBaseUrl,
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

  try {
    const people = await fetch(`${peopleBaseUrl}/people.json`);
    const peopleList = await people.json();

    peopleList.forEach(async person => {
      console.log(`Processing ${person}`);

      const contentPresenterPath = `${presentersDirectory}/${person}.mdx`;
      const peopleMd = await fetch(`${peopleBaseUrl}/${person}/profile.md`);
      const peopleMdStr = await peopleMd.text();

      var presenterJson = {};
      const peopleMatter = matter(peopleMdStr);

      if (fs.existsSync(contentPresenterPath)) {
        const existingPresenterFile = matter.read(contentPresenterPath);
        presenterJson = existingPresenterFile.data;
      }

      presenterJson = {
        ...presenterJson,
        ...peopleMatter.data,
      };

      const profileImageRelativePath = `${peopleImagePath}/${person}.jpg`;
      const peopleProfileImagePath = `${peopleDirectory}/${person}/Images/${person}-Profile.jpg`;

      presenterJson.profileImg = presenterJson.profileImg ?? ``;
      console.log(peopleProfileImagePath)

      if (fs.existsSync(peopleProfileImagePath)) {
        fs.copyFileSync(peopleProfileImagePath, `${websitePublicPath}/${profileImageRelativePath}`);
        presenterJson.profileImg = `/${profileImageRelativePath}`;
      }

      console.log(`Writing ${contentPresenterPath}`);
      fs.writeFileSync(contentPresenterPath, matter.stringify('', presenterJson));
    });
  } catch (error) {
    console.error(error);
  }
}

module.exports = GetPeopleProfiles;
