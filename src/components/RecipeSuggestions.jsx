import React from 'react';
import recipes from '../data/recipes';

const RecipeSuggestions = ({ foodName }) => {
  return (
    <div className="mt-4">
      <h3 className="text-xl font-semibold">Recipes for {foodName}</h3>
      <ul className="list-disc ml-5">
        {recipes[foodName]?.map((recipe, index) => (
          <li key={index}>{recipe}</li>
        )) || <li>No recipes found</li>}
      </ul>
    </div>
  );
};

export default RecipeSuggestions;