import React from 'react'
import { Form, Input, Button, Select } from 'antd';
import { PlayListType } from '../data/playlist.interface';
import {useAppSelector} from '../Store/configureStore'
import moment from 'moment';

const { Option } = Select;

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

interface Props{
  handleModalOK: (values: any)=>void
  handleModalCancel: ()=>void
  actionType: string
  playList?: PlayListType|null
}

export default function AddOreditPlayList({handleModalOK, handleModalCancel,actionType, playList }: Props) {
  const videos = useAppSelector(state  => state.videos.Videos); 
  const [form] = Form.useForm();

  const generateId = ()=>{
    var result           = '';
    var characters       = '123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < 7; i++ ) {
          result += characters.charAt(Math.floor(Math.random() * 
          charactersLength));
      }
      return result;
  }

  const onFinish = (values: any) => {
    handleModalOK(values);
    form.resetFields();
  };

  const onCancel = () => {
    form.resetFields();
    handleModalCancel();
  };

  if (playList){
        form.setFieldsValue({
          id:playList.id,
          name:playList.name,
          description: playList.description,
          videoIds: playList.videoIds,
          dateCreated: playList.dateCreated
        });
  }
  else{
    playList={ 
      id: +generateId(),
      name: undefined,
      description:undefined,
      videoIds:undefined,
      dateCreated: moment().format('YYYY-MM-DDTHH:mm:ss'),
    }

  }

  return (

    <Form 
      {...layout} 
      form={form} 
      name="control-hooks" 
      onFinish={onFinish} 
      initialValues={playList}
      >
      <Form.Item name="id" label="Id" rules={[{ required: true }]}>
        <Input disabled/>
      </Form.Item>
      <Form.Item name="name" label="Name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="description" label="Description" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="videoIds" label="Video Ids" rules={[{ required: true }]}>
        <Select
          placeholder="Select a video"
          allowClear
          mode="multiple"
        >
          {
            videos?.map((video, index)=>{
              return <Option key={video.id} value={video.id}>{video.id}</Option>
            })
          }
        </Select>
      </Form.Item>
      <Form.Item name="dateCreated" label="Date Created" rules={[{ required: true }]}>
        <Input disabled/>
      </Form.Item>
      <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            {actionType==='Add'? 'Add' : 'Update'}
          </Button>
          <Button htmlType="button" onClick={onCancel}>
            Cancel
          </Button>
      </Form.Item>
  </Form>
  )
}