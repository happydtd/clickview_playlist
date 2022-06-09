import {createSlice} from '@reduxjs/toolkit'
import {VideoType} from '../data/video.interface'
import videos from '../data/videos'

export interface VideoState{
    Videos: VideoType[]
}

const initialState : VideoState ={
    Videos : videos
}

export const videosSlice = createSlice({
    name: 'videos',
    initialState,
    reducers:{
        AddToVideos: (state, action) =>{

        },

        RemoveFromVideos: (state, action) =>{

        }
    }
})

export const {AddToVideos, RemoveFromVideos} = videosSlice.actions;