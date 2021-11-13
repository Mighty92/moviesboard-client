import { useEffect, useState } from "react";
import StorageService from "./StorageService";
import { BsBookmark, BsBookmarkCheckFill } from "react-icons/bs";

const LikeButton = ( { id } ) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const updateFavorites = () => {
    const newValue = !isFavorite;
    setIsFavorite(newValue);

    let likedIds = StorageService.myLocalStorage();

    if (likedIds.includes(id)) {
      setIsFavorite(false);
      likedIds.splice(likedIds.indexOf(id), 1);
    }
    else {
      setIsFavorite(true);
      likedIds.push(id);
    }

    localStorage.setItem('jordanFavoris', JSON.stringify(likedIds));
  }

  useEffect(() => {
    let likedIds = StorageService.myLocalStorage();

    if (likedIds.includes(id)) {
      setIsFavorite(true);
    }
  }, [id])

  return (
    <button onClick={updateFavorites}>
      {!isFavorite && <BsBookmark/>}
      {isFavorite && <BsBookmarkCheckFill />}
    </button>
  );
};

export default LikeButton;