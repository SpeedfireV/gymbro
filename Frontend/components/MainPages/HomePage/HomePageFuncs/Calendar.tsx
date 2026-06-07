import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import { format, addDays} from 'date-fns';
import { enUS } from 'date-fns/locale';
import DayTile from './DayTile'


interface CalendarProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
}

const Calendar = ({selectedDate, onDateChange }: CalendarProps) => {
    const flatListRef = useRef<FlatList>(null);
    const [dates, setDates] = useState<Date[]>([]);
    const loadLength = 31;

    useEffect(() => {
        const today = new Date();
        const tmpDates: Date[] = [];
        const start = addDays(today, -7);
    
        for (let i = 0; i < 30; i++) {
            tmpDates.push(addDays(start, i));
        }
        setDates(tmpDates);
    }, []);

    const loadNextDays = () => {
        const lastDate = dates[dates.length - 1];
        const newDays: Date[] = [];

        for (let i = 1; i < loadLength; i++) {
            newDays.push(addDays(lastDate, i));
        }

        setDates([...dates, ...newDays]);
    };

    const loadOldDays = () => {
        const firstDate = addDays(dates[0], -loadLength);
        const newDays: Date[] = [];

        for (let i = 1; i < loadLength; i++) {
            newDays.push(addDays(firstDate, i));
        }

        setDates([...newDays, ...dates]);

        setTimeout(() => {
            flatListRef.current?.scrollToIndex({
            index: loadLength - 1,
            animated: false,
            });
        }, 20);
    };

    const renderItem = ({ item }: { item: Date }) => (
        <DayTile 
            item={item} 
            selectedDate={selectedDate} 
            pressEffect={onDateChange} 
        />
    );

    return (
        <View style={styles.container}>
        <Text style={styles.monthTitle}>
            {format(selectedDate, 'LLLL', { locale: enUS }).toUpperCase()}
        </Text>

        <FlatList
            ref={flatListRef}
            data={dates}
            renderItem={renderItem}
            keyExtractor={(item) => item.toString()}
            horizontal
            getItemLayout={(data, index) => ({
                length: 70,
                offset: 70 * index,
                index,
            })}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
            snapToAlignment="start"
            decelerationRate="fast"
            ListHeaderComponent={
            <TouchableOpacity style={styles.moreButton} onPress={loadOldDays}>
            <Text style={styles.moreText}>PREV</Text>
            </TouchableOpacity>
        }
        
        ListFooterComponent={
            <TouchableOpacity style={styles.moreButton} onPress={loadNextDays}>
            <Text style={styles.moreText}>NEXT</Text>
            </TouchableOpacity>
        }
        />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#121212',
        paddingTop: 50,
        paddingBottom: 10,
        borderBottomColor: '#ffffff',
        borderBottomWidth: 2,
    },
    monthTitle: {
        color: '#ff1e00',
        fontSize: 24,
        marginLeft: 20,
        marginBottom: 15,
        fontFamily: 'BigShoulders',
        fontWeight: '900'
    },
    listContent: {
        paddingHorizontal: 10,
    },
    moreButton: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 15,
        height: 80, 
    },
    moreText: {
        color: '#FFA500',
        fontSize: 12,
        fontWeight: 'bold',
        letterSpacing: 1,
},
});

export default Calendar;