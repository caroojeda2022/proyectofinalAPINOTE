import { useEffect, useState } from 'react';
import { useToken } from '../../TokenContext';
import { useMessage } from '../../MessageContext';
import { Toaster } from 'react-hot-toast';
import useToast from '../../hooks/useToast';

import note from '../note/note';

import './noteSearch.css';

const noteSearch = () => {
    const [token] = useToken();
    const [, setMessage] = useMessage();

    const [keyword, setKeyword] = useState('');
    const [loading, setLoading] = useState(false);
    const [tweets, setTweets] = useState(null);

    // Si hay algún mensaje en el contexto de las notas lo imprimimos con toast.
    // Para ello utilizaremos este hook personalizado.
    useToast();

    /**
     * ################
     * ## Use Effect ##
     * ################
     *
     * Mediante "useEffect" hacemos que la primera vez que se monta el componente se
     * cargue de forma automática la lista de notas.
     *
     */
    useEffect(() => {
        const fetchData = async () => {
            try {
                const params = token
                    ? { headers: { Authorization: token } }
                    : {};

                const res = await fetch('http://localhost:4000/tweets', params);

                const body = await res.json();

                if (body.status === 'error') {
                    setMessage({
                        status: 'error',
                        text: body.message,
                    });
                } else {
                    setTweets(body.data.note);
                }
            } catch (err) {
                setMessage({
                    status: 'error',
                    text: err.message,
                });
            }
        };

        fetchData();
    }, [token, setMessage]);

    // Función que se ejecuta durante el evento "submit" del formulario.
    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);

        // Si hay token nos interesa mandarlo para comprobar las notas de los que somos dueños.
        const params = token
            ? {
                  headers: {
                      Authorization: token,
                  },
              }
            : {};

        try {
            const res = await fetch(
                `http://localhost:4000/tweets?keyword=${keyword}`,
                params
            );

            const body = await res.json();

            if (body.status === 'error') {
                setMessage({
                    status: 'error',
                    text: body.message,
                });
            } else {
                setTweets(body.data.tweets);
            }
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
        <main className='note-search'>
            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    name='keyword'
                    onChange={(e) => setKeyword(e.target.value)}
                />
                <button disabled={loading}>Buscar</button>
            </form>

            <Toaster
                containerStyle={{
                    position: 'relative',
                    width: '100%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                }}
            />

            {tweets && (
                <ul className='note-list'>
                    {note.map((note) => {
                        return (
                            <Tweet
                                key={note.id}
                                tweet={note}
                                tweets={note}
                                setnote={setnote}
                            />
                        );
                    })}
                </ul>
            )}
        </main>
    );
};

export default noteSearch;

