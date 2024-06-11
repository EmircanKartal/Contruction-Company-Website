import React from "react";
import { List, ListItem, Card, CardContent, Typography } from "@mui/material";
import { LuImagePlus } from "react-icons/lu";
import { CiBoxList } from "react-icons/ci";
import { RiLockPasswordLine } from "react-icons/ri";
import { MdOutlineWbSunny } from "react-icons/md"; // Sun icon
import { FaRegMoon } from "react-icons/fa"; // Moon icon
import { useTheme } from "./ThemeContext"; // Import the theme context
import Switch from "react-switch";
import "./Sidebar.css"; // Import custom CSS for the toggle switch

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
        height: "100vh", // Ensure it fills the viewport height
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
          <div
            className="theme-toggle"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Switch
              onChange={toggleTheme}
              checked={theme === "dark"}
              uncheckedIcon={
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                    fontSize: 24, // Adjust the size as needed
                    color: "black", // Sun icon color
                  }}
                >
                  <MdOutlineWbSunny />
                </div>
              }
              checkedIcon={
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                    fontSize: 24, // Adjust the size as needed
                    color: "white", // Moon icon color
                  }}
                >
                  <FaRegMoon />
                </div>
              }
              offColor="#fdd835"
              onColor="#070707"
              offHandleColor="#ffffff"
              onHandleColor="#ffffff"
              width={90}
              height={50}
              handleDiameter={40}
              boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
              activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
            />
            <div
              className="theme-toggle-label"
              style={{ marginTop: 8, fontFamily: "Arial, sans-serif" }}
            >
              {theme === "dark" ? "Dark Mode" : "Light Mode"}
            </div>
          </div>
        </ListItem>
      </List>
    </div>
  );
};

export default Sidebar;
