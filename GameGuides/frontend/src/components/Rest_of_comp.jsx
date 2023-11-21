import { Box, Input, Typography } from "@mui/material";
import React from "react";

function Rest_of_comp({ name, setName, description, setDescription }) {
  return (
    <>
      <Typography display="inline">Name:</Typography>
      <Input
        type="text"
        onChange={(e) => {
          setName(e.target.value)
        }}
      ></Input>
      <br></br>
      <Typography display="inline">Description:</Typography>
      <Input type="text" onChange={(e)=>{
        setDescription(e.target.value)
      }}></Input>
    </>
  );
}

export default Rest_of_comp;
