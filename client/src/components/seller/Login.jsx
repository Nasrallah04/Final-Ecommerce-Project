import { useState , useEffect,} from "react";
import {Link, useNavigate} from 'react-router-dom';
import { Form,Button, Row,Col } from "react-bootstrap";
import { useDispatch,useSelector } from "react-redux"; 
import axios from 'axios';
import FormContainer from "./FormContainer";
import { useLoginMutation } from "../../slices/sellersApiSlice";
import { setCredentials } from "../../slices/authSlice";
import { toast } from 'react-toastify';
import Loader from "./Loader";


function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
 
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [login,{isLoading}] = useLoginMutation();

    const {sellerInfo} = useSelector((state)=> state.auth);

    useEffect(() =>{
        if (sellerInfo){
            navigate('/');
        }
    },[navigate, sellerInfo]);

    const submitHandler = async(e) =>{
        e.preventDefault();
        try {
            const res = await login({username,password}).unwrap();
            dispatch(setCredentials({...res}))
            navigate('/')
        } catch (err) {
            toast.error(err?.data?.message||err.error);
        }
    }
  return (
    <FormContainer>
        <h1>Sign In</h1>

        <Form onSubmit={submitHandler}>
            <Form.Group className="my-2" controlId="username">
                <Form.Label>UserName</Form.Label>
                <Form.Control 
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                ></Form.Control>
            </Form.Group>

            <Form.Group className="my-2" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control 
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                ></Form.Control>
            </Form.Group>

            {isLoading && <Loader/>}
            <Button type="submit" variant="primary" className="mt-3">
                Sign In  
            </Button>
            <Row className="py-3">
                <Col>
                New Seller? <Link to='/register'>Sign Up</Link>
                </Col>
            </Row>
        </Form>
    </FormContainer>
  )
}

export default Login