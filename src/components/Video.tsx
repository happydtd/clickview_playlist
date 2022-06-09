import { Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import CommonLayout from './CommonLayout'
//import videos from '../data/videos'
import { VideoType } from '../data/video.interface';
import {useAppSelector} from '../Store/configureStore'


export default function Video() {
  const videos = useAppSelector(state  => state.videos.Videos); 

  const columns: ColumnsType<VideoType> = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Duration',
      dataIndex: 'duration',
      key: 'duration',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'DateCreated',
      dataIndex: 'dateCreated',
      key: 'dateCreated',
    },
    {
      title: 'Thumbnail',
      dataIndex: 'thumbnail',
      key: 'thumbnail',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a>Delete</a>
        </Space>
      ),
    },
  ];

  return (
    <CommonLayout>
      <Table columns={columns} dataSource={videos} />
    </CommonLayout>
    
  )
}

