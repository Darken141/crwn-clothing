import React from 'react'
import styled from 'styled-components'

import CustomButton from '../custom-button/custom-button.component'

import { connect } from 'react-redux'
import { addItem } from '../../redux/cart/cart.actions'

// import './collection-item.styles.scss'

const CollectionItemContainer = styled.div`
    width: 22vw;
    display: flex;
    flex-direction: column;
    height: 350px;
    align-items: center;
    position: relative;

    &:hover {
        .image {
            opacity: .8;
        }

        button {
            display: flex;
            opacity: .85;
        }
    }
`

const AddButton = styled(CustomButton)`
    width: 80%;
    opacity: .7;
    position: absolute;
    top: 255px;
    display: none;
`

const BackgroundImage = styled.div`
  width: 100%;
  height: 95%;
  background-size: cover;
  background-position: center;
  margin-bottom: 5px;
  background-image: ${({ imageUrl }) => `url(${imageUrl})`};
`

const CollectionFooterContainer = styled.div`
    width: 100%;
    height: 5%;
    display: flex;
    justify-content: space-between;
    font-size: 18px;

    .name {
        width: 90%;
        margin-bottom: 15px;
    }

    .price {
        width: 10%;
    }
`

const CollectionItem = ({ item, addItem }) => {
    const { name, price, imageUrl } = item

    return (
        <CollectionItemContainer>
            <BackgroundImage className='image' imageUrl={imageUrl} />
            <CollectionFooterContainer>
                <span className='name'>{name}</span>
                <span className='price'>${price}</span>
            </CollectionFooterContainer>
            <AddButton onClick={() => addItem(item)} inverted>ADD TO CART</AddButton>
        </CollectionItemContainer>
    )
}

const mapDispatchToProps = dispatch => ({
    addItem: item => dispatch(addItem(item))
})

export default connect(null, mapDispatchToProps)(CollectionItem)
