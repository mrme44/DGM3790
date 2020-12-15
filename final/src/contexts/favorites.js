import React, { createContext, useState } from 'react';

const favoritesContext = createContext()

const FavoritesContextProvider = props => {
    const [favorites, setFavorites] = useState([])

    function removeFavorite(id){
        const newFavorites = favorites.filter((item) => item.id !== id)
        setFavorites(newFavorites)
    }
    function addFavorite(item){
        setFavorites([...favorites, item])
    }
    function toggleFavorite(item){
        //console.log('toggling', item.question);
        if ( favorites.some(it => it.id === item.id) ){
            removeFavorite(item.id)
        } else {
            addFavorite(item)
        }
    }
    // function hasFavorite(item){
    //     return favorites.some(it => it.id === item.id)
    // }

    return (
        <favoritesContext.Provider value={[favorites, toggleFavorite, removeFavorite, addFavorite]}>
            {props.children}
        </favoritesContext.Provider>
    );
}

export default favoritesContext;
export {FavoritesContextProvider};
