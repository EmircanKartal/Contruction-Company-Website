import React, { useEffect, useState } from "react";
import {
  List,
  Typography,
  Box,
  Grid,
  Paper,
  IconButton,
  Avatar,
  Badge,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Checkbox,
} from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import DeleteIcon from "@mui/icons-material/Delete";
import { styled } from "@mui/system";
import { MdOutlineCancel } from "react-icons/md";
import { useTheme } from "./ThemeContext"; // Import the theme context
import styles from "./style.module.css";
import EmailDialog from "./EmailDialog"; // Import the EmailDialog component

interface Email {
  ID: number;
  EmailSubject: string;
  Email: string;
  Time: string;
  Name: string;
  Surname: string;
  Phone: string;
  Message: string;
}

const ClientInbox: React.FC = () => {
  const [emails, setEmails] = useState<Email[]>([]);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedEmailId, setSelectedEmailId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [emailsPerPage] = useState(5); // Set number of emails per page
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [highlightedEmailId, setHighlightedEmailId] = useState<number | null>(
    null
  );
  const { theme } = useTheme(); // Use the theme context
  const [selectedEmailIds, setSelectedEmailIds] = useState(new Set<number>());

  useEffect(() => {
    fetchEmails();
  }, []);

  const fetchEmails = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/inbox");
      const data = await response.json();
      setEmails(data);
    } catch (error) {
      console.error("Failed to fetch emails:", error);
    }
  };

  const toggleEmailSelection = (id: number) => {
    setSelectedEmailIds((prevSelected) => {
      const newSelected = new Set(prevSelected);
      if (newSelected.has(id)) {
        newSelected.delete(id);
      } else {
        newSelected.add(id);
        setHighlightedEmailId(id); // Set the highlighted email ID
      }
      return newSelected;
    });
  };

  const deleteSelectedEmails = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/inbox/delete-multiple",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ids: Array.from(selectedEmailIds) }),
        }
      );
      if (response.ok) {
        setEmails((prevEmails) =>
          prevEmails.filter((email) => !selectedEmailIds.has(email.ID))
        );
        setSelectedEmailIds(new Set()); // Clear selected IDs
      } else {
        const errorData = await response.json();
        console.error("Failed to delete emails:", errorData);
      }
    } catch (error) {
      console.error("Failed to delete emails:", error);
    }
  };

  const deleteEmail = async () => {
    if (selectedEmailId !== null) {
      try {
        const response = await fetch(
          `http://localhost:8080/api/inbox/${selectedEmailId}`,
          { method: "DELETE" }
        );
        if (response.ok) {
          setEmails((prevEmails) =>
            prevEmails.filter((email) => email.ID !== selectedEmailId)
          );
        } else {
          const errorData = await response.json();
          console.error("Failed to delete email:", errorData);
        }
      } catch (error) {
        console.error("Failed to delete email:", error);
      }
      setIsDeleteDialogOpen(false);
    }
  };

  const handleDeleteClick = (id: number) => {
    setSelectedEmailId(id);
    setIsDeleteDialogOpen(true);
  };

  const handleEmailClick = (email: Email) => {
    setSelectedEmail(email);
    setIsEmailModalOpen(true);
  };

  const isDarkMode = theme === "dark";
  const indexOfLastEmail = currentPage * emailsPerPage;
  const indexOfFirstEmail = indexOfLastEmail - emailsPerPage;
  const currentEmails = emails.slice(indexOfFirstEmail, indexOfLastEmail);
  const headerColor = isDarkMode ? "#ffffff" : "#000000";
  const EmailItemMailInfo = isDarkMode ? "#ffffff" : "#000000";
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const dialogStyle = {
    backgroundColor: "#ffffff",
    color: "#000000",
  };

  const getButtonTextStyle = (isActive: boolean, isDisabled: boolean) => {
    if (isDisabled) {
      return { color: "#174ea6", fontWeight: "bold" };
    }
    if (isActive) {
      return { color: isDarkMode ? "#ffffff" : "#000000", fontWeight: "bold" };
    }
    return { color: isDarkMode ? "#ffffff" : "#000000", fontWeight: "bold" };
  };

  const EmailItem = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    marginBottom: theme.spacing(1),
    display: "flex",
    alignItems: "center",
    backgroundColor: isDarkMode ? "#003366" : "#ffffff",
    color: isDarkMode ? "#ffffff" : "#000000",
    border: isDarkMode ? "none" : "1px solid #003d7a",
  }));

  const isLastPage = currentPage * emailsPerPage >= emails.length;
  const isFirstPage = currentPage === 1;

  return (
    <Box sx={{ padding: "20px" }}>
      <h1
        className={styles.addNewHeader}
        style={{
          display: "flex",
          justifyContent: "center",
          color: headerColor,
          marginTop: 60,
          marginBottom: 40,
          fontFamily: "Termina",
        }}
      >
        Inbox
      </h1>
      <Box display="flex" justifyContent="flex-end">
        <Button
          onClick={() => deleteSelectedEmails()}
          disabled={selectedEmailIds.size === 0}
          sx={{
            color: selectedEmailIds.size > 0 ? "#f23030" : "#888888",
            backgroundColor: selectedEmailIds.size > 0 ? "#ffcccc" : "#eeeeee",
            fontSize: "15px",
            fontWeight: "bold",
            fontFamily: "Montserrat",
            "&:hover": {
              backgroundColor:
                selectedEmailIds.size > 0 ? "#ffaaaa" : "#dddddd",
            },
          }}
          startIcon={<DeleteIcon />}
        >
          Seçili Mesajları Sil
        </Button>
      </Box>

      <List>
        {currentEmails.map((email) => (
          <EmailItem
            key={email.ID}
            onClick={() => handleEmailClick(email)}
            className={selectedEmailIds.has(email.ID) ? styles.highlight : ""}
          >
            <Grid container spacing={2}>
              <Grid item>
                <Checkbox
                  checked={selectedEmailIds.has(email.ID)}
                  onChange={() => toggleEmailSelection(email.ID)}
                  onClick={(e: React.MouseEvent) => e.stopPropagation()}
                  style={{
                    color: isDarkMode ? "white" : "black",
                    marginRight: 30,
                  }}
                  sx={{
                    "& .MuiSvgIcon-root": {
                      // Targeting the internal SVG icon
                      fontSize: 30, // Adjust size as needed
                    },
                  }}
                />
                <Badge color="secondary" variant="dot">
                  <Avatar>
                    <MailIcon />
                  </Avatar>
                </Badge>
              </Grid>
              <Grid item xs>
                <Typography variant="h6">{email.EmailSubject}</Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  style={{ color: EmailItemMailInfo }}
                >
                  {email.Email}
                </Typography>
                <Typography variant="body2">{email.Time}</Typography>
                <Typography variant="body2">{email.Message}</Typography>
              </Grid>
              <Grid item>
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteClick(email.ID);
                  }}
                  color="secondary"
                >
                  <DeleteIcon />
                </IconButton>
              </Grid>
            </Grid>
          </EmailItem>
        ))}
      </List>
      <Box display="flex" justifyContent="center" marginTop="20px">
        <Button
          onClick={() => paginate(currentPage - 1)}
          disabled={isFirstPage}
          sx={getButtonTextStyle(!isFirstPage, isFirstPage)}
        >
          Geri
        </Button>
        <Button
          onClick={() => paginate(currentPage + 1)}
          disabled={isLastPage}
          sx={getButtonTextStyle(!isLastPage, isLastPage)}
        >
          İleri
        </Button>
      </Box>
      <EmailDialog
        isEmailModalOpen={isEmailModalOpen}
        setIsEmailModalOpen={setIsEmailModalOpen}
        selectedEmail={selectedEmail}
      />
      <Dialog
        open={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        PaperProps={{
          style: dialogStyle,
        }}
      >
        <DialogTitle style={{ fontFamily: "Montserrat", marginTop: "15px" }}>
          {`Bu mesajı silmek istediğinizden emin misiniz?`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText style={{ fontFamily: "Helvetica" }}>
            Çünkü bunu yaparsanız bu mesaj kalıcı olarak silinecektir.
          </DialogContentText>
        </DialogContent>
        <div style={{ marginBottom: "-10px" }}></div>
        <DialogActions
          style={{
            justifyContent: "center",
            paddingTop: "20px",
            paddingBottom: "30px",
          }}
        >
          <Button
            onClick={() => setIsDeleteDialogOpen(false)}
            style={{
              color: "#0056b3",
              marginRight: 60,
              fontFamily: "Montserrat",
              fontSize: "1.1rem",
            }}
            startIcon={<MdOutlineCancel style={{ fontSize: "1.34rem" }} />}
          >
            İptal et
          </Button>
          <Button
            onClick={deleteEmail}
            style={{
              color: "#ff0000",
              fontFamily: "Montserrat",
              fontSize: "1.1rem",
            }}
            startIcon={<DeleteIcon style={{ fontSize: "1.34rem" }} />}
          >
            Sil
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ClientInbox;
