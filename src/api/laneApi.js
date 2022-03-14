import { get, post, put, remove } from './config'

export const getAllLanes = () => {
    return get('/api/lanes/');
}

export const createNewLane = (lane) => {
    return post('/api/lanes', lane)
}

export const updateLane = (laneId, newName) => {
    return put(`/api/lanes/${laneId}`, newName)
}

export const removeLane = (laneId) => {
    return remove(`/api/lanes/${laneId}`)
}