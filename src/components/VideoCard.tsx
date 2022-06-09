import React from 'react'
import { Card ,Row, Col, Divider, Typography, Button} from 'antd';
import { HeartFilled ,UserOutlined } from '@ant-design/icons';
import { VideoType } from '../data/video.interface';
import {useAppSelector} from '../Store/configureStore'

interface VideoCardProp {
    videoId: number
}

export default function CourseCard({videoId}:VideoCardProp) {
    const style = { background: '#0092ff', padding: '8px 0' };
    const videos = useAppSelector(state  => state.videos.Videos); 
    let video : VideoType | null = null;
    if (videos && videos.length>0)
        video = videos.find(i=>i.id === videoId) ?? null;
  
  
  return (
      video &&
    <>
        <Card title="Default size card" hoverable>
            <Row gutter={16}>
            <Col className="gutter-row" span={12}>
                <div><Typography>{video.id}</Typography></div>
              </Col>
              <Col className="gutter-row" span={12}>
                <div><Typography>{video.name}</Typography></div>
              </Col>
            </Row>
            <Divider orientation="left"></Divider>
            <Row gutter={16}>
              <Col className="gutter-row" span={24}>
                <div><Typography>{video.description}</Typography></div>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col className="gutter-row" span={12}>
              <div><Typography>{video.duration}</Typography></div>
              </Col>
              <Col className="gutter-row" span={12}>
              <div><Typography>{video.dateCreated}</Typography></div>
              </Col>
            </Row>
            <Divider orientation="left"></Divider>


        </Card>
    </>
  )
}