import { useState } from "react";

// material-ui
import {
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from "@mui/material";

// assets
import { Profile } from "iconsax-react";
import axios from "axios";

// ==============================|| HEADER PROFILE - SETTING TAB ||============================== //

const SettingTab = ({ roles }) => {
    const handleListItemClick = (role) => {
        axios
            .post(`/change-role/${role}`)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <List
            component="nav"
            sx={{ p: 0, "& .MuiListItemIcon-root": { minWidth: 32 } }}
        >
            {roles?.map((role) => {
                return (
                    <ListItemButton onClick={() => handleListItemClick(role)}>
                        <ListItemIcon>
                            <Profile variant="Bulk" size={18} />
                        </ListItemIcon>
                        <ListItemText
                            sx={{ textTransform: "capitalize" }}
                            primary={role}
                        />
                    </ListItemButton>
                );
            })}
        </List>
    );
};

export default SettingTab;
