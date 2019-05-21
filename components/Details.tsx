import {ChildProps, graphql} from "react-apollo";
import React, {ReactNode} from "react";
import gql from "graphql-tag";
import {StyleSheet, View, Text, TextInput, Button} from "react-native";

const EDIT_POST_MUTATION = gql`
    mutation editPost($postId: ID!, $description: String!, $species: String) {
        updatePost(
            id: $postId
            description: $description
            species: $species
        )
        {id}
    }`;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        backgroundColor: 'rgba(255,255,255,1)',
        paddingTop: 80
    },
    descriptionInput: {
        paddingHorizontal: 20,
        height: 100,
        fontSize: 20,
    },
    speciesInput: {
        paddingHorizontal: 20,
        height: 100,
        fontSize: 20,
    },
    label: {
        paddingLeft: 20,
        fontSize: 10
    }});

interface PostResponse {
    id: string;
}

class Details extends React.Component<ChildProps<{}, PostResponse>> {
    constructor(props: ChildProps<{}, PostResponse>) {
        super(props);
        this.state = {
            id: props.postId,
            description: props.description,
            species: props.species,
            saving: false
        };
    }

    render (): ReactNode {
        return (
            <View style={styles.container}>
                <Text style={styles.label}>Description:</Text>
                <TextInput
                    style={styles.descriptionInput}
                    placeholder='Type in description...'
                    onChangeText={(text): void => this.setState({description: text})}
                    value={this.state.description}
                />
                <Text style={styles.label}>Species:</Text>
                <TextInput
                    style={styles.speciesInput}
                    placeholder='Type in species...'
                    onChangeText={(text): void => this.setState({species: text})}
                    value={this.state.species}
                />
                <Button title={"Close"}
                    disabled={this.state.saving}
                    onPress={(): void => {
                        this.setState({saving: true}, (): void => this._editPost())
                    }}/>
            </View>)
    }

    _editPost = async (): Promise<{}> => {
        const {id, description, species} = this.state;
        if (description != this.props.description
            || species != this.props.species) {
            await this.props.editPostMutation({
                variables: {
                    id: id,
                    description: description,
                    species: species}
            });
        }
        this.setState({saving: false});
        this.props.onComplete()
    }
}

export default graphql(EDIT_POST_MUTATION, {name: 'editPostMutation'}) (Details)