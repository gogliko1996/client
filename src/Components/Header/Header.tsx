import React from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { Spacer } from "../Spacer/Spacer";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/reducerStore/store";
import { Button, Row } from "../ScreenRoote/ScreenRoote";
import { logOut  } from "../../redux/reducers/userReducer";

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
