import React from "react";
import { Image } from "react-bootstrap";

const ProfileDesabled = ({ name, email, phone}) => {
  return (

    <>
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ height: "80vh" }}
      >
        <h1>You're Profile</h1>
        <div>
          <div>
            <Image src={""} roundedCircle alt="profile" />
          </div>
          <div className="my-2">
            <input type="text" defaultValue={name} disabled />
          </div>
          <div className="my-2">
            <input type="text" defaultValue={email} disabled />
          </div>
          <div className="my-2">
            <input type="text" defaultValue={phone} disabled />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileDesabled;
