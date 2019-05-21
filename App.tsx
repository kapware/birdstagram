import React, {Component, ReactNode} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import ApolloClient, {InMemoryCache} from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import Feed from "./components/Feed";
import {persistCache} from "apollo-cache-persist";
import CachePersistor from "apollo-cache-persist/CachePersistor";

const SCHEMA_VERSION = '1';
const SCHEMA_VERSION_KEY = 'apollo-schema-version';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
        backgroundColor: '#F5FCFF',
        paddingTop: 50,
        paddingBottom: 50,
    }
});

export default class App extends Component<{}> {

    constructor(props) {
        super(props);
        this.state = {cacheLoaded: false};
    }

    async componentDidMount(): void {
        const self = this;
        const cache = new InMemoryCache();

        const persistor = new CachePersistor({
            cache,
            storage: AsyncStorage,
        });
        const currentVersion = await AsyncStorage.getItem(SCHEMA_VERSION_KEY);

        if (currentVersion === SCHEMA_VERSION) {
            await persistor.restore();
        } else {
            await persistor.purge();
            await AsyncStorage.setItem(SCHEMA_VERSION_KEY, SCHEMA_VERSION);
        }

        try {
            await persistCache({
                cache,
                storage: AsyncStorage,
            });
        } catch (error) {
            console.error('Error restoring Apollo cache', error);
            // NOTE: It might be reasonable to show something on initial run and no network
        }

        const client = new ApolloClient({ uri: 'https://api.graph.cool/simple/v1/cjvwh45wy26wn0114bdjmkxc4',
            cache: cache});

        self.setState({
            client,
            cacheLoaded: true
        })
    }

    render(): ReactNode {
        const { client, cacheLoaded } = this.state;
        if (!cacheLoaded) {
            return <View style={styles.container}>
                <ActivityIndicator size="large"/>
            </View>;
        }
        return (
            <View style={styles.container}>
                <ApolloProvider client={client}>
                    <Feed/>
                </ApolloProvider>
            </View>
        );
    }
}