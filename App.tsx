import React, {Component, ReactNode} from 'react';
import {StyleSheet, View} from 'react-native';
import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-client-preset'
import ApolloProvider from "react-apollo/ApolloProvider";
import Feed from "./components/Feed";


const httpLink = new HttpLink({ uri: 'https://api.graph.cool/simple/v1/cjvwh45wy26wn0114bdjmkxc4' })
const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache()
});


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
    render(): ReactNode {
        return (
            <View style={styles.container}>
                <ApolloProvider client={client}>
                    <Feed/>
                </ApolloProvider>
            </View>
        );
    }
}