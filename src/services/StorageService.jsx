const StorageService = {
    myLocalStorage () {
        let likedIds = localStorage.getItem('jordanFavoris');
        likedIds = likedIds ? JSON.parse(likedIds) : [];

        return likedIds
    }
};

export default StorageService;