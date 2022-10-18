export function mapUserData(userData) {
  const formData = {
    userId: userData.id,
    name: userData.name,
    username: userData.username,
    email: userData.email,
    phone: userData.phone,
    companyName: userData.company.name,
    street: userData.address.street,
    suite: userData.address.suite,
    city: userData.address.city,
    zipcode: userData.address.zipcode,
    lat: getGeo(userData.address.geo).lat,
    lng: getGeo(userData.address.geo).lng,
  };

  // user
  if (userData.website) formData.website = userData.website;
  if (userData.avatar) formData.avatar = mapPathImg(userData.avatar);

  // company
  if (userData.company?.catchPhrase)
    formData.catchPhrase = userData.company.catchPhrase;
  if (userData.company?.bs) formData.bs = userData.company.bs;

  return formData;
}

export function getGeo(rawGeo) {
  try {
    return JSON.parse(rawGeo);
  } catch {
    return { lat: '', lng: '' };
  }
}

function mapPathImg(imgUrl) {
  const url = new URL(imgUrl);
  const fileName = url.pathname.split('/').slice(-1)[0];
  return [
    {
      uid: fileName,
      name: fileName,
      status: 'done',
      url: imgUrl,
    },
  ];
}
