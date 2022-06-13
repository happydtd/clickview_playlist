import { Form, Button, Select } from 'antd';
import {useAppSelector} from '../Store/configureStore'

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
}

export default function SelectPlayList({handleModalOK, handleModalCancel}: Props) {
  const playlists = useAppSelector(state  => state.playlists.Playlists); 
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    form.resetFields();
    handleModalOK(values);
  };

  const onCancel = () => {
    form.resetFields();
    handleModalCancel();
  };

  return (

    <Form 
      {...layout} 
      form={form} 
      name="control-hooks" 
      onFinish={onFinish} 
      initialValues={{playListId: undefined}}
      >
      <Form.Item name="playListId" label="Play Lists" rules={[{ required: true }]}>
        <Select
          placeholder="Select a playlist"
          allowClear
        >
          {
            playlists?.map((playlist, index)=>{
              return <Option key={playlist.id} value={playlist.id}>{playlist.id} {playlist.name}</Option>
            })
          }
        </Select>
      </Form.Item>
      <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit" style={{marginRight: '8px'}}>
            Add videos to selected playlist
          </Button>
          <Button htmlType="button" onClick={onCancel}>
            Cancel
          </Button>
      </Form.Item>
  </Form>
  )
}