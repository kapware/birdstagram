import React, {ReactNode} from 'react'
import { View, Image, Text } from 'react-native'
import Icon from "react-native-vector-icons/Feather";

interface PostProps {
    user: {
        name: string;
        avatar: string;
    };
    imageUrl: string;
    comments: {
        text: string;
    }[];
    votes: number;
}

export default class Post extends React.Component<PostProps> {
    render (): ReactNode {
        return (
            <View>
                <View style={{flex: 1, flexDirection: "row", padding:8, alignItems: "center"}}>
                    <Image
                        source={{uri: this.props.user.avatar}}
                        style={{width:30, height: 30}}/>
                    <Text style={{paddingLeft: 8}}>{this.props.user.name}</Text>
                </View>
                <Image
                    style={{height: 300, flex: 1}}
                    source={{uri: this.props.imageUrl}}
                />
                <View style={{flex: 1, flexDirection: "row", paddingLeft: 8, paddingTop: 8}}>
                    <Icon name="heart" size={30} color="#000" style={{padding: 8}} />
                    <Icon name="message-circle" size={30} color="#000" style={{padding: 8}}/>
                </View>
                <Text style={{paddingLeft: 16, paddingRight:16, fontWeight: 'bold'}}>Votes: {this.props.votes}</Text>

                <Text style={{paddingLeft: 16, paddingTop: 8, paddingBottom: 32}}>
                    <Text style={{fontWeight: 'bold'}}>{this.props.user.name} </Text>
                    {this.props.comments && this.props.comments[this.props.comments.length - 1] &&
                    this.props.comments[this.props.comments.length - 1].text}
                </Text>
            </View>
        )
    }
}