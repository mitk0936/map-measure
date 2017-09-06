import { combineReducers } from 'redux'
import mapSelections from './mapSelections'
import mapSettings from './mapSettings'

export const reducers = combineReducers({ mapSelections, mapSettings })
