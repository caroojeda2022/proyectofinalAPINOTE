import { useEffect } from 'react';
import { useMessage } from '../MessageContext';
import toast from 'react-hot-toast';

const useToast = () => {
    const [message, setMessage] = useMessage();

    useEffect(() => {
        try {
            if (message) {
                if (message.status === 'ok') {
                    // Si hay algún toast "success" en ejecución lo eliminamos para evitar
                    // que se spameen múltiples notificaciones.
                    toast.remove(1);

                    toast.success(message.text, {
                        duration: 5000,
                        id: 1,
                    });
                } else {
                    // Si hay algún toast "error" en ejecución lo eliminamos para evitar
                    // que se spameen múltiples notificaciones.
                    toast.remove(2);

                    toast.error(message.text, {
                        duration: 5000,
                        id: 2,
                    });
                }
            }
        } finally {
            setMessage(null);
        }
    }, [message, setMessage]);
};

export default useToast;
