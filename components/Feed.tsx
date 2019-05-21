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
    query Posts($pageSize: Int, $offset: Int) {
        allPosts(orderBy: createdAt_DESC, first: $pageSize, skip: $offset) {
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
        const query = this.props.allPostsQuery;
        const { allPosts, error } = this.props.allPostsQuery;

        if (query.networkStatus === 1) {
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
                        />}
                    refreshing={allPosts.networkStatus === 4}
                    onRefresh={(): void => query.refetch()}
                    onEndReached={(): void => {
                        query.fetchMore({
                            variables: { offset: query.allPosts.length + 1},
                            updateQuery: (previousResult, { fetchMoreResult }): PostResponse => {
                                // Don't do anything if there weren't any new items
                                if (!fetchMoreResult || fetchMoreResult.allPosts.length === 0) {
                                    return previousResult;
                                }
                                return {
                                    // Append the new feed results to the old one
                                    allPosts: previousResult.allPosts.concat(fetchMoreResult.allPosts),
                                };
                            },
                        })

                    }}
                    onEndReachedThreshold={.7}
                    keyExtractor={(item, index): string => index.toString()}
                />
            </View>
        )
    }

}

const PAGE_SIZE = 5;
const withFeed = graphql<InputProps, PostResponse>(ALL_POSTS_QUERY,
    {
        name: 'allPostsQuery',
        options: {
            notifyOnNetworkStatusChange: true,
            variables: {offset: 0, pageSize: PAGE_SIZE},
        }
    });

export default withFeed(Feed);