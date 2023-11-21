import React, { useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import {
  usePrepareContractWrite,
  useContractWrite,
  useContractRead,
  useAccount,
  useSigner,
} from "wagmi";
import {
  LensHub,
  abi_LensHub,
  createProfile,
  abi_createProfile,
  zeroaddress,
} from "./constants";
import { ethers } from "ethers";
import SubmitCollect from "./SubmitCollect";
import { TextField, Button, Table, Box, Typography } from "@mui/material";

function Collect() {
  const [profileId, setprofileId] = useState();
  const [pubId, setpubId] = useState();
  const [initdata, setinitdata] = useState();
  const [submitCollect, setsubmitCollect] = useState();
  function formSubmit() {
    setsubmitCollect(true);
  }
  return (
    <div>
      {submitCollect ? (
        <SubmitCollect
          profileId={profileId}
          pubId={pubId}
          initdata={initdata}
        ></SubmitCollect>
      ) : (
        <Box display="flex" justifyContent="center" pt="50px">
          <form onSubmit={formSubmit}>
            <Table>
              <tr>
                <td>
                  <TextField
                    size="small"
                    label="ProfileId"
                    placeholder="Enter your profile ID"
                    onChange={(e) => {
                      setprofileId(parseInt(e.target.value));
                    }}
                  ></TextField>
                </td>
              </tr>
              <tr>
                <td>
                  <TextField
                    size="small"
                    label="Publication Id"
                    placeholder="Enter your publication id"
                    onChange={(e) => {
                      setpubId(parseInt(e.target.value));
                    }}
                  ></TextField>
                </td>
              </tr>
              <tr>
                <td>
                  <TextField
                    size="small"
                    label="Init Data"
                    placeholder="0x00 for gated collect"
                    onChange={(e) => {
                      setinitdata(e.target.value);
                    }}
                  ></TextField>
                </td>
              </tr>
            </Table>
            <Typography display="flex" justifyContent="center" pt="15px">
              <Button type="submit">Submit</Button>
            </Typography>
          </form>
        </Box>
      )}
    </div>
  );
}

export default Collect;
