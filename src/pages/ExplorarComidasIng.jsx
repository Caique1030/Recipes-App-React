import React, { useEffect, useState } from 'react';
import ExploreByIngredients from '../components/ExploreByIngredients';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { fetchMealIngredientsList } from '../services/fetchIngredientsList';

function ExplorarComidasIng() {
  const [ingredients, setIngredients] = useState([]);

  const fetchIngredients = async () => {
    setIngredients(await fetchMealIngredientsList());
  };

  useEffect(() => {
    fetchIngredients();
  }, []);

  return (
    <main className="main-content">
      <Header pageTitle="Explorar Ingredientes" searchButton={ false } />
      <ExploreByIngredients ingredients={ ingredients } type="meal" />
      <Footer />
    </main>
  );
}

export default ExplorarComidasIng;
