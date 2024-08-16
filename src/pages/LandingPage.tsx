import { useState, useEffect } from 'react';
import { ICocktail } from '../interfaces';


export function LandingPage() {
    const [cocktail, setCocktail] = useState<ICocktail | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
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
    }, []);

    if (loading) return <div>Loading.</div>;
    if (error) return <div>{error}</div>;
    if (!cocktail) return <div>No cocktail found!</div>;

    return (
        <div>
            <h1>Your lucky cocktail of today!</h1>
            <h2>{cocktail.strDrink}</h2>
            <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
            <p>{cocktail.strINstructions}</p>
        </div>
    );
}
