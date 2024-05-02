import { Box, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { Container } from "postcss";
import { useState } from "react";
import TableType from '../libs/tabletype';
import ReservationItem from "../libs/reservationItem";

interface AvailableTableListProps {
    availableTables:ReservationItem[]
    tableSelected:Function
}


export default function AvailableTableList(props:AvailableTableListProps) {

    const [selectedIndex, setSelectedIndex] = useState(1);

    const handleSelectedTable = (index:number) => {
        setSelectedIndex(index);
        props.tableSelected(props.availableTables[index]);
    }


    return (
      <>
        <List sx={{ width: "100%", maxWidth:500, bgcolor:"Background.paper" }}>
            {props.availableTables.map((item, index) => {
                return (
                  <ListItemButton
                    key={index}
                    selected={selectedIndex === index}
                    onClick={(event) => handleSelectedTable(index)}
                  >
                    <ListItemText
                      primary={item.time}
                      secondary={
                        item.tableType === TableType.Indoor ? "屋内" : "テラス"
                      }
                    ></ListItemText>
                  </ListItemButton>
                );
            
            })}
        </List>
      </>
    );
}