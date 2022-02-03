import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
// import { supabase } from '../src/api/api'; // deprecated
import { supabase } from '../src/lib/initSupabase'; // api.js
import { Box, Button, TextField } from '@skynexui/components';
import appConfig from '../config.json'
import Header from '../src/components/Header';
import MessageList from '../src/components/MessageList';
import { ButtonSendSticker } from '../src/components/ButtonSendSticker';

/** TODO: 
 * Mario Souto: Mostrar o loading de mensagens (Tem que fazer o mais criativo ein!)
 * Paulo Silveira: Fazer um efeito quando passar o mouse em cima (Use esse link como referência: https://pt-br.reactjs.org/docs/events.html#mouse-events) */

function dataBaseListener(setNewMessage){
    return supabase
        .from('messages')
        .on('INSERT', (liveResponse) => {
            setNewMessage(liveResponse.new);
        })
        .subscribe();
}


export default function ChatPage() {
    // Sua lógica vai aqui
    const [message, setMessage] = useState('');
    const [listMessages, setListMessages] = useState([]);

    /** Encapsula a consulta no banco de dados, executando a função callback
      somente quando houver uma mudança na lista de mensagens */
    useEffect(() => {
        supabase
            .from('messages')
            .select('*')
            .order('id', {ascending: false})
            .then(({data}) => setListMessages(data));

            dataBaseListener((newMessage) => {
                setListMessages((actualListValue) => {
                    return [
                        newMessage,
                        ...actualListValue,
                    ]
                });
            });

    }, []);

    const router = useRouter();
    // Utiliza o router para obter o username
    const { query: { username } } = router;
    

    function handleNewMessage(newMessage){
        const message = {
            from: username,
            text: newMessage,
        };

        supabase
            .from('messages')
            .insert([
                message,
            ])
            .then()
        setMessage(''); // Limpa a mensagem
    }

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

                        <ButtonSendSticker onStickerClick = {(sticker) => {
                            handleNewMessage(':sticker: ' + sticker);
                        }} />

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