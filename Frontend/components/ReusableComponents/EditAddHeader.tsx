import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface EditAddHeaderProps {
    title: string;
    onBack: () => void;
    showDelete?: boolean;
    onDelete?: () => void;
}

const EditAddHeader = ({ title, onBack, showDelete, onDelete }: EditAddHeaderProps) => {
  return (
    <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <Ionicons name="chevron-back" size={30} color="#000" />
        </TouchableOpacity>

        <View style={styles.titleWrapper}>
            <Text style={styles.headerTitle} numberOfLines={1}>
            {title.toUpperCase()}
            </Text>
        </View>

        <View style={styles.rightActionWrapper}>
            {showDelete && (
            <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
                <Ionicons name="trash-outline" size={24} color="#FFF" />
            </TouchableOpacity>
            )}
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 0,
        marginVertical: 15,
        height: 60,
    },
    backButton: {
        backgroundColor: '#FFA500',
        borderRadius: 12,
        padding: 6,
        width: 45,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleWrapper: {
        flex: 1,
        paddingHorizontal: 10,
    },
    headerTitle: {
        color: '#FFF',
        fontSize: 22,
        fontWeight: '900',
        fontFamily: 'BigShoulders18Black'
    },
    rightActionWrapper: {
        width: 45,
        alignItems: 'flex-end',
    },
    deleteButton: {
        backgroundColor: '#c4200e',
        borderRadius: 12,
        width: 45,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default EditAddHeader;