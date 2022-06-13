import { Table, Image, Col, Button, Modal, message } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import CommonLayout from './CommonLayout'
import { PlusOutlined } from '@ant-design/icons';
import { VideoType } from '../data/video.interface';
import {useAppDispatch, useAppSelector} from '../Store/configureStore'
import { useState } from 'react';
import SelectPlayList from './SelectPlayList';
import { AddVideosToPlayList } from '../Store/playlistsSlice';


export default function Video() {
  const dispatch = useAppDispatch();
  const [ visible, setVisible] = useState(false);
  const [ confirmLoading, setConfirmLoading] = useState(false);
  const [ modalTitle, setmodalTitle] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

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
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      width: '50%',
    },
    {
      title: 'Thumbnail',
      dataIndex: 'thumbnail',
      key: 'thumbnail',
      width: '15%',
      render: thumbnail=> {return <Image width='100%' src={thumbnail}/>}
    },
    {
      title: 'Duration',
      dataIndex: 'duration',
      key: 'duration',
      width: '10%',
    },
    {
      title: 'DateCreated',
      dataIndex: 'dateCreated',
      key: 'dateCreated',
      width: '10%',
    },
  ];

  const onSelectChange = (newSelectedRowKeys:any) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const hasSelected = selectedRowKeys.length > 0;

  
  const handleAddSelectedVideoToPlayList = (record:any)=>{
    setmodalTitle(`Select a playlist`);
    setVisible(true);
  }

  const handleModalCancel = () => {
    setVisible(false);
  };

  const handleModalOK = async (values:any) => {
    setConfirmLoading(true);
    const { playListId } = values;
    
    try{
      dispatch(AddVideosToPlayList({playListId, selectedRowKeys}));
      message.success('Success');
    }
    catch(error){
      message.success('Error');
    }

    setSelectedRowKeys([]);
    setVisible(false);
    setConfirmLoading(false);
  }

  return (
    <CommonLayout>
      <div style={{ marginBottom: 16 }}>
        <Col span={2} >
          <Button type="primary" icon={<PlusOutlined/>} onClick={handleAddSelectedVideoToPlayList} disabled={!hasSelected}>
            Add selected videos to playlist
          </Button>
        </Col>
        <Col span={22}></Col>
      </div>
      <Table 
        rowSelection={rowSelection}
        columns={columns} 
        dataSource={videos} 
        rowKey={record=>record.id}/>
      <Modal
            title={modalTitle}
            visible={visible}
            footer={null}
            closable={false}
            confirmLoading={confirmLoading}
            onCancel={handleModalCancel}
          >
            <SelectPlayList handleModalOK={handleModalOK} handleModalCancel={handleModalCancel}></SelectPlayList>
      </Modal>
    </CommonLayout>
    


  )
}

