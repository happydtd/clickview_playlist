import { Space, Table, Image, Popconfirm } from 'antd';
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
      width: '5%',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: '10%',
    },
    {
      title: 'Duration',
      dataIndex: 'duration',
      key: 'duration',
      width: '10%',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      width: '40%',
    },
    {
      title: 'DateCreated',
      dataIndex: 'dateCreated',
      key: 'dateCreated',
      width: '10%',
    },
    {
      title: 'Thumbnail',
      dataIndex: 'thumbnail',
      key: 'thumbnail',
      width: '15%',
      render: thumbnail=> {return <Image width='100%' src={thumbnail}/>}
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a onClick={()=>handleEdit(record)}>Edit</a>
          <Popconfirm
                title="Are you sure to delete?"
                okText="Confirm"
                cancelText="Cancel"
                onConfirm={()=>handleDelete(record.id)}
          >
            <a>Delete</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const handleAdd = ()=>{
    // setmodalTitle(`Add new playlist`);
    // setActionType("Add");
    // setVisible(true);
  }

  const handleEdit =(record:any)=>{
    // setplayList(record);
    // setmodalTitle(`Edit playlist`);
    // setActionType("Edit");
    // setVisible(true);
  }

  const handleDelete =(id: number)=>{
    // dispatch(RemoveFromPlayLists(id))
  }

  return (
    <CommonLayout>
      <Table columns={columns} dataSource={videos} rowKey={record=>record.id}/>
    </CommonLayout>
    
  )
}

