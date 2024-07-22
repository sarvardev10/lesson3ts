import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { TextField } from "@mui/material";
import useOrderStore from "../../../store/orders";
import getServise from "../../../store/services";
import Notification from "../../../utils/notification";
import { ordersUpdateValidationSchema } from "../../../utils/validation";
import MenuItem from "@mui/material/MenuItem";
import getClients from "../../../store/clients"

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #fff",
  borderRadius: 1.3,
  boxShadow: 24,
  p: 3,
};

export default function BasicModal({open, handleClose, item, handleOpen}) {
  const { updateOrder } = useOrderStore();
  const { getData, data } = getServise();
  const {client, getClient} = getClients();
  const [params] = React.useState({
    page: 1,
    limit: 10,
  });
  const initialValues = {
    amount: item.amount,
    client_id: item.client_id,
    service_id: item.service_id,
  };
  const updateData = async (values) => {
    const payload = {
        ...values,
        id: item.id,
        status: item.status,
    }
    const status = await updateOrder(payload);
    if (status === 200) {
      handleClose();
      Notification({
        title: "Buyurtma muvaffaqiyatli o'zgartirildi",
        type: "success",
      });
    } else {
      Notification({ title: "Xatolik yuz berdi", type: "error" });
    }
  };
  React.useEffect(()=>{
    getData(params);
  }, [handleOpen])
  React.useEffect(() => {
      getClient(params)
    },[])
    console.log(client)
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="keep-mounted-modal-title"
            className="text-center"
            variant="h6"
            component="h2"
          >
            Buyurtma qo'shish
          </Typography>
          <Formik
            initialValues={initialValues}
            validationSchema={ordersUpdateValidationSchema}
            onSubmit={updateData}
          >
            <Form>
              <Field
                name="client_id"
                select
                type="text"
                as={TextField}
                label="Mijozning to'liq ismi"
                fullWidth
                margin="normal"
                variant="outlined"
                helperText={
                  <ErrorMessage
                    name="client_id"
                    component="span"
                    className="text-[red] text-[15px]"
                  />
                }
              >
                {client.map((item, index) => (
                  <MenuItem key={index} value={item.id}>
                    {item.full_name}
                  </MenuItem>
                ))}
              </Field>
              <Field
                name="service_id"
                select
                label="Xizmatni tanlang"
                as={TextField}
                fullWidth
                margin="normal"
                variant="outlined"
                helperText={
                  <ErrorMessage
                    name="service_id"
                    component="span"
                    className="text-[red] text-[15px]"
                  />
                }
              >
                {data.map((item, index) => (
                  <MenuItem key={index} value={item.id}>
                    {item.name}
                  </MenuItem>
                ))}
              </Field>
              <Field
                name="amount"
                type="number"
                as={TextField}
                label="Buyurtma miqdori"
                fullWidth
                margin="normal"
                variant="outlined"
                helperText={
                  <ErrorMessage
                    name="amount"
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
                Qo'shish
              </Button>
            </Form>
          </Formik>
        </Box>
      </Modal>
    </div>
  );
}
