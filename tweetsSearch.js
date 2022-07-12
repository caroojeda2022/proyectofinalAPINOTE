import { useState } from 'react';
import { format } from 'date-fns';

// Agregar dos botones que permitan avanzar a la página siguiente o a la página anterior (si existen).
// Para ello, tenemos que acceder a la URL de la página siguiente (next) y la página anterior (prev)
// que se encuentra en la propiedad "data.info" / 1 fetch haciendo uso de la URL pertinente.

const noteSearch = () => {
    const [keyword, setKeyword] = useState('');
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Vaciamos el array de note.
        setData(null);

        // Establecemos el valor "loading" a "true".
        setLoading(true);

        // Vaciamos el error.
        setError(null);

        try {
            // Obtenemos el response.
            const response = await fetch(`http://localhost:4000/tweets`);

            // Obtenemos la información del body.
            const { data } = await response.json();

            // Si todo ha ido bien almacenamos el array de personajes en "data".
            if (response.ok) {
                setData(data);
            } else {
                setError(data?.error || 'Error desconocido');
            }
        } catch (err) {
            setError(err.message || 'Error desconocido');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main>
            <form onSubmit={handleSubmit}>
                <label htmlFor='keyword'>Palabra clave:</label>
                <input
                    type='text'
                    id='keyword'
                    name='keyword'
                    onChange={(e) => setKeyword(e.target.value)}
                />

                <button disabled={loading}>
                    {loading ? 'Buscando...' : 'Buscar'}
                </button>
            </form>

            {error && <p className='error'>{error}</p>}

            {data && (
                <>
                    <ul>
                        {data.tweets.map((tweet) => {
                            const dateTime = format(
                                new Date(tweet.createdAt),
                                'yyyy-MM-dd'
                            );

                            return (
                                <li key={tweet.id}>
                                    <header>
                                        <time dateTime={dateTime}>
                                            {format(
                                                new Date(tweet.createdAt),
                                                'dd/MM/yyyy - hh:mm'
                                            )}
                                        </time>
                                    </header>
                                    <div>
                                        <p>{tweet.text}</p>
                                        {tweet.image && (
                                            <img
                                                src={`http://localhost:4000/${tweet.image}`}
                                                alt='Tweet'
                                            />
                                        )}
                                    </div>
                                    <footer>
                                        <p data-id={tweet.idUser}>
                                            {tweet.email}
                                        </p>
                                    </footer>
                                </li>
                            );
                        })}
                    </ul>
                </>
            )}
        </main>
    );
};

export default NoteSearch;
