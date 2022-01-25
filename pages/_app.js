import GlobalStyle from "../style/GlobalStyle";

export default function MyApp({Component,pageProps}){
    return(
        <>
            <GlobalStyle/>
            <Component {...pageProps}/>
        </>
    );
}