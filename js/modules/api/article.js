export const getPosts = async (id) => {
  let url = 'https://gorest.co.in/public-api/posts';
  if (id) {
    url += '/' + id;
  }

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
    },
  });

  return await response.json();
};

export const getAuthor = async (id) => {
  const response = await fetch('https://gorest.co.in/public/v2/users/' + id, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
    },
  });

  return await response.json();
};
