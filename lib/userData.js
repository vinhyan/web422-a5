import { getToken } from './authenticate';

export async function addToFavourites(id) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/favourites/${id}`,
    {
      method: 'PUT',
      body: JSON.stringify({ id: id }),
      headers: {
        'content-type': 'application/json',
        Authorization: 'JWT ' + getToken(),
      },
    }
  );

  const data = await res.json();
  // console.log('1.addFav', data);
  if (res.status === 200) {
    // console.log('addFav', data);
    return data;
  } else {
    return [];
  }
}

export const removeFromFavourites = async (id) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/favourites/${id}`,
    {
      method: 'DELETE',
      body: JSON.stringify({ id: id }),
      headers: {
        'content-type': 'application/json',
        Authorization: 'JWT ' + getToken(),
      },
    }
  );

  const data = await res.json();
  if (res.status === 200) {
    return data;
  } else {
    return [];
  }
};

export const getFavourites = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favourites`, {
    method: 'GET',
    // body: JSON.stringify({ id: id }),
    headers: {
      'content-type': 'application/json',
      Authorization: 'JWT ' + getToken(),
    },
  });

  const data = await res.json();
  if (res.status === 200) {
    return data;
  } else {
    return [];
  }
};

export const addToHistory = async (id) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/history/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ id: id }),
    headers: {
      'content-type': 'application/json',
      Authorization: 'JWT ' + getToken(),
    },
  });

  const data = await res.json();
  if (res.status === 200) {
    return data;
  } else {
    return [];
  }
};

export const removeFromHistory = async (id) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/history/${id}`, {
    method: 'DELETE',
    body: JSON.stringify({ id: id }),
    headers: {
      'content-type': 'application/json',
      Authorization: 'JWT ' + getToken(),
    },
  });

  const data = await res.json();
  if (res.status === 200) {
    return data;
  } else {
    return [];
  }
};

export const getHistory = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/history`, {
    method: 'GET',
    // body: JSON.stringify({ id: id }),
    headers: {
      'content-type': 'application/json',
      Authorization: 'JWT ' + getToken(),
    },
  });

  const data = await res.json();
  if (res.status === 200) {
    return data;
  } else {
    return [];
  }
};
