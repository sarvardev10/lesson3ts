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
import { ordersValidationSchema } from "../../../utils/validation";
import MenuItem from "@mui/material/MenuItem";
import { useMask } from "@react-input/mask";

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

export default function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { postOrder } = useOrderStore();
  const { getData, data } = getServise();
  const [params] = React.useState({
    page: 1,
    limit: 10,
  });
  const initialValues = {
    amount: "",
    client_phone_number: "",
    client_full_name: "",
    service_id: "",
  };
  const inputRef = useMask({
    mask: "+998 (__) ___-__-__",
    replacement: { _: /\d/ },
  });
  const postData = async (values) => {
    const phone_number = values.client_phone_number.replace(/\D/g, "");
    const payload = { ...values, client_phone_number: `+${phone_number}` };
    const status = await postOrder(payload);
    if (status === 201) {
      handleClose();
      Notification({
        title: "Buyurtma muvaffaqiyatli qo'shildi",
        type: "success",
      });
    } else {
      Notification({ title: "Xatolik yuz berdi", type: "error" });
    }
  };
  const getService = async () => {
    await getData(params);
  };
  return (
    <div>
      <div onClick={getService}>
        <Button variant="contained" onClick={handleOpen}>
          Buyurtma qo'shish
        </Button>
      </div>
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
            validationSchema={ordersValidationSchema}
            onSubmit={postData}
          >
            <Form>
              <Field
                name="client_full_name"
                type="text"
                as={TextField}
                label="Mijozning to'liq ismi"
                fullWidth
                margin="normal"
                variant="outlined"
                helperText={
                  <ErrorMessage
                    name="client_full_name"
                    component="span"
                    className="text-[red] text-[15px]"
                  />
                }
              />
              <Field
                name="client_phone_number"
                type="text"
                as={TextField}
                label="Mirozning telefon raqami"
                fullWidth
                margin="normal"
                variant="outlined"
                inputRef={inputRef}
                helperText={
                  <ErrorMessage
                    name="client_phone_number"
                    component="span"
                    className="text-[red] text-[15px]"
                  />
                }
              />
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
