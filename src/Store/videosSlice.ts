import {createSlice} from '@reduxjs/toolkit'
import { stat } from 'fs'
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
            return state;
        },

        RemoveFromVideos: (state, action) =>{
            return state;
        }
    }
})

export const {AddToVideos, RemoveFromVideos} = videosSlice.actions;