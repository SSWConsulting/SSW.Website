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

      const remoteData = peopleMatter.data;

      // this is required to flatten presenter object
      if (!!presenterJson.presenter) {
        presenterJson = flattenObject(presenterJson);
      }

      // this is required to flatten presenter object
      if (!!remoteData.presenter) {
        remoteData = flattenObject(remoteData);
      }

      // merge remote data with existing data giving preference to remote data
      presenterJson = {
        ...presenterJson,
        ...remoteData,
      };

      const personName = presenterJson.name?.split(' ')?.join('-') ?? 'not-found';
      const profileImageRelativePath = `${peopleImagePath}/${personName}.jpg`;
      const peopleProfileImagePath = `${peopleDirectory}/${personName}/Images/${personName}-Profile.jpg`;

      presenterJson.profileImg = presenterJson.profileImg ?? ``;

      if (fs.existsSync(peopleProfileImagePath)) {
        fs.copyFileSync(peopleProfileImagePath, `${websitePublicPath}/${profileImageRelativePath}`);
        presenterJson.profileImg = `/${profileImageRelativePath}`;
      }

      console.log(`Writing ${contentPresenterPath}`);
      fs.writeFileSync(contentPresenterPath, matter.stringify('', presenterJson));
    });
  } catch (error) {
    console.log(error);
  }
}

const flattenObject = (obj) => {
  const flattened = {};

  for (const [key, value] of Object.entries(obj)) {
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
          Object.assign(flattened, flattenObject(value));
      } else {
          flattened[key] = value;
      }
  }

  return flattened;
};

module.exports = GetPeopleProfiles;
