import { Box, Text, Image, Button } from '@skynexui/components';
import appConfig from '../config.json';

export default function Custom404(){
    return (
        <>
            <Box
                styleSheet={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    backgroundColor: appConfig.theme.colors.primary["900"],
                }}
            >
                <Box
                    styleSheet={{
                        display: 'flex',justifyContent: 'space-between', flexDirection: 'column', 
                        alignItems: 'center',
                        
                        width: '100%',maxWidth: '450px', padding: '16px',
                        borderRadius: '5px', padding: '32px', margin: '16px',
                        boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                        backgroundColor: appConfig.theme.colors.neutrals["000"],
                    }}
                >
                    <Text 
                        variant="heading1" 
                        styleSheet={{
                            margin: '16px',
                        }}
                    >Uai Erro 404</Text>
                    <Text variant="heading4" styleSheet={{
                            margin: '16px',
                        }}>Não encontramos a página que "ocê" solicitou uai</Text>
                    <Text variant="body3" styleSheet={{
                            margin: '16px',
                        }}>"Ocê" deve vortar a página inicial ou recarregar a página: </Text>
                    <Button
                        type='button'
                        href='/'
                        label='Retornar'
                        fullWidth
                        styleSheet={{
                            margin: '5px',
                        }}
                        buttonColors={{
                            contrastColor: appConfig.theme.colors.neutrals["900"],
                            mainColor: appConfig.theme.colors.primary["900"],
                            mainColorLight: appConfig.theme.colors.primary["400"],
                            mainColorStrong: appConfig.theme.colors.primary["600"],
                        }}
                    />
                    <Button
                        type='reset'
                        label='Recarregar'
                        onClick={() => window.location.reload(false)}
                        fullWidth
                        styleSheet={{
                            margin: '5px',
                        }}
                        buttonColors={{
                            contrastColor: appConfig.theme.colors.neutrals["000"],
                            mainColor: appConfig.theme.colors.neutrals["600"],
                            mainColorLight: appConfig.theme.colors.neutrals["400"],
                            mainColorStrong: appConfig.theme.colors.neutrals["900"],
                        }}
                    />
                </Box>

                {/* <Image /> */}
            </Box>
        </>
    );
}