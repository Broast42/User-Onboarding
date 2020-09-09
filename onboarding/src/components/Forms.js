import React, { useState, useEffect } from 'react';
import { withFormik, Form, Field } from 'formik'; 
import * as Yup from 'yup';
import axios from 'axios';
import styled from 'styled-components';

const DisplayFlex = styled.div`
    display: flex;
    flex-flow: row wrap;
`;

const DisplayItem = styled.div`
    border: 2px solid blue;
    border-radius: 15px;
    background: lightgreen;
    box-shadow: 2px 2px grey;
    margin: 10px;
    width: 300px;
`;

const FlexDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: .8rem;
    color: blue;
    border-bottom: 2px dashed green;
    
`;

const ErrP = styled.p`
    color: red;
    
`;

const Button = styled.button`
    width: 100px;
    margin: 10px;
    background: lightgreen;
    border: 2px solid blue;
    border-radius: 5px;
    box-shadow: 2px 2px 2px grey;
    color: black;

    &:hover{
        background: green;
        color: white;
        
    }
`;

const FormFields = ({ errors, touched, status }) => {

    const [users, setUsers] = useState([]);

    useEffect(()=>{
        status && setUsers(users => [...users, status]);
    }, [status]);

    return(
        <div>
            <Form>
                <FlexDiv>
                    <h1>Add A User</h1>
    
                    <Field type="text" name="name" placeholder="Name"  />
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
                    
                    <Button type="submit">Submit</Button>
                </FlexDiv>    
            </Form>

            <DisplayFlex>
                {users.map((x, i) => (
                    <DisplayItem>
                        <ul key ={i}>
                            <li>Name: {x.name}</li>
                            <li>Email: {x.email}</li>
                        </ul> 
                    </DisplayItem>      
                ))}
            </DisplayFlex>
        </div>
        

        
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
        name: Yup.string().required("Name is required"),
        email: Yup.string().email("Email not valid").required("Email is required"),
        password: Yup.string().min(8, "Password must be 8 characters or longer").required("Password is required"),
        tos: Yup.boolean().oneOf([true],"You must accept the terms of service."),
    }),

    handleSubmit(values, { setStatus, resetForm }){
        console.log("values from submit",values);

        axios
            .post("https://reqres.in/api/users", values)
            .then(res => {
                console.log("Post success", res);
                setStatus(res.data);
                resetForm();
            })
            .catch(err =>{
                console.log("Post Error:", err.response);
            });
    }

})(FormFields);



export default Forms;

