import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    FlatList,
    StyleSheet,
    ImageBackground,
    Image,
} from 'react-native';
import { FriendCard, SearchInput } from '../../../molicues';
import { colors } from '../../../../utils';
import { verticalScale, horizontalScale, width, height, platform } from '../../../../utils';
import { png } from '../../../../assets/png';

const mockFriends = [
    {
        id: '1',
        name: 'User Name',
        image: "https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?cs=srgb&dl=pexels-souvenirpixels-414612.jpg&fm=jpg",
    },
    {
        id: '2',
        name: 'User Name',
        image: "https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?cs=srgb&dl=pexels-souvenirpixels-414612.jpg&fm=jpg",
    },
    {
        id: '3',
        name: 'User Name',
        image: "https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?cs=srgb&dl=pexels-souvenirpixels-414612.jpg&fm=jpg",
    },
    {
        id: '4',
        name: 'User Name',
        image: "https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?cs=srgb&dl=pexels-souvenirpixels-414612.jpg&fm=jpg",
    },
];

export const FriendList = () => {
    const [search, setSearch] = useState('');
    const [friends, setFriends] = useState(mockFriends);

    const handleRemove = (id: string) => {
        setFriends(prev => prev.filter(friend => friend.id !== id));
    };

    const handleMessage = (name: string) => {
        console.log(`Message sent to ${name}`);
    };

    return (
        <ImageBackground source={png.bg} style={styles.container}>

            <SearchInput value={search} onChangeText={setSearch} />;

            <Text style={styles.title}>Friends</Text>
            <FlatList
                data={friends}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <FriendCard
                        name={item.name}
                        image={item.image}
                        actionUri=''
                        messageUri=''
                        onRemove={() => handleRemove(item.id)}
                        onMessage={() => handleMessage(item.name)}
                    />
                )}
            />
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        width,
        height,
        paddingTop: platform == "ios" ? "15%" : "10%"
    },

    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: horizontalScale(15),
        borderWidth: 1,
        borderColor: colors.white,
        marginHorizontal: horizontalScale(16),
        height: verticalScale(50),
        paddingHorizontal: horizontalScale(16),
        marginBottom: verticalScale(12),
    },
    searchInput: {
        flex: 1,
        fontSize: horizontalScale(16),
        color: colors.white,
    },
    searchIcon: {
        width: horizontalScale(40),
        height: horizontalScale(40)
    },

    title: {
        color: colors.white,
        fontSize: horizontalScale(20),
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: verticalScale(12),
    },
});

