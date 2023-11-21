import React, { useState } from "react";
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
import Post from "./Post";
import { Checkbox, TextField, Button, Box, Table } from "@mui/material";

function PreparePost() {
  const [profileId, setprofileId] = useState();
  const [contentURI, setcontentURI] = useState();
  const [tokens, settokens] = useState();
  const [contract, setcontract] = useState();
  const [isERC20, setisERC20] = useState(false);
  const [isERC721, setisERC721] = useState(false);
  const [isOR, setisOR] = useState();
  const [balances, setBalances] = useState();
  const [collectModuleInitData, setcollectModuleInitData] = useState();
  function generateInitData() {
    let collectModuleInitData_ = ethers.utils.defaultAbiCoder.encode(
      ["uint[]", "address", "bool", "bool", "bool", "uint[]"],
      [tokens, contract, isERC20, isERC721, isOR, balances]
    );
    setcollectModuleInitData(collectModuleInitData_);
    console.log(collectModuleInitData_);
  }

  const collectModule = "0xf6BACBBB7Add10C7936C5C21fFc0479E49dff077";

  const referenceModule = zeroaddress;
  const referenceModuleInitData = "0x00";

  return (
    <>
    <Box display="flex" justifyContent="center" pt="50px">
    <form>
      <Table>
        <tr>
          <td>
            <TextField
              label="Profile Id"
              size="small"
              variant="outlined"
              onChange={(e) => {
                let id = parseInt(e.target.value);
                setprofileId(id);
              }}
            ></TextField>
          </td>
        </tr>
        <tr>
          <td>
            <TextField
              size="small"
              label="ContentURI"
              onChange={(e) => {
                setcontentURI(e.target.value);
              }}
            ></TextField>
          </td>
        </tr>
        <tr>
          <td>
            <TextField
              size="small"
              label="Token Ids"
              onChange={(e) => {
                const tokens = e.target.value.split(" ").map((token) => {
                  return parseInt(token);
                });
                settokens(tokens);
              }}
            ></TextField>
          </td>
        </tr>
        <tr>
          <td>
            <TextField
              size="small"
              label="Contract Address"
              onChange={(e) => setcontract(e.target.value)}
            ></TextField>
          </td>
        </tr>
        <tr>
          <td>
            <TextField
              size="small"
              label="Balances"
              onChange={(e) => {
                let balances_ = e.target.value.split(" ").map((balance) => {
                  return parseInt(balance);
                });
                console.log(balances_);
                setBalances(balances_);
              }}
            ></TextField>
          </td>
        </tr>
        <tr>
          <td>
            <Checkbox
              onChange={(e) => {
                if (e.target.checked) {
                  setisERC20(true);
                } else {
                  setisERC20(false);
                }
              }}
            ></Checkbox>
            isERC20
            <Checkbox
              onChange={(e) => {
                if (e.target.checked) {
                  setisERC721(true);
                } else {
                  setisERC721(false);
                }
              }}
            ></Checkbox>
            isERC721
            
          </td>
        </tr>
        <tr>
          <td>
          <Checkbox
              onChange={(e) => {
                if (e.target.checked) {
                  setisOR(true);
                } else {
                  setisOR(false);
                }
              }}
            ></Checkbox>
            isOR
          </td>
        </tr>
      </Table>
      </form>
      </Box>
      <Box display="flex" justifyContent="center">
      {collectModuleInitData ? (
        <>
          <Post
            profileId={profileId}
            contentURI={contentURI}
            collectModule={collectModule}
            collectModuleInitData={collectModuleInitData}
            referenceModule={referenceModule}
            referenceModuleInitData={referenceModuleInitData}
          ></Post>
        </>
      ) : (
        <Button onClick={generateInitData}>Generate Init Data</Button>
      )}
    </Box>
    </>
  );
}

export default PreparePost;
