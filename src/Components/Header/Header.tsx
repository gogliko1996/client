import React from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/reducerStore/store";
import { logOut } from "../../page/Auth/redux/userReducer";
import { Spacer } from "../Spacer/Spacer";
import { Button, Row } from "../ScreenRoote/ScreenRoote";

export const Header: React.FC = () => {
  const user = useSelector((state: RootState) => state.createUser.user);
  const dispatch = useDispatch<AppDispatch >()

  const firstName = user.firstName[0]?.toUpperCase();
  const lastName = user.lastName[0]?.toUpperCase();

 

  return (
    <Spacer mt={20} mb={50} ml={10}>
      <Row justifyContent="space-between">
        <Stack direction="row" spacing={2}>
          <Avatar>
            {firstName}.{lastName}
          </Avatar>
        </Stack>
        <Spacer>
            <Button onClick={() => dispatch(logOut())}>Log Out</Button>
        </Spacer>
      </Row>
    </Spacer>
  );
};
