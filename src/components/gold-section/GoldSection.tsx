import {
  Alert,
  Box,
  CircularProgress,
  IconButton,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { GoldDataType } from "./GoldTypes";
import GoldChart from "./GoldChart";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import "./GoldSection.css";

const GoldSection = () => {
  const GOLD_DATA_TIME_SPAN = 90;
  const DAYS_IN_WEEK = 7;
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
        `https://api.nbp.pl/api/cenyzlota/last/${GOLD_DATA_TIME_SPAN}/?format=json`
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
      if (arrayDaysAmount + DAYS_IN_WEEK > GOLD_DATA_TIME_SPAN) {
        setArrayDaysAmount(GOLD_DATA_TIME_SPAN);
        return;
      } else {
        setArrayDaysAmount(arrayDaysAmount + DAYS_IN_WEEK);
      }
    }
  };

  const handleDecreaseDayAmount = () => {
    if (arrayDaysAmount > DAYS_IN_WEEK) {
      if (arrayDaysAmount - DAYS_IN_WEEK < DAYS_IN_WEEK) {
        setArrayDaysAmount(DAYS_IN_WEEK);
        return;
      } else {
        setArrayDaysAmount(arrayDaysAmount - DAYS_IN_WEEK);
      }
    }
  };

  if (isGoldDataLoading) {
    return (
      <Box>
        <CircularProgress color="primary" />
      </Box>
    );
  } else if (goldDataError) {
    return (
      <Box>
        <Alert variant="outlined" severity="error">
          Error while loading gold data
        </Alert>
      </Box>
    );
  }

  return (
    <Box>
      {goldData && (
        <GoldChart goldData={goldData} arrayDaysAmount={arrayDaysAmount} />
      )}
      <Box className="gold-section-container">
        <Typography
          variant="h5"
          align="center"
          className="gold-section-buttons-title"
        >
          CHANGE AMOUNT OF DAYS
        </Typography>
        <Box className="gold-section-buttons-container">
          <IconButton
            color="primary"
            size="large"
            onClick={handleDecreaseDayAmount}
          >
            <RemoveIcon sx={{ fontSize: "2.2rem" }} />
          </IconButton>
          <IconButton
            color="primary"
            size="large"
            onClick={handleIncreaseDayAmount}
          >
            <AddIcon sx={{ fontSize: "2.2rem" }} />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default GoldSection;
