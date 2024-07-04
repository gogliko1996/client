import React, { useState } from "react";
import {
  Card,
  Content,
  Input,
  Row,
  ScreenContent,
} from "../../Components/ScreenRoote/ScreenRoote";
import { Spacer } from "../../Components/Spacer/Spacer";
import { useNavigate } from "react-router-dom";
import { screen } from "../../routes/routeName";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux/reducerStore/store";
import { loginUser, getUser } from "../../redux/reducers/userReducer";

export const SignIn = () => {
  const creatUser = useSelector((state: any) => state.createUser.createUser);
  const [userObject, setUserObject] = useState({
    email: creatUser.email ? creatUser.email : "",
    password: "",
  });

  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();

  const handleChange = (e: any) => {
    setUserObject({
      ...userObject,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    dispatch(loginUser(userObject)).then((data) => {
      if (data.type === "user/loginUser/fulfilled") {
        dispatch(getUser()).then((user) => {
          if (user.type === "getUser/user/fulfilled") {
            navigate(screen.home);
          }
        });
      }
    });
  };

  return (
    <ScreenContent>
      <Content>
        <Row justifyContent="center">
          <Card
            width={400}
            paddingLeft={20}
            paddingRight={30}
            paddingBottom={30}
            paddingTop={10}
          >
            <form onSubmit={handleSubmit} autoComplete="off">
              <Input
                type="email"
                name="email"
                value={userObject.email}
                onChange={handleChange}
              />
              <Spacer mt={20} mb={20}>
                <Input
                  type="password"
                  name="password"
                  value={userObject.password}
                  onChange={handleChange}
                />
              </Spacer>
              <Row justifyContent="space-between">
                <button  type="submit">Submit</button>
                <button type="button" onClick={() => navigate(screen.signUp)}>
                  SignUp
                </button>
              </Row>
            </form>
          </Card>
        </Row>
      </Content>
    </ScreenContent>
  );
};
