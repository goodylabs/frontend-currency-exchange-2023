import Wrapper from "../components/UI/Wrapper";
import GoldList from "../components/Gold/GoldList";
import GoldChart from "../components/Gold/GoldChart";
import {useLoaderData} from "react-router-dom";
import GoldProvider from "../context/GoldProvider";
import {goldEntries} from "../types/types";


const GoldPage = () => {
    const loaderData = useLoaderData();
    const entries = loaderData as goldEntries;
  return (
      <Wrapper gridMode={true}>
          <GoldProvider data={entries}>
              <GoldList/>
                  <GoldChart chartType={"bar"}/>
                  <GoldChart chartType={"line"}/>
          </GoldProvider>
      </Wrapper>
  )
}
export default GoldPage;