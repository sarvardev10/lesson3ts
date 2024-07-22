import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
// import { Field, Formik } from "formik";
// import { Form } from "react-router-dom";
import { TextField } from "@mui/material";
import { ErrorMessage, Field, Formik, Form } from "formik";
import { servicesValidationSchema } from "../../../utils/validation";
import useServiceStore from "../../../store/services";
import { getDataFromCookie } from "../../../utils/data-service";
import Notification from "../../../utils/notification";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #fff",
  borderRadius: 1.3,
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({ open, handleClose, item }) {
  const { postData, updateData } = useServiceStore();
  const initialValues = {
    name: item.name || "",
    price: item.price || "",
  };
  const handleSubmit = async (values) => {
    const payload = {
      ...values,
      price: Number(values.price),
      owner_id: getDataFromCookie("user_id"),
    };
    if (!item.id) {
      const status = await postData(payload);
      if (status === 201) {
        handleClose();
        Notification({
          title: "Service added successfully",
          type: "success",
        });
      } else {
        Notification({ title: "Service added failed", type: "error" });
      }
    } else {
      const status = await updateData({...payload, id: item.id });
      if (status === 200) {
        handleClose();
        Notification({
          title: "Service updated",
          type: "success",
        });
      }
    }
  };

  return (
    <div>
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="keep-mounted-modal-title"
            className="text-center"
            variant="h6"
            component="h2"
          >
            Add service
          </Typography>
          <Formik
            initialValues={initialValues}
            validationSchema={servicesValidationSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              <Field
                name="name"
                type="text"
                as={TextField}
                label="Service name"  
                fullWidth
                margin="normal"
                variant="outlined"
                helperText={
                  <ErrorMessage
                    name="name"
                    component="span"
                    className="text-[red] text-[15px]"
                  />
                }
              />
              <Field
                name="price"
                type="number"
                as={TextField}
                label="Service price"
                fullWidth
                margin="normal"
                variant="outlined"
                helperText={
                  <ErrorMessage
                    name="price"
                    component="span"
                    className="text-[red] text-[15px]"
                  />
                }
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
              >
                Add
              </Button>
            </Form>
          </Formik>
        </Box>
      </Modal>
    </div>
  );
}
