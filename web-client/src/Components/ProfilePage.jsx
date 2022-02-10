import React, { useContext, useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import AppContext from "../context/AppContext";
import { useForm } from "react-hook-form";
import BoughtList from "./BoughtList";
import axios from "axios";
import Modal from "react-modal";
import EditProfile from "./EditProfile";
import closeIcon from "../images/closeIcon.svg";

function ProfilePage() {
  const appContext = useContext(AppContext);
  const setUserProfile = appContext.setUserProfile;
  const userProfile = appContext.userProfile;

  const [modalIsOpen, setIsOpen] = useState(false);

  function changeModal() {
    setIsOpen(!modalIsOpen);
  }

  useEffect(async () => {
    try {
      const user = await axios.get(
        "https://fitto-api-server.herokuapp.com/user"
      );
      setUserProfile(user.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className="profilePage" data-testid="profilePageTest">
      <div>
        <Card style={{ width: "18rem" }}>
          <Card.Img
            variant="top"
            src={userProfile && userProfile.profilePic}
            style={{ width: "100%" }}
          />
          <Card.Body>
            <Card.Title>
              {" "}
              Name:{console.log(userProfile)}
              {userProfile &&
                userProfile.firstName + " " + userProfile.lastName}
            </Card.Title>
            <Card.Text>
              <p>Address: {userProfile && userProfile.address}</p>
              <p>Email: {userProfile && userProfile.email}</p>
              <p>
                Birth Date:{" "}
                {userProfile &&
                  userProfile.dateOfBirth.split("-").reverse().join("-")}
              </p>
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
      <div>
        <button onClick={changeModal} className="btn btn-secondary mt-1">
          Update Details
        </button>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={changeModal}
        className="editModal"
      >
        <div style={{ width: "100%" }}>
          <div className="closeIcon">
            <img src={closeIcon} onClick={changeModal} />
          </div>
        </div>
        <div>
          <EditProfile />
        </div>
      </Modal>
      <h1 className="mainTitle">Bought Items</h1>
      <div className="profileBoughtList">
        <BoughtList />
      </div>
    </div>
  );
}

export default ProfilePage;
