import Wrapper from "../components/UI/Wrapper";
import GoldList from "../components/Gold/GoldList";
import GoldChart from "../components/Gold/GoldChart";
import {useLoaderData} from "react-router-dom";
 export type goldEntries = {data: Date, cena: number}[]
const GoldPage = () => {
    const loaderData = useLoaderData();
    const entries = loaderData as goldEntries;
    console.log(loaderData);
  return (
      <Wrapper>
        <GoldList goldEntries={entries}/>
        <GoldChart/>
      </Wrapper>
  )
}
export default GoldPage;