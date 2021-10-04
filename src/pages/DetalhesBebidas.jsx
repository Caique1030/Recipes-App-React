import PropTypes from 'prop-types';
import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router';
import fetchIdBebidas from '../services/fetchIdBebidas';
import getSixCards, { ChoiceButton,
  getMeasure, getIngredient } from '../services/functionsForDetails';
import { fetchRecomendationsMeals } from '../services/fetchIdComidas';
import '../css/CardsRecomendations.css';
import ShareAndFavButton from '../components/ShareAndFavButton';
import { modifyDrinkRecipeInfo } from '../GlobalFuncs/modifyRecipeInfo';
import '../css/Detalhes.css';

function DetalhesBebidas({ match: { params: { id } } }) {
  const [objIdReceita, setObjIdReceita] = useState();
  const [recomendations, setObjRecomentations] = useState();
  const { push } = useHistory();
  const fetchId = useCallback(async () => {
    setObjIdReceita(await fetchIdBebidas(id));
    setObjRecomentations(await fetchRecomendationsMeals());
  }, [id]);

  useEffect(() => {
    fetchId();
  }, [fetchId]);

  const inFButton = {
    id,
    tipo: 'bebidas',
  };

  const getIngredientAndMeasure = () => {
    const array = [];
    if (getMeasure(objIdReceita, 'bebida') !== undefined
    && getIngredient(objIdReceita, 'bebidas') !== undefined) {
      const measure = getMeasure(objIdReceita, 'bebida');
      const ingredient = getIngredient(objIdReceita, 'bebidas');
      const mix = [{
        ingredient,
        measure,
      }];
      for (let i = 0; i < mix[0].ingredient.length; i += 1) {
        array.push(`${mix[0].ingredient[i]} - ${mix[0].measure[i]}`);
      }
      if (array.some((element) => element.includes('undefined'))) {
        const withOutUndefined = array.map((element) => {
          const beatifulDrinks = element.replace(' - undefined', '');
          return beatifulDrinks;
        });
        return withOutUndefined;
      }
      return array;
    }
  };

  if (objIdReceita === undefined) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="divDetalhesBebidas">
      <img
        width="300px"
        data-testid="recipe-photo"
        src={ objIdReceita.strDrinkThumb }
        alt="recipeFoto"
        className="imgDetalhes"
      />
      <h1
        className="recipeTitle"
        data-testid="recipe-title"
      >
        { objIdReceita.strDrink }
      </h1>
      <div className="btnFav">
        <ShareAndFavButton recipeInfos={ modifyDrinkRecipeInfo(objIdReceita) } />
      </div>
      <p className="alc" data-testid="recipe-category">{objIdReceita.strAlcoholic}</p>
      <section className="ingredients">
        <p>Ingredients:</p>
        {getIngredientAndMeasure().map((element, index) => (
          <div key={ index }>
            <p data-testid={ `${index}-ingredient-name-and-measure` }>{element}</p>
          </div>
        ))}
      </section>
      <p>Instructions:</p>
      <p
        className="pInstruction"
        data-testid="instructions"
      >
        { objIdReceita.strInstructions }
      </p>
      <p data-testid="video" />
      <div className="cardsRecomendations">
        {getSixCards(recomendations) !== undefined && getSixCards(recomendations)
          .map((element, index) => (
            <div data-testid={ `${index}-recomendation-card` } key={ index }>
              <img style={ { width: '180px' } } src={ element.strMealThumb } alt="imag" />
              <p data-testid={ `${index}-recomendation-title` }>{element.strMeal}</p>
            </div>
          ))}
      </div>
      {ChoiceButton(inFButton, push)}
    </div>
  );
}

DetalhesBebidas.propTypes = {
  match: PropTypes.shape().isRequired,
};

export default DetalhesBebidas;
