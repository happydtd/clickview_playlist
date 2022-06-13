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
            try{
                state.Playlists = [...state.Playlists, action.payload];
            }
            catch(error){
                throw error
            }
        },

        RemoveFromPlayLists: (state, action) =>{
            try{
                state.Playlists = state.Playlists.filter(i=>i.id !== action.payload)
            }
            catch(error){
                throw error
            }
        },

        UpdatePlayLists: (state,action)=>{
            try{
                const itemIndex = state.Playlists.findIndex(i=>i.id === action.payload.id);
                if (itemIndex === -1 || itemIndex === undefined)
                    return;
                state.Playlists[itemIndex] = action.payload;
            }
            catch(error){
                throw error
            }
        },

        AddVideosToPlayList:(state, action) =>{
            try{
                const itemIndex = state.Playlists.findIndex(i=>i.id === action.payload.playListId);
                let  currentVideos = state.Playlists[itemIndex].videoIds;
                if (currentVideos && currentVideos.length > 0){
                    action.payload.selectedRowKeys.forEach(function(value:number){
                        if (currentVideos!.indexOf(value)===-1) 
                            currentVideos!.push(value);
                    });
                }
                else{
                    currentVideos = action.payload.selectedRowKeys
                }
            }
            catch(error){
                throw error
            }
             
        },

    }
})

export const {AddToPlayLists, RemoveFromPlayLists, UpdatePlayLists, AddVideosToPlayList} = playListsSlice.actions;