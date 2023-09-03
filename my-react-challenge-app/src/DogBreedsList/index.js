import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import './index.css'

const DogBreedsList = (props) => {
  const { urlDetails, toggleDetails } = props
  const { uniqueId, imageUrl, isFavourite } = urlDetails

  const onClickFav = () => {
    toggleDetails(uniqueId)
  }
  const favouriteDog = isFavourite ? (
    <AiFillHeart className="heart-pic" />
  ) : (
    <AiOutlineHeart className="heart-pic1" />
  )

  return (
    <li className="dog-item">
      <div className="img-container">
        <img src={imageUrl} alt="dogPic" className="dog-image" />
        <button className="fav-btn" type="button" onClick={onClickFav}>
          {favouriteDog}
        </button>
      </div>
    </li>
  )
}

export default DogBreedsList
