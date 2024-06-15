import React from "react";
import {
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  IconButton,
} from "@mui/material";
import "./EmailDialog.css"; // Ensure this is imported
import { MdAlternateEmail, MdPhone, MdClose } from "react-icons/md";
import { GoMail } from "react-icons/go";

interface Email {
  ID: number;
  EmailSubject: string;
  Email: string;
  date: string;
  Name: string;
  Surname: string;
  Phone: string;
  Message: string;
}

interface EmailDialogProps {
  isEmailModalOpen: boolean;
  setIsEmailModalOpen: (open: boolean) => void;
  selectedEmail: Email | null;
}

const EmailDialog: React.FC<EmailDialogProps> = ({
  isEmailModalOpen,
  setIsEmailModalOpen,
  selectedEmail,
}) => {
  const dialogStyle = {
    backgroundColor: "#ffffff",
    color: "#000000",
    borderRadius: "10px",
    padding: "20px",
    maxWidth: "600px",
    margin: "0 auto",
  };

  return (
    <Dialog
      open={isEmailModalOpen}
      onClose={() => setIsEmailModalOpen(false)}
      PaperProps={{
        style: dialogStyle,
      }}
      BackdropProps={{
        style: { backgroundColor: "#ffd9000c" }, // This will change the outer part color
      }}
    >
      <div className="dialog-container">
        <div className="header-container">
          <div className="sender-info">
            <MdAlternateEmail
              style={{ marginRight: "10px", fontSize: "24px", color: "#555" }}
            />
            <Typography variant="subtitle1" className="dialog-subtitle">
              From: {selectedEmail?.Name} {selectedEmail?.Surname}
            </Typography>
          </div>
          <IconButton
            onClick={() => setIsEmailModalOpen(false)}
            className="close-button"
          >
            <MdClose style={{ color: "#aaa", fontSize: "24px" }} />
          </IconButton>
          <Typography variant="subtitle1" className="date-info">
            {selectedEmail?.date}
          </Typography>
        </div>
        <DialogTitle>
          <Typography variant="h5" className="dialog-title">
            {selectedEmail?.EmailSubject}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <div className="info-row">
            <GoMail className="info-icon" />
            <Typography variant="subtitle1" className="dialog-subtitle">
              {selectedEmail?.Email}
            </Typography>
          </div>
          <div className="info-row">
            <MdPhone className="info-icon" />
            <Typography variant="subtitle1" className="dialog-subtitle">
              {selectedEmail?.Phone}
            </Typography>
          </div>
          <DialogContentText className="dialog-content-text">
            {selectedEmail?.Message}
          </DialogContentText>
        </DialogContent>
      </div>
    </Dialog>
  );
};

export default EmailDialog;
