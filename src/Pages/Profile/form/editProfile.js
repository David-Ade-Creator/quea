/* eslint-disable react-hooks/rules-of-hooks */
import { CaretLeftOutlined, LoadingOutlined } from "@ant-design/icons";
import { withStyles } from "@material-ui/styles";
import { Button, Divider, Input, Upload, Form } from "antd";
import TextArea from "antd/lib/input/TextArea";
import Axios from "axios";
import { routerActions } from "connected-react-router";
import React, { useState } from "react";
import { connect } from "react-redux";
import { Pagewithheader } from "../../../Components/Layout/PageWithHeader/pagewithheader";
import { User } from "../../../store";
import Styles from "./styles";

export const editProfileViewWithoutStyles = ({
  match,
  classes,
  users,
  isUsersInitialized,
}) => {
  const [isAPILoading, setIsAPILoading] = React.useState(false);
  const [imgUrl, setImgUrl] = useState("");
  const [initialFormValues, setInitialFormValues] = React.useState({
    //photo: "",
    firstname: "",
    lastname: "",
    description: "",
    education: "",
    country: "",
    state: "",
    address: "",
  });

  React.useEffect(() => {
    if (!isUsersInitialized) return;
    const userIdBeingEdited = match.params.id;

    const userBeingEdited = users.find(
      (user) => user._id === userIdBeingEdited
    );
    console.log(userBeingEdited);

    //user isnt found, because the userid is invalid
    if (!userBeingEdited) {
      //pushToProfilePage();
      new Error("Now editable");
      return;
    }
    //set the initial form values
    setInitialFormValues({
      //photo: userBeingEdited.info.photo,
      firstname: userBeingEdited.firstname,
      lastname: userBeingEdited.lastname,
      description: userBeingEdited.info.description,
      education: userBeingEdited.info.education,
      country: userBeingEdited.info.country,
      state: userBeingEdited.info.state,
      address: userBeingEdited.info.address,
    });
  }, [isUsersInitialized, match.params.id, users]);

  console.log("editable here", initialFormValues);
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
      const imageUrl = await Axios.post("/api/q3/upload/s3", formData, config);
      setImgUrl(imageUrl.data);
      setIsAPILoading(false);
    } catch (error) {
      setIsAPILoading(false);
    }
  };

  const onFinish = (values) => {
    console.log(values);
  };

  return (
    <Pagewithheader>
      <div className={classes.backbtn}>
        <Button onClick={() => window.history.back()}>
          <CaretLeftOutlined />
        </Button>
      </div>
      <Divider />
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        beforeUpload={() => false}
        onChange={handleChange}
      >
        {imgUrl ? (
          <img src={imgUrl} alt="avatar" style={{ width: "100%" }} />
        ) : (
          uploadButton
        )}
      </Upload>
      <Form initialValues={initialFormValues} onFinish={onFinish}>
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
        <Form.Item label="Description(Optional)" name="description">
          <TextArea placeholder="Short self note" rows={4} />
        </Form.Item>
        <Form.Item label="Education(Optional)" name="education">
          <Input placeholder="Educational Degree" />
        </Form.Item>
        <Form.Item label="Country(Optional)" name="country">
          <Input placeholder="Enter you country" />
        </Form.Item>
        <Form.Item label="State(Optional)" name="state">
          <Input placeholder="Enter state" />
        </Form.Item>
        <Form.Item label="Address(Optional)" name="address">
          <Input placeholder="Enter your address" />
        </Form.Item>
        <div>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </div>
      </Form>
    </Pagewithheader>
  );
};

export const editProfileView = withStyles(Styles)(editProfileViewWithoutStyles);

const mapState = (state) => ({
  isUsersInitialized: state.user.isInitialized,
  users: state.user.users,
});

const mapDispatch = (dispatch) => ({
  pushToCurrenciesPage: () => dispatch(routerActions.replace("/")),
  initializeUserProfileState: (userId) =>
    dispatch(User.Actions.userProfile(userId)),
});

const connector = connect(mapState, mapDispatch);

export const editProfilePage = connector(editProfileView);
