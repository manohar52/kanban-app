import { get, post, put, remove } from './config'

export const getAllCardsForLane = (laneId) => {
    return get(`/api/cards/${laneId}`);
}

export const createNewCard = (card) => {
    return post('/api/cards', card)
}

// export const updateLane = (laneId, newName) => {
//     return put(`/api/lanes/${laneId}`, newName)
// }

export const removeCard = (cardId) => {
    return remove(`/api/cards/${cardId}`)
}