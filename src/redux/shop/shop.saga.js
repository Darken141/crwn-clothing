import { call, put, takeLatest} from 'redux-saga/effects' 
import {firestore, convertCollectionsSnapShotToMap} from '../../firebase/firebase.utils'
import {fetchCollectionsSuccess,fetchCollectionsFailure} from './shop.actions'

import { ShopActionTypes } from './shop.types'

export function* fetchCollectionsAsync() {
    try {

        const collectionRef = firestore.collection('collections')
        const snapshot = yield collectionRef.get()
        console.log(snapshot)
        const collectionsMap = yield call(convertCollectionsSnapShotToMap, snapshot) 
        yield put(fetchCollectionsSuccess(collectionsMap))

    } catch (err) {

        yield put(fetchCollectionsFailure(err.message))

    }

}

export function* fetchCollectionsStart() {
    yield takeLatest(
        ShopActionTypes.FETCH_COLLECTIONS_START, 
        fetchCollectionsAsync 
    )
}

