import { useState } from 'react';
import { useRouter } from 'next/router';
import appConfig from '../config.json';
import { Box, Button, Text, TextField, Image } from '@skynexui/components';
import Title from '../components/Title';

export default function Main(){
    // Utilizado para mudar de páginas
    const route = useRouter();
    // const username = 'marcospaulor'
    const [username, setUsername] = useState('');

    return(
        <>
            <Box
                styleSheet={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    backgroundColor: appConfig.theme.colors.primary["500"],
                    backgroundImage: 'url(https://i0.wp.com/windowscustomization.com/wp-content/uploads/2019/01/The-Witcher-3-Wild-Hunt.gif?fit=750%2C354&quality=80&strip=all&ssl=1)',
                    backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                }}
            >
                <Box
                    styleSheet={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexDirection: {
                        xs: 'column',
                        sm: 'row',
                        },
                        width: '100%', maxWidth: '700px',
                        borderRadius: '5px', padding: '32px', margin: '16px',
                        boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                        backgroundColor: appConfig.theme.colors.neutrals["700"],
                        
                    }}
                >
                {/* Formulário */}
                <Box
                    as="form"
                    onSubmit={function (event){
                        // Retira o load da página
                        event.preventDefault();
                        // Direciona para outra página
                        route.push('/chat');
                    }}
                    styleSheet={{
                        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                        width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px',
                    }}
                >
                    <Title tag="h2">Welcome to Witcher's Tavern!</Title>
                    <Text variant="body3" styleSheet={{ marginBottom: '32px', color: appConfig.theme.colors.neutrals["300"] }}>
                    {appConfig.name}
                    </Text>

                    <TextField
                        fullWidth
                        textFieldColors={{
                            neutral: {
                            textColor: appConfig.theme.colors.neutrals["200"],
                            mainColor: appConfig.theme.colors.neutrals["900"],
                            mainColorHighlight: appConfig.theme.colors.primary["500"],
                            backgroundColor: appConfig.theme.colors.neutrals["800"],
                            },
                        }}
                        onChange={function (event){
                            // Guarda o valor do Campo de Texto a cada modificação
                            const value = event.target.value;
                            // Chamada da função setUsername, alterando o valor do username
                            setUsername(value);
                        }}
                    />
                    <Button
                        type='submit'
                        label='Entrar'
                        fullWidth
                        buttonColors={{
                            contrastColor: appConfig.theme.colors.neutrals["000"],
                            mainColor: appConfig.theme.colors.primary["900"],
                            mainColorLight: appConfig.theme.colors.primary["400"],
                            mainColorStrong: appConfig.theme.colors.primary["600"],
                        }}
                    />
                </Box>
                {/* Formulário */}


                {/* Photo Area */}
                <Box
                    styleSheet={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        maxWidth: '200px',
                        padding: '16px',
                        backgroundColor: appConfig.theme.colors.neutrals["800"],
                        border: '1px solid',
                        borderColor: appConfig.theme.colors.neutrals["999"],
                        borderRadius: '10px',
                        flex: 1,
                        minHeight: '240px',
                    }}
                >
                    <Image
                    styleSheet={{
                        borderRadius: '50%',
                        marginBottom: '16px',
                    }}
                    src={`https://github.com/${username}.png`}
                    />
                    <Text
                    variant="body4"
                    styleSheet={{
                        color: appConfig.theme.colors.neutrals["200"],
                        backgroundColor: appConfig.theme.colors.neutrals["900"],
                        padding: '3px 10px',
                        borderRadius: '1000px',
                        fontSize: '18px',
                    }}
                    >
                    @{username}
                    </Text>
                </Box>
                {/* Photo Area */}
                </Box>
            </Box>
        </>
    );
}