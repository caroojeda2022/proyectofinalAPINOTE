import { useState } from 'react';
import { useToken } from '../../TokenContext';
import { useMessage } from '../../MessageContext';
import { Navigate, useNavigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import useToast from '../../hooks/useToast';

import './Register.css';

const Register = () => {
    // Hooks varios.
    const navigate = useNavigate();
    const [token] = useToken();
    const [, setMessage] = useMessage();

    // Hooks para crear variables en el State.
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    // Si hay algún mensaje en el contexto de las notas lo imprimimos con toast.
    // Para ello utilizaremos este hook personalizado.
    useToast();

    // Si estamos logueados redireccionamos a la página principal.
    if (token) return <Navigate to='/' />;

    // Función que maneja el envío del formulario de registro.
    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);

        try {
            const res = await fetch('http://localhost:4000/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    email,
                    password,
                }),
            });

            const body = await res.json();

            setMessage({
                status: body.status,
                text: body.message,
            });

            // Si el registro se ha completado con éxito redirigimos a la
            // página de login.
            if (body.status === 'ok') navigate('/login');
        } catch (err) {
            setMessage({
                status: 'error',
                text: err.message,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className='register'>
            <form onSubmit={handleSubmit}>
                <label htmlFor='username'>Usuario:</label>
                <input
                    type='text'
                    name='username'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <label htmlFor='email'>Email:</label>
                <input
                    type='email'
                    name='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <label htmlFor='pass'>Contraseña:</label>
                <input
                    type='password'
                    name='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button disabled={loading}>Sign Up</button>
            </form>
            <Toaster
                containerStyle={{
                    position: 'relative',
                    width: '100%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                }}
            />
        </main>
    );
};

export default Register;
