import { MoralisProvider } from 'react-moralis';
import { useMoralis } from 'react-moralis';
import { useEffect } from 'react';

export default function MoralisWrapper(props) {

    return (
        <MoralisProvider appId={process.env.NEXT_PUBLIC_MORALIS_APP_ID} serverUrl={process.env.NEXT_PUBLIC_MORALIS_SERVER_URL}>
            <MoralisRefreshState>
                {props.children}
            </MoralisRefreshState>
        </MoralisProvider>
    )
}

function MoralisRefreshState(props) {

    const { isWeb3Enabled, enableWeb3, isAuthenticated, isWeb3EnableLoading, account } = useMoralis();

    useEffect(() => {
        const connectorId = window.localStorage.getItem("connectorId");
        if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading) enableWeb3({ provider: connectorId });
    }, [isAuthenticated, isWeb3Enabled]);

    useEffect(() => {
        // do something when account changes
    }, [account])

    return (
        props.children
    )
}