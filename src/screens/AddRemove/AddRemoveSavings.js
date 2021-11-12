import React from 'react';
import AddRemoveSavingsBills from "./components/AddRemoveSavingsBills"



const AddRemoveSavings = ({route}) => {
  
  return(
    <>
      {
        route.params.from !== "wallet" ?
        <>
          <AddRemoveSavingsBills />
        </> :
        null
      }
    </>
  )
};

export default AddRemoveSavings;