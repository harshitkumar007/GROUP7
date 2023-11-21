import React, { useEffect, useState } from "react";
import axios from "axios";
import { useContractRead } from "wagmi";
import { ggMarket, abi_ggMarket } from "./Contract_addr";
import { ethers } from "ethers";
import { Backdrop, Box, CircularProgress,Stack } from "@mui/material";
import GetCard from "./GetCard";

function Market() {
  const [listings, setlistings] = useState();
  const [loading, setloading] = useState(true);
  const { isLoading } = useContractRead({
    address: ggMarket,
    abi: abi_ggMarket,
    functionName: "getListings",
    onSuccess: async (data) => {
      const items = await Promise.all(
        data.map(async (i) => {
          const listId = parseInt(i.ListingId);
          const id = parseInt(i.tokenId);
          const price_each = Math.round(
            parseInt(i.price_each) / 10 ** 18
          ).toFixed(2);
          const amt = parseInt(i.amount);
          let item = {
            ListingId: listId,
            TokenAddress: i.TokenAddress,
            Seller: i.seller,
            TokenId: id,
            Amount: amt,
            Price_each: price_each,
            State: i.state,
          };
          return item;
        })
      );
      setloading(false);
      setlistings(items);
    },
  });

  if (!listings) {
    return (
      <Backdrop
        open={loading}
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <CircularProgress color="inherit"></CircularProgress>
      </Backdrop>
    );
  } else {
    return (
      <>
        <Stack direction="row" spacing="15px">
          {listings.map((listing) => {
            return (
              <GetCard
                TokenId={listing.TokenId}
                ListingId={listing.ListingId}
                Amount={listing.Amount}
                Price_each={listing.Price_each}
              ></GetCard>
            );
          })}
        </Stack>
      </>
    );
  }
}

export default Market;
