import { CaretLeftOutlined, LoadingOutlined } from "@ant-design/icons";
import { withStyles } from "@material-ui/styles";
import { Button, Divider, Input, Upload, Form, Row, Col } from "antd";
import TextArea from "antd/lib/input/TextArea";
import Axios from "axios";
import { routerActions } from "connected-react-router";
import React, { useState } from "react";
import { connect } from "react-redux";
import { Pagewithheader } from "../../../Components/Layout/PageWithHeader/pagewithheader";
import { User } from "../../../store";
import { baseUrl } from "../../../store/baseUrl";
import Styles from "./styles";

export const EditProfileViewWithoutStyles = ({
  match,
  classes,
  userData,
  initializeUserProfileState,
  pushToProfilePage,
  editUser,
  isStateAPILoading 
}) => {
  const userIdBeingEdited = match.params.id;
  const [isAPILoading, setIsAPILoading] = React.useState(false);
  const [imgUrl, setImgUrl] = useState("");
  const [initialFormValues, setInitialFormValues] = React.useState(undefined);


  const [form] = Form.useForm();

  React.useEffect(() => {
    initializeUserProfileState(userIdBeingEdited);
  }, [initializeUserProfileState, userIdBeingEdited]);

  React.useEffect(()=>{
    if(userData){
    setImgUrl(userData?.info?.photo);
    setInitialFormValues({
      photo: userData?.info?.photo,
      firstname: userData?.firstname,
      lastname: userData?.lastname,
      description: userData?.info?.description,
      education: userData?.info?.education,
      country: userData?.info?.country,
      state: userData?.info?.state,
      address: userData?.info?.address,
    });
  }
  },[userData]);
  
  const uploadButton = (
    <div>
      {isAPILoading && <LoadingOutlined />}
      <div style={{ marginTop: 8 }}>
        {isAPILoading ? (
          "adding photo.."
        ) : (
          <Button type="primary">Add photo</Button>
        )}
      </div>
    </div>
  );

  const handleChange = async (info) => {
    setIsAPILoading(true);
    let formData = new FormData();
    const config = {
      header: { "content-type": "multipart/form-data" },
    };
    formData.append("file", info.file);
    try {
      const imageUrl = await Axios.post(`${baseUrl}/api/q3/upload/s3`, formData, config);
      setImgUrl(imageUrl.data);
      form.setFieldsValue({ photo: imageUrl.data });
      setIsAPILoading(false);
    } catch (error) {
      setIsAPILoading(false);
    }
  };

  const onFinish = (values) => {
    editUser({userId:userIdBeingEdited,...initialFormValues,...values});
  };

  return (
    <Pagewithheader>
      <div className={classes.backbtn}>
        <Button onClick={() => window.history.back()}>
          <CaretLeftOutlined />
        </Button>
      </div>
      <Divider />
      
     {initialFormValues ? <Form layout="vertical" form={form} initialValues={initialFormValues } onFinish={onFinish}>
        <Row gutter={16}>
          <Col lg={24} md={24} sm={24} xs={24}>
          <Form.Item name="photo">
        <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        beforeUpload={() => false}
        onChange={handleChange}
      >
        {imgUrl ? (
          <img src={imgUrl} alt="avatar" style={{ maxWidth: "104px", maxHeight: "104px" }} />
        ) : (
          uploadButton
        )}
      </Upload>
        </Form.Item>
          </Col>
          <Col lg={12} md={12} sm={12} xs={12}>
          <Form.Item
          label="Firstname"
          name="firstname"
          rules={[
            {
              required: true,
              message: "Please input your Firstname!",
            },
          ]}
        >
          <Input placeholder="Enter firstname" />
        </Form.Item>
          </Col>
          <Col lg={12} md={12} sm={12} xs={12}>
          <Form.Item
          label="Lastname"
          name="lastname"
          rules={[
            {
              required: true,
              message: "Please input your Lastname!",
            },
          ]}
        >
          <Input placeholder="Enter lastname" />
        </Form.Item>
          </Col>
          <Col lg={24} md={24} sm={24} xs={24}>
          <Form.Item label="Description(Optional)" name="description">
          <TextArea placeholder="Short self note" rows={4} />
        </Form.Item>
          </Col>
          <Col lg={24} md={24} sm={24} xs={24}>
          <Form.Item label="Education(Optional)" name="education">
          <Input placeholder="Educational Degree" />
        </Form.Item>
          </Col>
          <Col lg={12} md={12} sm={12} xs={12}>
          <Form.Item label="Country(Optional)" name="country">
          <Input placeholder="Enter you country" />
        </Form.Item>
          </Col>
          <Col lg={12} md={12} sm={12} xs={12}>
          <Form.Item label="State(Optional)" name="state">
          <Input placeholder="Enter state" />
        </Form.Item>
          </Col>
          <Col lg={24} nd={24} sm={24} xs={24}>
          <Form.Item label="Address(Optional)" name="address">
          <Input placeholder="Enter your address" />
        </Form.Item>
          </Col>
        </Row>
          <Button type="primary" loading={isStateAPILoading } htmlType="submit">
             {isStateAPILoading ? "Saving..." : "Save"}
          </Button>
      </Form> : <>Fetching user data</>}
    </Pagewithheader>
  );
};

export const EditProfileView = withStyles(Styles)(EditProfileViewWithoutStyles);

const mapState = (state) => ({
  userData : state.user.userProfile,
  isStateAPILoading : state.user.isApiLoading,
});

const mapDispatch = (dispatch) => ({
  initializeUserProfileState: (userId) =>
    dispatch(User.Actions.userProfileInfo(userId)),
  editUser: (userDetails) => dispatch(User.Actions.userEdit(userDetails))
});

const connector = connect(mapState, mapDispatch);

export const EditProfilePage = connector(EditProfileView);
