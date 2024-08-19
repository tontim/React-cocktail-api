import { useState, useEffect } from 'react';
import { ICocktail } from '../interfaces';

export function LandingPage() {
    const [cocktail, setCocktail] = useState<ICocktail | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchRandomCocktail = () => {
        setLoading(true);
        fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
            .then(response => {
                if (!response.ok) {
                    throw new Error('No connection to API.');
                }
                return response.json();
            })
            .then(data => {
                setCocktail(data.drinks[0]);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error: ', error);
                setError('Failed to load cocktail.');
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchRandomCocktail();
    }, []);

    if (loading) return <div>Loading.</div>;
    if (error) return <div>{error}</div>;
    if (!cocktail) return <div>No cocktail found!</div>;

    const getIngredients = (cocktail: ICocktail) => {
        const ingredients = [];
        for (let i = 1; i <= 15; i++) {
            const ingredient = cocktail[`strIngredient${i}` as keyof ICocktail];
            const measure = cocktail[`strMeasure${i}` as keyof ICocktail];
            if (ingredient) {
                ingredients.push(`${measure || ''} ${ingredient}`.trim());
            }
        }
        return ingredients;
    };

    const ingredients = getIngredients(cocktail);

    return (
        <div className='landing container'>
            <h1>Your lucky cocktail of today!</h1>
            <button onClick={fetchRandomCocktail} disabled={loading}>
                {loading ? 'Loading.' : 'New drink'}
            </button>
            <h2>{cocktail.strDrink}</h2>
            <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
            <h3>Ingredients:</h3>
            <ul>
                {ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                ))}
            </ul>
            <p>{cocktail.strInstructions}</p>
        </div>
    );
}
