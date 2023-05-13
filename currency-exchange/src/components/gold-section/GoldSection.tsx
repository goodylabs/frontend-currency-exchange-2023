import { Alert, Box, IconButton } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { GoldDataType } from "./GoldTypes";
import GoldChart from "./GoldChart";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const GoldSection = () => {
  const GOLD_DATA_TIME_SPAN = 90;
  const [goldData, setGoldData] = useState<GoldDataType[] | null>(null);
  const [goldDataError, setGoldDataError] = useState(false);
  const [isGoldDataLoading, setIsGoldDataLoading] = useState(true);
  const [arrayDaysAmount, setArrayDaysAmount] = useState(14);

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

  const handleIncreaseDayAmount = () => {
    if (arrayDaysAmount < GOLD_DATA_TIME_SPAN) {
      if (arrayDaysAmount + 7 > GOLD_DATA_TIME_SPAN) {
        setArrayDaysAmount(GOLD_DATA_TIME_SPAN);
        return;
      } else {
        setArrayDaysAmount(arrayDaysAmount + 7);
      }
    }
  };

  const handleDecreaseDayAmount = () => {
    if (arrayDaysAmount > 7) {
      if (arrayDaysAmount - 7 < 7) {
        setArrayDaysAmount(7);
        return;
      } else {
        setArrayDaysAmount(arrayDaysAmount - 7);
      }
    }
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

  return (
    <Box>
      {goldData && (
        <GoldChart goldData={goldData} arrayDaysAmount={arrayDaysAmount} />
      )}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <p>Change days span</p>
        <Box sx={{ display: "flex", gap: "1rem" }}>
          <IconButton size="large" onClick={handleDecreaseDayAmount}>
            <RemoveIcon />
          </IconButton>
          <IconButton size="large" onClick={handleIncreaseDayAmount}>
            <AddIcon />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default GoldSection;
