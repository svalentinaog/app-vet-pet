import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Animal } from "./AnimalCard";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { Box, Button } from "@mui/material";
import AnimalModalEdit from "./AnimalModalEdit";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface TransitionsModalProps {
  open: boolean;
  onClose: () => void; // Callback para manejar el cierre del modal
}

interface AnimalModalEditProps extends TransitionsModalProps {
  animal: Animal; // Propiedad que representa al animal
}

function AnimalDetail({ open, onClose, animal }: AnimalModalEditProps) {
  const [openEdit, setOpenEdit] = React.useState(false);
  const handleEditModalOpen = () => setOpenEdit(true);
  const handleEditModalClose = () => setOpenEdit(false);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Detalles de {animal.name}</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ marginTop: 2 }}>
          <Grid item xs={12} sm={6}>
            <Card>
              <CardMedia
                component="img"
                height="400"
                image={animal.image}
                alt={animal.name}
                sx={{
                  objectFit: "contain",
                  borderRadius: "8px",
                  maxHeight: "100%",
                  marginLeft: "auto",
                  marginRight: "auto",
                  marginTop: "auto",
                  marginBottom: "auto",
                  margin: "auto",
                }}
              />
              <CardContent
                sx={{
                  position: "relative",
                }}
              >
                {animal.id == 1 ? (
                  <Box
                    onClick={handleEditModalOpen}
                    sx={{
                      position: "absolute",
                      backgroundColor: "text.secondary",
                      color: "rgba(0, 0, 0, 0.1)",
                      padding: 3,
                      width: "20px",
                      height: "10px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "10px",
                      top: 0,
                      right: 10,
                      ":hover": {
                        backgroundColor: "text.primary",
                        cursor: "pointer",
                        transition: "background-color 0.3s ease-in-out",
                      },
                      transition: "all",
                    }}
                  >
                    <BorderColorIcon
                      sx={{
                        color: "white",
                        fontSize: 16,
                      }}
                    />
                  </Box>
                ) : (
                  ""
                )}
                <Typography variant="body1" color="text.primary">
                  <strong>Nombre:</strong> {animal.name}
                </Typography>
                <Typography variant="body1" color="text.primary">
                  <strong>Estado:</strong> {animal.status}
                </Typography>
                <Typography variant="body1" color="text.primary">
                  <strong>Ubicación:</strong> {animal.location}
                </Typography>
                <Typography variant="body1" color="text.primary">
                  <strong>Teléfono:</strong> {animal.phone}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" color="text.primary" gutterBottom>
                  Descripción
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {animal.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </DialogContent>
      {/* Renderizamos el modal hijo */}
      {animal.id == 1 && openEdit && (
        <AnimalModalEdit
          open={openEdit}
          onClose={handleEditModalClose}
          animal={animal}
        />
      )}
    </Dialog>
  );
}

export default AnimalDetail;
