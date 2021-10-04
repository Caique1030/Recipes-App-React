import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import { clickShare } from '../services/functionsForDetails';
import '../css/ReceitasFavoritas.css';

export default function ReceitasFavoritas() {
  const [copyOk, setCopyOk] = useState(false);
  const [favoritesFromStorage, setFavoritesFromStorage] = useState([]);
  const { push } = useHistory();

  const sendToDetails = (type, id) => {
    if (type === 'bebida') {
      push(`/bebidas/${id}`);
    }
    if (type === 'comida') {
      push(`/comidas/${id}`);
    }
  };

  const onClickFilter = (type) => {
    const arrayFromStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    switch (type) {
    case 'All':
      setFavoritesFromStorage(JSON.parse(localStorage.getItem('favoriteRecipes')));
      break;
    case 'Food':
      setFavoritesFromStorage(arrayFromStorage.filter((food) => food.type === 'comida'));
      break;
    case 'Drinks':
      setFavoritesFromStorage(arrayFromStorage
        .filter((drink) => drink.type === 'bebida'));
      break;
    default:
      setFavoritesFromStorage(favoritesFromStorage);
    }
  };

  const buttonsFilters = () => (
    <div>
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ () => onClickFilter('All') }
        className="btnFilters"
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-food-btn"
        onClick={ () => onClickFilter('Food') }
        className="btnFilters"
      >
        Food
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ () => onClickFilter('Drinks') }
        className="btnFilters"
      >
        Drinks
      </button>
    </div>
  );

  useEffect(() => {
    setFavoritesFromStorage(JSON.parse(localStorage.getItem('favoriteRecipes')));
  }, []);
  const clickFavoriteButton = (Id) => {
    const favoriteStorage = localStorage.getItem('favoriteRecipes');
    const favoritesObj = JSON.parse(favoriteStorage);
    const newFavorite = favoritesObj.filter((element) => element.id !== Id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorite));
    setFavoritesFromStorage(newFavorite);
  };
  return (
    <main className="main-content">
      <Header pageTitle="Receitas Favoritas" searchButton={ false } />
      <div className="divFav">
        {buttonsFilters()}
        {favoritesFromStorage !== null && favoritesFromStorage.map((recipes, index) => (
          <div className="divMap" key={ index }>
            <button
              alt="imageRecipe"
              type="button"
              data-testid={ `${index}-horizontal-image` }
              onClick={ () => sendToDetails(recipes.type, recipes.id) }
              src={ recipes.image }
            >
              <img
                src={ recipes.image }
                className="imgFav"
                alt="imagemComida"
              />
            </button>
            <p
              data-testid={ `${index}-horizontal-top-text` }
            >
              {recipes.type === 'bebida' ? recipes.alcoholicOrNot
                : `${recipes.area} - ${recipes.category}`}
            </p>
            <button
              type="button"
              data-testid={ `${index}-horizontal-name` }
              onClick={ () => sendToDetails(recipes.type, recipes.id) }
              className="horizontalName"
            >
              {recipes.name}
            </button>
            <button
              type="button"
              onClick={ () => clickShare(setCopyOk, recipes.type, recipes.id) }
              data-testid={ `${index}-horizontal-share-btn` }
              src={ shareIcon }
            >
              <img src={ shareIcon } alt="shareIcon" />
            </button>
            <button
              type="button"
              data-testid={ `${index}-horizontal-favorite-btn` }
              onClick={ () => clickFavoriteButton(recipes.id) }
              src={ blackHeartIcon }
            >
              <img src={ blackHeartIcon } alt="blackHeart" />
            </button>
          </div>
        ))}
        <p>{copyOk ? 'Link copiado!' : null}</p>
      </div>
    </main>
  );
}
