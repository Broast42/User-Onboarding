import React from 'react';
import { withFormik, Form, Field } from 'formik'; 
import * as Yup from 'yup';
// import axios from 'axios';
import styled from 'styled-components';

const FlexDiv = styled.div`
    margin: 20px;
    display: flex;
    flex-direction: column;
    width: 220px;
`;

const ErrP = styled.p`
    color: red;
`;

const FormFields = ({ errors, touched, values, status }) => {
    return(
        <Form>
            <FlexDiv>
                <Field type="text" name="name" placeholder="Name" />
                {touched.name && errors.name && <ErrP>{errors.name}</ErrP>}
                
                <Field type="email" name="email" placeholder="Email" />
                {touched.email && errors.email && <ErrP>{errors.email}</ErrP>}

                <Field type="password" name="password" placeholder="Password" />
                {touched.password && errors.password && <ErrP>{errors.password}</ErrP>}

                <label>
                    Accept the Terms of Service: 
                    <Field type="checkbox" name="tos" />
                </label>
                {touched.tos && errors.tos && <ErrP>{errors.tos}</ErrP>}
                
                <button type="submit">Submit</button>
            </FlexDiv>    
        </Form>
    );
}

const Forms = withFormik({

    mapPropsToValues({ name, email, password, tos}){
        return{
            name: name || "",
            email: email || "",
            password: password || "",
            tos: tos || false,
        };
    },
    
    validationSchema: Yup.object().shape({
        name: Yup.string().required("This field is required"),
        email: Yup.string().email("Email not valid").required("This field is required"),
        password: Yup.string().min(8, "Password must be 8 characters or longer").required("This field is required"),
        tos: Yup.boolean().oneOf([true],"You must accept the terms of service."),
    }),

    handleSubmit(values){
        console.log(values);
    }

})(FormFields);



export default Forms;

