import React from "react";
import {
  List,
  ListItem,
  Card,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import { LuImagePlus } from "react-icons/lu";
import { CiBoxList } from "react-icons/ci";
import { RiLockPasswordLine } from "react-icons/ri";
import { useTheme } from "./ThemeContext"; // Import the theme context

interface SidebarProps {
  onSelect: (view: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onSelect }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div
      style={{
        width: "280px",
        backgroundColor: "#0056b3",
        padding: "20px",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px",
      }}
    >
      <List component="nav" style={{ width: "100%", marginTop: 170 }}>
        <ListItem
          button
          onClick={() => onSelect("add")}
          style={{ justifyContent: "center" }}
        >
          <Card
            style={{
              width: "100%",
              backgroundColor: "#0056b3",
              color: "white",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "20px",
              cursor: "pointer",
            }}
          >
            <CardContent
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <LuImagePlus size={50} />
              <Typography
                variant="h6"
                style={{
                  color: "white",
                  fontWeight: "bold",
                  fontFamily: "Nunito, sans-serif",
                  marginTop: "10px",
                }}
              >
                Yeni Proje Ekle
              </Typography>
            </CardContent>
          </Card>
        </ListItem>
        <ListItem
          button
          onClick={() => onSelect("list")}
          style={{ justifyContent: "center" }}
        >
          <Card
            style={{
              width: "100%",
              backgroundColor: "#0056b3",
              color: "white",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "20px",
              cursor: "pointer",
            }}
          >
            <CardContent
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <CiBoxList size={50} />
              <Typography
                variant="h6"
                style={{
                  color: "white",
                  fontWeight: "bold",
                  fontFamily: "Nunito, sans-serif",
                  marginTop: "10px",
                }}
              >
                Projeleri Listele
              </Typography>
            </CardContent>
          </Card>
        </ListItem>
        <ListItem
          button
          onClick={() => onSelect("admin")}
          style={{ justifyContent: "center" }}
        >
          <Card
            style={{
              width: "100%",
              backgroundColor: "#0056b3",
              color: "white",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "20px",
              cursor: "pointer",
            }}
          >
            <CardContent
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <RiLockPasswordLine size={50} />
              <Typography
                variant="h6"
                style={{
                  color: "white",
                  fontWeight: "bold",
                  fontFamily: "Nunito, sans-serif",
                  marginTop: "10px",
                }}
              >
                Admin
              </Typography>
            </CardContent>
          </Card>
        </ListItem>
        <ListItem
          style={{
            justifyContent: "center",
            marginTop: 20,
          }}
        >
          <Button variant="contained" onClick={toggleTheme}>
            {theme === "dark" ? "Light Mode" : "Dark Mode"}
          </Button>
        </ListItem>
      </List>
    </div>
  );
};

export default Sidebar;
