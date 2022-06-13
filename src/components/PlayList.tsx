import { Button, message, Modal, Popconfirm, Space, Table} from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import CommonLayout from './CommonLayout'
import { PlayListType } from '../data/playlist.interface';
import {useAppSelector, useAppDispatch} from '../Store/configureStore'
import {AddToPlayLists, RemoveFromPlayLists, UpdatePlayLists} from '../Store/playlistsSlice'
import { Link} from "react-router-dom";
import { PlusOutlined } from '@ant-design/icons';
import { useState } from 'react';
import AddOreditPlayList from './AddOrEditPlayList';

export default function PlayList() {
  const dispatch = useAppDispatch();
  const playLists = useAppSelector(state  => state.playlists.Playlists); 
  const [ visible, setVisible] = useState(false);
  const [ confirmLoading, setConfirmLoading] = useState(false);
  const [ actionType, setActionType] = useState<"Edit"|"Add">("Add");
  const [ modalTitle, setmodalTitle] = useState("");
  const [ playList, setplayList] = useState<PlayListType|null>(null);
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
      render: (name, record) =>{
        return <Link to={`/PlayListDetail/${record.id}`}>{name}</Link>
      },
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
          <Button type="link" onClick={()=>handleEdit(record)}>Edit</Button>
          <Popconfirm
                title="Are you sure to delete?"
                okText="Confirm"
                cancelText="Cancel"
                onConfirm={()=>handleDelete(record.id)}
          >
            <Button type="link">Delete</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const handleAdd = ()=>{
    setmodalTitle(`Add new playlist`);
    setActionType("Add");
    setVisible(true);
  }

  const handleEdit =(record:PlayListType)=>{
    setplayList(record);
    setmodalTitle(`Edit playlist`);
    setActionType("Edit");
    setVisible(true);
  }

  const handleDelete =(id: number)=>{
    try{
      dispatch(RemoveFromPlayLists(id))
      message.success('Success');
    }
    catch(error){
      message.success('Error');
    }
  }

  const handleModalCancel = () => {
    setplayList(null);
    setVisible(false);
  };

  const handleModalOK = async (values:any) => {
    setConfirmLoading(true);
    const { id, name, description, videoIds, dateCreated } = values;
    
    try{
      if(actionType === 'Add' )
      {
        dispatch(AddToPlayLists({id, name, description, videoIds, dateCreated}));
        message.success('Success');
      }
      else
      {
        dispatch(UpdatePlayLists({id, name, description, videoIds, dateCreated}));
        message.success('Success');
      }
    }
    catch(error){
      message.success('Error');
    }
    setplayList(null);
    setVisible(false);
    setConfirmLoading(false);
  }

  return (
    <CommonLayout>
      <div style={{ marginBottom: 16 }}>
          <Button type="primary" icon={<PlusOutlined/>} onClick={handleAdd}>
            Add
          </Button>
      </div>
      <Table columns={columns} dataSource={playLists} rowKey={record=>record.id} />
      <Modal
            title={modalTitle}
            visible={visible}
            footer={null}
            closable={false}
            confirmLoading={confirmLoading}
            onCancel={handleModalCancel}
          >
            <AddOreditPlayList handleModalOK={handleModalOK} handleModalCancel={handleModalCancel} actionType={actionType} playList ={playList} ></AddOreditPlayList>
      </Modal>
    </CommonLayout>
    
  )
}
