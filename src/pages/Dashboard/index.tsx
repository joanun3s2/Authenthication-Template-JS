import React from 'react';
import { View, Button, StyleSheet, Text } from 'react-native';
import { useAuth } from '../../contexts/auth';


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
});

const DashBoard: React.FC = () => {    
    
    const { signOut, user } = useAuth();
    
    function handleSignOut(){

        signOut();

    }

    return(
        <View style={styles.container}>
            <Text style={{justifyContent: 'center', textAlign: "center", fontSize: 30}}>{user?.name}</Text>
            <Button title="Sign out" onPress={handleSignOut}  />
        </View>
    );
    
};

export default DashBoard;