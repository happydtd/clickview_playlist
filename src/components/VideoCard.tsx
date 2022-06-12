import { Card ,Row, Col, Divider, Typography, Image } from 'antd';
import { VideoType } from '../data/video.interface';
import {useAppSelector} from '../Store/configureStore'

interface VideoCardProp {
    videoId: number
}

export default function CourseCard({videoId}:VideoCardProp) {
    const videos = useAppSelector(state  => state.videos.Videos); 
    let video : VideoType | null = null;
    if (videos && videos.length>0)
        video = videos.find(i=>i.id === videoId) ?? null;
  
  if(!video) return (<>No relative video</>)
  return (
    video &&
    <>
        <Card title="video" hoverable style={{ width:'100%', height:'100%'}}>
            <Row gutter={16} style={{height:'40px'}}>
              <Col className="gutter-row" span={3}>
                <div><Typography>Id:</Typography></div>
              </Col>
              <Col className="gutter-row" span={9}>
                <div><Typography>{video.id}</Typography></div>
              </Col>
              <Col className="gutter-row" span={3}>
                <div><Typography>Name:</Typography></div>
              </Col>
              <Col className="gutter-row" span={9}>
                <div><Typography>{video.name}</Typography></div>
              </Col>
            </Row>
            <Divider orientation="left"></Divider>
            <Row gutter={16} style={{height:'150px'}}>
              <Col className="gutter-row" span={24}>
                <div><Typography>{video.description}</Typography></div>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col className="gutter-row" span={8}>
                <div><Typography>Duration:</Typography></div>
              </Col>
              <Col className="gutter-row" span={16}>
              <div><Typography>{video.duration}</Typography></div>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col className="gutter-row" span={8}>
                <div><Typography>Date created:</Typography></div>
              </Col>
              <Col className="gutter-row" span={16}>
              <div><Typography>{video.dateCreated}</Typography></div>
              </Col>
            </Row>
            <Divider orientation="left"></Divider>
            <Row gutter={16}>
              <Col className="gutter-row" span={24}>
              <Image
                width='100%'
                src={video.thumbnail}
              />
              </Col>
            </Row>
            <Divider orientation="left"></Divider>
        </Card>
    </>
  )
}