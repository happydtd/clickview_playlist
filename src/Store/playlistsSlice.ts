import {createSlice} from '@reduxjs/toolkit'
import {PlayListType} from '../data/playlist.interface'
import playLists from '../data/playlists'

export interface PlayListState{
    Playlists: PlayListType[]
}

const initialState : PlayListState ={
    Playlists : playLists
}

export const playListsSlice = createSlice({
    name: 'playLists',
    initialState,
    reducers:{
        AddToPlayLists: (state, action) =>{
            state.Playlists = [...state.Playlists, action.payload];
        },

        RemoveFromPlayLists: (state, action) =>{
            state.Playlists = state.Playlists.filter(i=>i.id !== action.payload)
        },

        UpdatePlayLists: (state,action)=>{
            const itemIndex = state.Playlists.findIndex(i=>i.id === action.payload.id);
            if (itemIndex === -1 || itemIndex === undefined)
                return;
            state.Playlists[itemIndex] = action.payload;
        }

    }
})

export const {AddToPlayLists, RemoveFromPlayLists, UpdatePlayLists} = playListsSlice.actions;