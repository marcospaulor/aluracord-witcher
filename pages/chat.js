import { useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Button, TextField } from '@skynexui/components';
import appConfig from '../config.json'
import Header from '../components/Header';
import MessageList from '../components/MessageList';

export default function ChatPage() {

    const router = useRouter();
    // Utiliza o router para obter o username
    const {
        query: { username },
    } = router;
    
    // Sua lógica vai aqui
    const [message, setMessage] = useState('');
    const [listMessages, setListMessages] = useState([]);

    function handleNewMessage(newMessage){
        const message = {
            id: listMessages.length + 1,
            from: username,
            text: newMessage,
        };
        setListMessages([
            message,
            ...listMessages,
        ]);
        setMessage(''); // Limpa a mensagem
    }

    // Mudar estado da lista de mensagens
    // function setChanged(newMessage){
    //     setListMessages(newMessage)
    // }

    // Verfica se o campo está vazio
    function checkEmptyFieldAndSendMessage(newMessage){
        if(newMessage !=='') {
            handleNewMessage(newMessage);
        }
    }

    // ./Sua lógica vai aqui
    return (
        <Box
            styleSheet={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundColor: appConfig.theme.colors.primary[500],
                backgroundImage: `url(https://i0.wp.com/windowscustomization.com/wp-content/uploads/2019/01/The-Witcher-3-Wild-Hunt.gif?fit=750%2C354&quality=80&strip=all&ssl=1)`,
                backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                color: appConfig.theme.colors.neutrals['000']
            }}
        >
            <Box
                styleSheet={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                    borderRadius: '5px',
                    backgroundColor: appConfig.theme.colors.neutrals[700],
                    height: '100%',
                    maxWidth: '95%',
                    maxHeight: '95vh',
                    padding: '32px',
                }}
            >
                <Header />
                <Box
                    styleSheet={{
                        position: 'relative',
                        display: 'flex',
                        flex: 1,
                        height: '80%',
                        backgroundColor: appConfig.theme.colors.neutrals[600],
                        flexDirection: 'column',
                        borderRadius: '5px',
                        padding: '16px',
                    }}
                >
                    {/* Lista de mensagens aqui */}
                    <MessageList  list={listMessages} functionList={setListMessages} />

                    <Box
                        as="form"
                        styleSheet={{
                            display: 'flex',
                            alignItems: 'center',
                            flexDirection: 'row',
                        }}
                    >
                        <TextField
                            value={message}
                            onChange={(event) => {
                                // Pega valor da mensagem
                                const value = event.target.value;
                                // Atualiza o estado da mensagem
                                setMessage(value);
                             }}
                            onKeyPress={(event) => {
                                if(event.key === 'Enter') {
                                    event.preventDefault(); // Evita a quebra de linha do enter
                                    // Se apertar Enter, envia a mensagem para a lista de mensagens e limpa o campo de texto
                                    checkEmptyFieldAndSendMessage(message);
                                }
                            }}
                            placeholder="Insira sua mensagem aqui..."
                            type="textarea"
                            styleSheet={{
                                width: '100%',
                                border: '0',
                                resize: 'none',
                                borderRadius: '5px',
                                padding: '6px 8px',
                                backgroundColor: appConfig.theme.colors.neutrals[800],
                                marginRight: '12px',
                                color: appConfig.theme.colors.neutrals[200],
                            }}
                        />
                        <Button 
                            buttonColors={{
                                contrastColor: appConfig.theme.colors.neutrals["900"],
                                mainColor: appConfig.theme.colors.primary["900"],
                                mainColorLight: appConfig.theme.colors.primary["500"],
                                mainColorStrong: appConfig.theme.colors.primary["900"],
                            }}
                            // variant="tertiary"
                            // colorVariant="neutral"
                            label="Enviar"
                            onClick={() => {
                                // Se apertar o botão de enviar, envia a mensagem para a lista de mensagens e limpa o campo de texto
                                checkEmptyFieldAndSendMessage(message);
                            }}
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}