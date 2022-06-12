import React, { useState } from 'react'
import CommonLayout from './CommonLayout'
import InfiniteScroll from 'react-infinite-scroll-component';
import { useParams } from 'react-router-dom';
import {useAppSelector} from '../Store/configureStore'
import { PlayListType } from '../data/playlist.interface';
import { Col, Row } from 'antd';
import VideoCard from './VideoCard';

export default function PlayListDetail() {
  const [ page, setPage ] = useState(1);
  let play : PlayListType | undefined ;
  let { id } = useParams(); 
  console.log(id);
  const playLists = useAppSelector(state  => state.playlists.Playlists); 
  if (id){
    play = playLists.find(i=>i.id === parseInt(id!));
  }
  
  if (!play) return (<>Can not find play details</>)
  return (
    play &&
    <CommonLayout>
       <InfiniteScroll
          dataLength={play.videoIds!.length} //This is important field to render the next data
          next={()=> {
            setPage(page=>page+1)
          }}
          hasMore={false}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          <Row gutter={[16, { xs: 8, sm: 16, md: 24, lg: 32 }]}>
          { play.videoIds?.map((videoId, index)=>{
            return (
              <Col key={index} xs={12} sm={12} md={8} lg={6} ><VideoCard videoId={videoId}/></Col>
            )})
          }
          </Row>
        </InfiniteScroll>
    </CommonLayout>
   
  )
}
