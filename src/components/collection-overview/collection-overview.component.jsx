import React from 'react'

import { connect } from 'react-redux'
import { createStructuredSelector } from "reselect"
import { selectCollectionsForPreview } from '../../redux/shop/shop.selectors'

import CollectionPreview from '../collection-preview/collection-preview'

import './collection-overview.styles.scss'

const CollectionOverview = ({ collections }) => {
    return (
        <div className='collection-overview'>
            {
                collections.map(collection => (
                    <CollectionPreview key={collection.id} {...collection} />
                ))
            }
        </div>
    )
}



const mapStateToProps = createStructuredSelector({
    collections: selectCollectionsForPreview
})


export default connect(mapStateToProps)(CollectionOverview)
