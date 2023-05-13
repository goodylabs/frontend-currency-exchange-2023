import { Alert, Box } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { GoldDataType } from "./GoldTypes";
import GoldChart from "./GoldChart";

const GoldSection = () => {
  const GOLD_DATA_TIME_SPAN = 90;
  const [goldData, setGoldData] = useState<GoldDataType[] | null>(null);
  const [goldDataError, setGoldDataError] = useState(false);
  const [isGoldDataLoading, setIsGoldDataLoading] = useState(true);

  useEffect(() => {
    getGoldData();
  }, []);

  const getGoldData = async () => {
    setIsGoldDataLoading(true);
    axios
      .get(
        `http://api.nbp.pl/api/cenyzlota/last/${GOLD_DATA_TIME_SPAN}/?format=json`
      )
      .then((response) => {
        setGoldData(response.data);
      })
      .catch((error) => {
        setGoldDataError(true);
        console.log(error);
      })
      .finally(() => {
        setIsGoldDataLoading(false);
      });
  };

  if (isGoldDataLoading) {
    return (
      <Box>
        <Alert variant="outlined" severity="info">
          Loading gold data...
        </Alert>
      </Box>
    );
  }

  return <Box>{goldData && <GoldChart goldData={goldData} />}</Box>;
};

export default GoldSection;
