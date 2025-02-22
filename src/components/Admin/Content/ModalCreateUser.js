import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { FaUpload } from "react-icons/fa";
import { postCreateUser } from "../../../services/apiServices";
import { toast } from "react-toastify";
import _ from "lodash";
function ModalUser(props) {
  const { show, setShow } = props;

  const handleClose = () => {
    setShow();
    setEmail("");
    setPreviewImage("");
    setImage("");
    setUsername("");
    setPassword("");
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("USER");
  const [image, setImage] = useState("");
  const [previewImage, setPreviewImage] = useState("");

  const handleUploadImage = async (event) => {
    if (event.target && event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setPreviewImage(URL.createObjectURL(file));

      const reader = new FileReader();
      reader.readAsDataURL(file); // Chuyển file sang base64

      reader.onload = () => {
        const base64String = reader.result;
        setImage(base64String); // Lưu base64 vào state
      };

      reader.onerror = (error) => {
        console.error("Lỗi khi đọc file:", error);
      };
    } else {
      setPreviewImage("");
    }
  };

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  const handleConfirm = async () => {
    const isValidEmail = validateEmail(email);
    if (!isValidEmail) {
      toast.error("Invalid Email");
      return;
    }
    const data = {
      email: email,
      password: password,
      username: username,
      role: role,
      userImage: image,
    };
    let res = await postCreateUser(data);
    if (res && res.EC === 0) {
      handleClose();
      toast.success(res.EM);
      await props.fetchUsers();
    } else {
      toast.error(res.EM);
    }
  };
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        backdrop="static"
        className="modal-add-user"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <span>Create new user</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(event) => setEmail(event.target.value, "email")}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(event) =>
                  setPassword(event.target.value, "password")
                }
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Username</label>
              <input
                type="text"
                className="form-control"
                value={username}
                onChange={(event) =>
                  setUsername(event.target.value, "username")
                }
              />
            </div>
            <div className="col-md-2">
              <label className="form-label">Role</label>
              <select
                value={role}
                className="form-select"
                onChange={(event) => setRole(event.target.value, "role")}
              >
                <option value="USER">USER</option>
                <option value="ADMIN">ADMIN</option>
              </select>
            </div>
            <div className="col-md-4">
              <label className="form-label label-upload" htmlFor="labelUplaod">
                <FaUpload /> Upload Image
              </label>
              <input
                type="file"
                hidden
                id="labelUplaod"
                onChange={(event) => handleUploadImage(event)}
              />
            </div>
            <div className="col-md-12 img-preview">
              {previewImage ? (
                <img src={previewImage} />
              ) : (
                <span>Preview Image</span>
              )}
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleConfirm()}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalUser;
