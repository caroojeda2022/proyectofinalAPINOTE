import { useState } from 'react';
import { useToken } from '../../TokenContext';
import { format } from 'date-fns';

import './Tweet.css';

const note = ({ note, notes, setNote })=> {
//hook personalizados.
const [token] = useToken();

//Variables de state
const{loading,setLoading}= useState(false);

//funcion que crea o deshace like
const handleLike = async (e,ownNote) => {
    sendLoading(true);
// si el div tiene las clase like la elimina o agrega
    e.target.classList.toggle('like');
}

try {
    const res = await fetch(`http://localhost:3000/$(ownNotes)/votes',{
        method:'POST'
        headers: {
            Authorization: token,
        },
    }):

} catch(err) {}

//funcion que pone formato de fecha valido
const dateTime = format(new Date(note,createAt),'yyyy-MM-dd');

return (
<li className='note'>
    <header>
        <p>@{note.registeruser}</p>
        <time dateTime={dateTime}>
        (format(new Date(note.createAT), 'hh:mm - dd/MM/yyyy');
    </time>
    </header>
    <div>
        <p>(note.text)</p>
        (note.image && (
            <img 
                src={`http://localhost:3000/${note.image}'} 
                alt='Imagen Adjunta'
            />
        )}
    </div>
    <footer>
        <dir>
             <dir>
                //la nota privada si le da check el autor, la vuelve pública
                    className={'check ${
                     token && note.privateNote.checkByMe && 'publicNote'
                    }'}
                    onClick={(e) => { 
                        if (token) handleLike(e, note.id);
                    }}
                    disable={Loading}
                    ></dir>
                    //la nota privada si lo escoje su autor, la vuelve pública
                   <dir>
                    { token && ownNote === l && <button>publicNote</button>}
                    </footer>
         </li>
   );
};
        
export default note;
