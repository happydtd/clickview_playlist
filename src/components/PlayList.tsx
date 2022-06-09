import { Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import CommonLayout from './CommonLayout'
//import playLists from '../data/playlists'
import { PlayListType } from '../data/playlist.interface';
import {useAppSelector} from '../Store/configureStore'


export default function PlayList() {

  const playList = useAppSelector(state  => state.playlist.Playlist); 

  const columns: ColumnsType<PlayListType> = [
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
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'VideoIds',
      dataIndex: 'videoIds',
      key: 'videoIds',
      render: (videoIds) =>{
        const result = videoIds.join(",")
        return <>{result}</>
      }
    },
    {
      title: 'DateCreated',
      dataIndex: 'dateCreated',
      key: 'dateCreated',
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
      <Table columns={columns} dataSource={playList} onRow={(record, rowIndex) => {
        return {
          onClick: event => {console.log(record)}, // click row
        };
      }}/>
    </CommonLayout>
    
  )
}
