import React, { useContext, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import AppContext from "../context/AppContext";
import { useForm } from "react-hook-form";
import "../App.css";
import axios from "axios";

function EditProfile() {
  const location = useLocation();
  const appContext = useContext(AppContext);
  const setUserProfile = appContext.setUserProfile;
  const userProfile = appContext.userProfile;
  const [systemMessage, setSystemMessage] = useState();

  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      const updatedUserPic = await updateUserPic(data.picture[0]);
      await updateUser(data, updatedUserPic);
    } catch (error) {
      console.log(error);
    }
  };

  const updateUser = async (data, pic) => {
    try {
      const result = await axios.put(
        "https://fitto-api-server.herokuapp.com/user/update",
        {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          address: data.address,
          dateOfBirth: data.dateOfBirth,
          profilePic: pic,
        }
      );

      setUserProfile(result.data);
      setSystemMessage("User details updated!");
    } catch (error) {
      console.log(error);
    }
  };

  const updateUserPic = async (pic) => {
    try {
      const picFormData = new FormData();
      picFormData.append("picture", pic);
      const picResult = await axios.put(
        `https://fitto-api-server.herokuapp.com/user/user-pic-upload`,
        picFormData
      );
      return picResult.data.picture;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form classname="profileForm" onSubmit={handleSubmit(onSubmit)}>
      <div className="formSection">
        <input
          data-testid="fNameInput"
          classname="form-control mr-sm-2"
          type="text"
          placeholder="First Name"
          {...register("firstName")}
          value={undefined}
        ></input>
      </div>
      <div className="formSection">
        <input
          data-testid="lNameInput"
          classname="form-control mr-sm-2"
          type="text"
          placeholder="Last Name"
          {...register("lastName")}
          value={undefined}
        ></input>
      </div>
      <div className="formSection">
        <input
          data-testid="emailInput"
          classname="form-control mr-sm-2"
          type="text"
          placeholder="Email"
          {...register("email")}
          value={undefined}
        ></input>
      </div>
      <div className="formSection">
        <input
          data-testid="addressInput"
          classname="form-control mr-sm-2"
          type="text"
          placeholder="Address"
          {...register("address")}
          value={undefined}
        ></input>
      </div>
      <div className="formSection">
        <input
          data-testid="birthdateInput"
          classname="form-control mr-sm-2"
          type="date"
          {...register("dateOfBirth")}
          value={undefined}
        ></input>
      </div>
      <div className="formSection">
        <h4>Upload new profile pic</h4>
      </div>
      <div className="formSection">
        <input
          name="picture"
          type="file"
          {...register("picture")}
          value={undefined}
        />
      </div>
      <div className="formSection">
        <button
          classname="btn btn-outline-success my-2 my-sm-0"
          type="submit"
          data-testid="updateButton"
        >
          Update Profile
        </button>
      </div>
      <div className="systemMessage">{systemMessage}</div>
    </form>
  );
}

export default EditProfile;
