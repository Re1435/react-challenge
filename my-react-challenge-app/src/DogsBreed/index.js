import React, { Component } from 'react'
import { AiFillHeart, AiOutlineSearch } from 'react-icons/ai'
import DogBreedsList from '../DogBreedsList'
import { v4 as uuidv4 } from 'uuid'

import './index.css'

class DogsBreed extends Component {
  state = {
    inputText: '',
    dogBreedDetails: [],
    favouritesList: [],
  }

  componentDidMount() {
    this.getDogsList()
  }

  onChangeInput = (event) => {
    this.setState({ inputText: event.target.value })
  }

  getDogsList = async () => {
    const url = `
      https://dog.ceo/api/breed/hound/images`
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const fetchData = await response.json()
      const updatedData = fetchData.message.map((eachData) => ({
        uniqueId: uuidv4(),
        imageUrl: eachData,
        isFavourite: false,
      }))
      this.setState({ dogBreedDetails: updatedData })
    }
  }

  getSearchRes = () => {
    const { dogBreedDetails, inputText } = this.state
    const filterRes = dogBreedDetails.filter((breed) =>
      breed.imageUrl.includes(inputText.toLowerCase())
    )
    const breedDetails = filterRes.splice(0, 10)
    this.setState({ favouritesList: breedDetails })
  }

  toggleIcon = (uniqueId) => {
    this.setState((prevState) => ({
      favouritesList: prevState.favouritesList.map((eachUrl) => {
        if (uniqueId === eachUrl.uniqueId) {
          return { ...eachUrl, isFavourite: !eachUrl.isFavourite }
        } else {
          return eachUrl
        }
      }),
    }))
  }

  displayFavBreeds = () => {
    const { favouritesList } = this.state
    const favBreedsList = favouritesList.filter(
      (each) => each.isFavourite === true
    )
    return (
      <div className="fav-breeds-page">
        <AiFillHeart className="heart-fill-fav-icon" />
        <span className="fav-heading">Favourites</span>

        <ul className="favdogs-list">
          {favBreedsList.map((eachFav) => (
            <li key={eachFav.uniqueId} className="fav-list">
              <div className="img-container">
                <img
                  src={eachFav.imageUrl}
                  alt="favBreed"
                  className="fav-breed"
                />
                <AiFillHeart className={eachFav.isFavourite && 'icon'} />
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  render() {
    const { favouritesList, inputText } = this.state
    const favBreedsList1 = favouritesList.filter(
      (each) => each.isFavourite === true
    )
    const favLength = favBreedsList1.length

    return (
      <div className="dogbreed-page">
        <div className="header-container">
          <h1 className="heading">Dog Breeds</h1>
          <AiFillHeart className="heart-fill-icon" />
        </div>
        <div className="search-bar-container">
          <input
            type="search"
            className="search-input"
            placeholder="Search"
            value={inputText}
            onChange={this.onChangeInput}
          />
          <button className="search-btn" onClick={this.getSearchRes}>
            <div className="search-container">
              <AiOutlineSearch className="search-icon" />
              <span className="search-text">Search</span>
            </div>
          </button>
        </div>
        <div className="dogsbreed-container">
          <ul className="dogs-list">
            {favouritesList.map((each) => (
              <DogBreedsList
                key={each.uniqueId}
                urlDetails={each}
                toggleDetails={this.toggleIcon}
              />
            ))}
          </ul>
        </div>
        <br className="br-line" />
        {favLength > 0 && this.displayFavBreeds()}
      </div>
    )
  }
}

export default DogsBreed
