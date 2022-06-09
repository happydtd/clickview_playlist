import {createSlice} from '@reduxjs/toolkit'
import {PlayListType} from '../data/playlist.interface'
import playLists from '../data/playlists'

export interface PlayListState{
    Playlist: PlayListType[]
}

const initialState : PlayListState ={
    Playlist : playLists
}

export const playListSlice = createSlice({
    name: 'playList',
    initialState,
    reducers:{
        AddToPlayList: (state, action) =>{

        },

        RemoveFromPlayList: (state, action) =>{

        }
    }
})

export const {AddToPlayList, RemoveFromPlayList} = playListSlice.actions;