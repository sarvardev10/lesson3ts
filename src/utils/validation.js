import * as Yup from "yup";

export const signUpValidationSchema = Yup.object().shape({
    full_name: Yup.string().required("Full name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().matches(/^(?=.*[a-z])(?=.*[A-Z]).{6,}$/, "Password must be at least 6 characters").required("Password is required"),
    phone_number: Yup.string().min(19, "Invalid phone number").required("Phone number is required"),
})

export const signInValidationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().matches(/^(?=.*[a-z])(?=.*[A-Z]).{6,}$/, "Password must be at least 6 characters").required("Password is required"),
})

export const verifyPassValidationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
})

export const updatePassValidationSchema = Yup.object().shape({
    new_password: Yup.string().matches(/^(?=.*[a-z])(?=.*[A-Z]).{6,}$/, "Password must be at least 6 characters").required("Password is required"),
    code: Yup.string().required().trim(),
})

// ------------- SERVICES --------------

export const servicesValidationSchema = Yup.object().shape({
    name: Yup.string().required("Xizmat nomini kiriting"),
    price: Yup.number().required("Xizmat narxini kiriting"),
})

// -------------- ORDERS --------------

export const ordersValidationSchema = Yup.object().shape({
    amount: Yup.string().required("Miqdorni kiriting"),
    client_phone_number: Yup.string().min(19, "Invalid phone number").required("Phone number is required"),
    client_full_name: Yup.string().required("Mijozning ismini kiriting"),
    service_id: Yup.string().required("Xizmatni tanlang"),
})

// -------------- ORDERS-UPDATE --------------

export const ordersUpdateValidationSchema = Yup.object().shape({
    amount: Yup.string().required("Miqdorni kiriting"),
    client_id: Yup.string().required("Mijozning ismini kiriting"),
    service_id: Yup.string().required("Xizmatni tanlang"),
})