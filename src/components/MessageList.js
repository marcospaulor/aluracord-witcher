// import { supabase } from '../api/api'; // api.js
import { supabase } from '../lib/initSupabase';
import appConfig from '../../config.json'
import { Box, Text, Image, Button } from "@skynexui/components";

export default function MessageList({list , functionList}) {

    // Delete message from list and update the list
    const deleteMessage = (id) => {
        // functionList(list.filter(message => message.id !== id)); // Remove message from list sem BD
        // Change to delete message from database
        supabase
            .from('messages')
            .delete()
            .eq('id', id)
            .then(() => {
                functionList(list.filter(message => message.id !== id));
            })
    }
    
    return (
        <Box
            tag="ul"
            styleSheet={{
                overflow: 'auto',
                display: 'flex',
                flexDirection: 'column-reverse',
                flex: 1,
                color: appConfig.theme.colors.neutrals["000"],
                marginBottom: '16px',
            }}
        >
            {/*Início do map*/}
            {list.map((message) => {
                
                return(
                    <Text
                        key={message.id}
                        tag="li"
                        styleSheet={{
                            borderRadius: '5px',
                            padding: '6px',
                            marginBottom: '12px',
                            hover: {
                                backgroundColor: appConfig.theme.colors.neutrals[700],
                            }
                        }}
                    >
                        <Box
                            styleSheet={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                marginBottom: '8px',
                            }}
                        >
                            <Box>
                                <Image
                                    styleSheet={{
                                        width: '20px',
                                        height: '20px',
                                        borderRadius: '50%',
                                        display: 'inline-block',
                                        marginRight: '8px',
                                    }}
                                    src={`https://github.com/${message.from}.png`}
                                />
                                <Text tag="strong">
                                    {message.from}
                                </Text>
                                <Text
                                    styleSheet={{
                                        fontSize: '10px',
                                        marginLeft: '8px',
                                        color: appConfig.theme.colors.neutrals[300],
                                    }}
                                    tag="span"
                                >
                                    {/* Retorna a data atual */}
                                    {(new Date().toLocaleDateString())}
                                </Text>
                            </Box>
                            <Button
                                onClick={()=>{
                                    // deleteElement(message.id)
                                    deleteMessage(message.id)
                                }}
                                label="X"
                                buttonColors={{
                                    contrastColor: "#FF0000",
                                    mainColor: "rgb(0, 0, 0, 0)",
                                }}
                            />
                        </Box>
                        {/* Operador ternário para mostrar texto ou stickers */}
                        {message.text.startsWith(':sticker:') 
                            ? (
                                <Image src={message.text.replace(':sticker:', '')} />
                            )
                            : (
                                message.text
                            )}
                    </Text>
                );
            })}
            
            {/*Fim do map*/}
        </Box>
    )
}