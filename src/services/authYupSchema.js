import {object,string,ref} from "yup"

export const registerSchema = object().shape({
    confirmPassword:string().required("This field is required").oneOf([ref("password"),null],"password does not match"),
    password:string().required("This field is required").min(8,"Minimum 8 characters"),
    email:string().required("This field is required").email("It is not a valid email")

})

export const loginSchema = object().shape({
    password:string().required("This field is required").min(8,"Minimum 8 characters"),
    email:string().required("This field is required").email("It is not a valid email")

})