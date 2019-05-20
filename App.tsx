/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * 
 * Generated with the TypeScript template
 * https://github.com/emin93/react-native-template-typescript
 * 
 * @format
 */

import React, {Component, ReactNode} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { LazyloadScrollView, LazyloadView, LazyloadImage } from 'react-native-lazyload-deux';
import Icon from 'react-native-vector-icons/Feather';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
        backgroundColor: '#F5FCFF',
        paddingTop: 50,
        paddingBottom: 50,
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});

const views = [
    {
        user: {name: 'Blackbird', avatar: 'https://cdn.pixabay.com/photo/2016/03/31/19/58/avatar-1295429_960_720.png'},
        image: 'https://download.ams.birds.cornell.edu/api/v1/asset/44584641/2400',
        votes: 332,
        comments: [{text: "Wow!"}]
    },
    {
        user: {name: 'Hoopoe', avatar: 'https://dc3hfjbdq42jq.cloudfront.net/avatars/default/avatar5.png'},
        image: 'https://fs.siteor.com/bocian/paragraph/image_objects/photos/47970/medium/Upupa_epops_%28czerwiec_2004__Aleksandrowka%29_GLES1413_copy.jpg?1440078014',
        votes: 1253,
        comments: [{text: "♥ this photo"}],
    },
    {
        user: {name: 'Jay', avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSH2GKNumy5rINeCPANYQsx_eP2YB1CwpSCTDREKIzFG73vsIPG'},
        image: 'https://upload.wikimedia.org/wikipedia/commons/6/6d/Garrulus_glandarius_1_Luc_Viatour.jpg',
        votes: 223,
        comments: [{text: "Seen one just now!"}],
    },
    {
        user: {name: 'Blackbird', avatar: 'https://cdn.pixabay.com/photo/2016/03/31/19/58/avatar-1295429_960_720.png'},
        image: 'http://www.bgpn.pl/images/gallery/Kruk_Corvus_corax_Lukasik_0006.jpg',
        votes: 1224,
        comments: [{text: "Magnificent!"}],
    }
];

class LazyloadScrollViewExample extends Component {
    renderViews(): ReactNode {
        return views.map((view, i): ReactNode => {
            return (
                <LazyloadView
                    host="unique-lazyload-list-name"
                    key={`lazy-scroll-view-${i}`}
                >
                    <View style={{flex: 1, flexDirection: "row", padding:8, alignItems: "center"}}>
                        <LazyloadImage
                            host="unique-lazyload-list-name"
                            source={{uri: view.user.avatar}}
                            style={{width:30, height: 30}}/>
                        <Text style={{paddingLeft: 8}}>{view.user.name}</Text>
                    </View>
                    <LazyloadImage
                        host="unique-lazyload-list-name"
                        style={{height: 300, flex: 1}}
                        source={{uri: view.image}}
                    />
                    <View style={{flex: 1, flexDirection: "row", paddingLeft: 8, paddingTop: 8}}>
                        <Icon name="heart" size={30} color="#000" style={{padding: 8}} />
                        <Icon name="message-circle" size={30} color="#000" style={{padding: 8}}/>
                    </View>
                    <Text style={{paddingLeft: 16, paddingRight:16, fontWeight: 'bold'}}>Votes: {view.votes}</Text>
                    <Text style={{paddingLeft: 16, paddingTop: 8, paddingBottom: 32}}>
                        <Text style={{fontWeight: 'bold'}}>{view.user.name} </Text>
                        {view.comments[view.comments.length - 1].text}
                    </Text>
                </LazyloadView>
            );
        });
    }

    render(): ReactNode {
        return (
            <LazyloadScrollView
                name="unique-lazyload-list-name"
            >
                {this.renderViews()}
            </LazyloadScrollView>
        );
    }
}

export default class App extends Component<{}> {
    render(): ReactNode {
        return (
            <View style={styles.container}>
                <LazyloadScrollViewExample/>
            </View>
        );
    }
}