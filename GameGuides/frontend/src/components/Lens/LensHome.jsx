import { Input, Box, Button, ButtonGroup } from "@mui/material";
import React, { useState } from "react";
import Collect from "./Collect";
import PreparePost from "./PreparePost";

function LensHome() {
  const [ispost, setispost] = useState(true);
  return (
    <Box>
      <ButtonGroup fullWidth>
        <Button
          onClick={() => {
            setispost(true);
          }}
        >
          Create A Post
        </Button>
        <Button
          onClick={() => {
            setispost(false);
          }}
        >
          Collect A Post
        </Button>
      </ButtonGroup>
      {ispost ? <PreparePost></PreparePost> : <Collect></Collect>}
    </Box>
  );
}

export default LensHome;
