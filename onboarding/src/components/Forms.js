import React from 'react';
import { withFormik, Form, Field } from 'formik';
// import * as Yup from 'yup';
// import axios from 'axios';
import styled from 'styled-components';

const FlexDiv = styled.div`
    margin: 20px;
    display: flex;
    flex-direction: column;
    width: 220px;
`;

const FormFields = () => {
    return(
        <Form>
            <FlexDiv>
                <Field type="text" name="name" placeholder="Name" />
                <Field type="email" name="email" placeholder="Email" />
                <Field type="password" name="password" placeholder="Password" />
                <label>
                    Accept the Terms of Service: 
                    <Field type="checkbox" name="tos" />
                </label>
                
                <button type="submit">Submit</button>
            </FlexDiv>    
        </Form>
    );
}

const Forms = withFormik({


})(FormFields);

export default Forms;

