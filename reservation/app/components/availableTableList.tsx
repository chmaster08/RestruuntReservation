import { Box, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { Container } from "postcss";
import { useState } from "react";
import { TableType, convertToString } from '../libs/tabletype';
import AvailableReservationItem from "../libs/reservationItem";

interface AvailableTableListProps {
    availableTables:AvailableReservationItem[]
    tableSelected:Function
}


export default function AvailableTableList(props:AvailableTableListProps) {
    console.log(props.availableTables);
    const [selectedIndex, setSelectedIndex] = useState(0);

    const handleSelectedTable = (index:number, item : AvailableReservationItem) => {
        setSelectedIndex(index)
        props.tableSelected(item);
    }


    return (
      <>
        <List sx={{ width: "100%", maxWidth:500, bgcolor:"Background.paper" }}>
            {props.availableTables.map((item, index) => {
                return (
                  <ListItemButton
                    key={index}
                    selected={selectedIndex === index}
                    onClick={(event) => handleSelectedTable(index, item)}
                  >
                    <ListItemText
                      primary={item.time}
                      secondary={
                        convertToString(item.tableType)
                      }
                    ></ListItemText>
                  </ListItemButton>
                );
            
            })}
        </List>
      </>
    );
}