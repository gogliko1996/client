import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/reducerStore/store";
import { useNavigate } from "react-router-dom";
import { getUser, loginUser } from "../redux/userReducer";
import { screen } from "../../../routes/routeName";
import { Card, Content, Input, Row, ScreenContent } from "../../../components/ScreenRoote/ScreenRoote";
import { Spacer } from "../../../components/Spacer/Spacer";


export const SignIn = () => {
  const creatUser = useSelector((state: RootState) => state.createUser.createUser);
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
                <button type="submit">Submit</button>
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
