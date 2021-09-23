const URL_BASE_API = 'https://www.thecocktaildb.com/api/json/v1/1';

export const fetchIngredienteBeb = async (input) => {
  const response = await fetch(`${URL_BASE_API}/filter.php?i=${input}`);
  const data = await response.json();
  return data.drinks;
};

export const fetchNameBeb = async (input) => {
  const response = await fetch(`${URL_BASE_API}/search.php?s=${input}`);
  const data = await response.json();
  return data.drinks;
};

export const fetchPrimeiraLetraBeb = async (input) => {
  const response = await fetch(`${URL_BASE_API}/search.php?f=${input}`);
  const data = await response.json();
  return data.drinks;
};
