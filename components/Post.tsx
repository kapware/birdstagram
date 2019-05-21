import React, {ReactNode} from 'react'
import {View, Text, TouchableHighlight} from 'react-native'
import Icon from "react-native-vector-icons/Feather";
import {
    CachedImage
} from 'react-native-cached-image';
import {graphql} from "react-apollo";
import gql from "graphql-tag";

interface PostProps {
    id: string;
    user: {
        id: string;
        name: string;
        avatar: string;
    };
    imageUrl: string;
    comments: {
        text: string;
    }[];
    votes: number;
}


const voteUpMutation = gql`
    mutation voteUp($postId: ID!, $userId: ID!) {
        createVote(
            postId: $postId
            userId: $userId
        ) {
            id
        }
    }
`;

class Post extends React.Component<PostProps> {
    private async _voteUp(): Promise<{}> {
        const postId = this.props.id;
        const userId = this.props.userId;
        await this.props.voteUpMutation({
            variables: {
                postId: postId,
                userId: userId
            }
        });
        this.props.onComplete();
    }

    render (): ReactNode {
        return (
            <View>
                <View style={{flex: 1, flexDirection: "row", padding:8, alignItems: "center"}}>
                    <CachedImage
                        source={{uri: this.props.user.avatar}}
                        style={{width:30, height: 30}}/>
                    <Text style={{paddingLeft: 8}}>{this.props.user.name}</Text>
                </View>
                <CachedImage
                    style={{height: 300, flex: 1}}
                    source={{uri: this.props.imageUrl}}
                />
                <View style={{flex: 1, flexDirection: "row", paddingLeft: 8, paddingTop: 8}}>
                    <TouchableHighlight onPress={(): Promise<> => this._voteUp()} underlayColor="white">
                        <Icon name="heart" size={30} color="#000" style={{padding: 8}} />
                    </TouchableHighlight>
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

export default graphql(voteUpMutation, {name: 'voteUpMutation'}) (Post)