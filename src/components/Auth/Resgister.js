import { NavLink, useNavigate } from "react-router-dom";
import "./Resgister.scss";
import { useState } from "react";
import { toast } from "react-toastify";
import { registerUser } from "../../services/apiServices";
const Resgister = (props) => {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [isShowEye, setIsShowEye] = useState(false);

  const handleRegister = async () => {
    if (!email || !password || !username) {
      toast.error("Please fill in your information!");
      return;
    }
    const data = {
      email: email,
      username: username,
      password: password,
    };
    let res = await registerUser(data);
    console.log("check res", res);

    if (res && res.EC === 0) {
      toast.success(res.EM);
      navigate("/login");
    } else {
      toast.error("error");
    }
  };
  const handlePressEnter = (event) => {
    if (event.charCode === 13 && event.code === "Enter") {
      handleRegister();
    }
  };
  const handleChangeEye = () => {
    setIsShowEye(!isShowEye);
  };
  return (
    <div className="login-container">
      <div className="content-up">
        <span>
          Do you have an account yet?
          <button className="btn-signUp">
            <NavLink to="/">Sign in</NavLink>
          </button>
          Need help?
        </span>
      </div>
      <div className="content-mid">
        <span className="title">Quiz Project</span>
        <span className="sub-title">Hello, who's this?</span>
        <div className="form-group">
          <label>Email</label>
          <input
            type="text"
            className="form-control"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
        </div>
        <div className="form-group ">
          <label>Password</label>
          <div className="group-password">
            <input
              type={isShowEye ? "text" : "password"}
              className="form-control "
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
              onKeyPress={(event) => handlePressEnter(event)}
            />
            <i
              class={isShowEye ? "fa fa-eye" : "fa fa-eye-slash"}
              onClick={() => handleChangeEye()}
            />
          </div>
        </div>
      </div>
      <div className="content-down">
        <button className="btn-login" onClick={() => handleRegister()}>
          Resgister to Quiz Project
        </button>
        <div className="divider">
          <hr />
          <span>OR</span>
          <hr />
        </div>
        <button className="btn" onClick={() => navigate("/")}>
          Go to home page
        </button>
      </div>
    </div>
  );
};

export default Resgister;
