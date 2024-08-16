import { ReactElement } from "react";
import { Link } from "react-router-dom";

export function Header(): ReactElement {
    return (
        <header className="header container">
            <p className="logo">Cocktails!</p>
            <nav className="navbar">
                <Link className="link" to="/">
                Home
                </Link>
                <Link className="link" to="random-cocktail">
                Random
                </Link>
                <Link className="link" to="search">
                Search CocktailS
                </Link>
                <Link className="link" to="info">
                Cocktail Info
                </Link>
            </nav>
        </header>
    );
}