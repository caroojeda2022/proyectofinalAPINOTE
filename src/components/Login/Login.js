import { useState } from 'react';
import { useToken } from '../../TokenContext';
import './Login.css';

const Login = () => {
  //hook personalizado
  const [token, setToken] = useToken();

  //Variable del state
  const [loginuser, setloginUser] = useState('');
  const [registeruser, setregisterUser] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  //si estamos logeados, existe token, se va a la home
if (token) return <Navigate to='/' />;  

  //Función de envio del manejo del formulario

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const body = await res.json();

      if (body.status === 'error') {
        //muestra un mensaje de error con 1 alerta
        window.alert(body.message);
      } else {
        //muestra un mensaje de error con 1 alerta
        window.alert('Login correcto');
        //Actualiza el token
        setToken(body.data.token);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className='login'>
      <form onSubmit={handleSubmit}>
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
          name='pass'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button disabled={loading}>Log In</button>
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

export default Login;

