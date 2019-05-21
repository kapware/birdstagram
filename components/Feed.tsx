import React, {ReactNode} from 'react'
import Post from './Post'
import {ChildProps, graphql} from 'react-apollo'
import gql from 'graphql-tag'
import {
    View,
    Text,
    StyleSheet,
    FlatList, ActivityIndicator
} from 'react-native'

const ALL_POSTS_QUERY = gql`
    query {
        allPosts(orderBy: createdAt_DESC) {
            id
            imageUrl
            user {
                name,
                avatar
            }
            comments (first:1, orderBy: createdAt_DESC) {
                id,
                text
            }
            _votesMeta {
                count
            }
        }
    }`;

interface PostResponse  {
    allPosts: {
        id: string;
        imageUrl: string;
        user: {
            name: string;
            avatar: string;
        };
        comments: {
            id:  string;
            text: string;
        }[];
        _votesMeta: {
            count: number;
        };
    };
}
interface InputProps {name: string}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22
    }
});

class Feed extends React.Component<ChildProps<InputProps, PostResponse>> {
    render(): ReactNode {
        const { loading, allPosts, error } = this.props.allPostsQuery;

        if (loading) {
            return <View>
                <ActivityIndicator size="large"/>
            </View>;
        }

        if (error) {
            return <Text>Something happened while loading feed: {error.toString()}</Text>
        }

        return (
            <View style={styles.container}>
                <FlatList
                    data={allPosts}
                    renderItem={({item}): ReactNode =>
                        <Post
                            id={item.id}
                            description={item.description}
                            user={{
                                name: item.user.name,
                                avatar: item.user.avatar
                            }}
                            comments={item.comments}
                            votes={item._votesMeta.count}
                            imageUrl={item.imageUrl}

                        />
                    }
                    keyExtractor={(item, index): string => index.toString()}
                />
            </View>
        )
    }

}


const withFeed = graphql<InputProps, PostResponse>(ALL_POSTS_QUERY, {name: 'allPostsQuery'});

export default withFeed(Feed);