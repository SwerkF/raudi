import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Contact() {
    const [email, setEmail] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const navigate = useNavigate();
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert('Votre message a bien été envoyé');
        navigate('/');
    };
    
    return (
        <div className="container">
            <div className='card mt-2'>
                <div className='card-header'>
                    <h2 className='card-title text-center'>Contact</h2>
                    <p className='card-text text-center'>Vous avez une question ? N'hésitez pas à nous contacter !</p>
                </div>
                <div className='card-body'>
                    <form onSubmit={handleSubmit}>
                        <div className='mb-3'>
                            <label htmlFor='email' className='form-label'>Email</label>
                            <input type='email' className='form-control' id='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='message' className='form-label'>Message</label>
                            <textarea className='form-control' id='message' rows={3} value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
                        </div>
                        <button type='submit' className='btn btn-primary w-100'>Envoyer</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Contact;