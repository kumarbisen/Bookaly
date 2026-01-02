import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment'; 
import { fetchTokens } from '@service/BookingProvider';


interface Appointment {
  token_id: string;
  // user_id: string;
  Number:number;
  created_at: string;
  status: 'completed' | 'pending';
}

// --- Mock Data ---
const ALL_APPOINTMENTS: Appointment[] = [
  {  token_id: '1', Number: 7371015156, created_at: '11:00 PM', status: 'completed' },
  {  token_id: '2', Number: 7371015156, created_at: '11:00 PM', status: 'completed' },
  {  token_id: '3', Number: 7371015156,  created_at: '11:00 PM', status: 'pending' },
  {  token_id: '4', Number: 7371015156, created_at: '11:00 PM', status: 'pending' },
  {  token_id: '5', Number: 7371015156, created_at: '01:00 PM', status: 'pending' },
  {  token_id: '6', Number: 7371015156,  created_at: '11:00 PM', status: 'pending' },
  {  token_id: '7', Number: 7371015156, created_at: '11:00 PM', status: 'pending' },
  {  token_id: '8', Number: 7371015156, created_at: '01:00 PM', status: 'pending' },
];

const Content = () => {
  
  const [selectedDate, setSelectedDate] = useState(moment()); 
  const [weekDays, setWeekDays] = useState<any[]>([]);
  const tokenData = fetchTokens()


  
  useEffect(() => {
    generateWeek(selectedDate);
     console.log(tokenData);
  }, [selectedDate]);

  
  const generateWeek = (date: moment.Moment) => {
    const startOfWeek = date.clone().startOf('isoWeek');
    const days = [];
    for (let i = 0; i < 7; i++) {
      const day = startOfWeek.clone().add(i, 'days');
      days.push({
        date: day,
        dayName: day.format('dd'), 
        dayNumber: day.format('D'), 
        fullDate: day.format('YYYY-MM-DD'),
        hasEvent: [13, 16, 20, 25].includes(parseInt(day.format('D'))), 
      });
    }
    setWeekDays(days);
  };

  const changeWeek = (direction: 'next' | 'prev') => {
    const newDate = direction === 'next' 
      ? selectedDate.clone().add(1, 'week') 
      : selectedDate.clone().subtract(1, 'week');
    setSelectedDate(newDate);
  };

 
  const renderCalendarStrip = () => (
    <View style={styles.calendarStrip}>
      {weekDays.map((item, index) => {
        const isSelected = item.fullDate === selectedDate.format('YYYY-MM-DD');
        return (
          <TouchableOpacity 
            key={index} 
            style={styles.dayContainer}
            onPress={() => setSelectedDate(item.date)}
          >
            <Text style={[styles.dayName, isSelected && styles.selectedDayName]}>
              {item.dayName.charAt(0)} 
            </Text>
            <View style={[styles.dateBubble, isSelected && styles.selectedDateBubble]}>
              <Text style={[styles.dateText, isSelected && styles.selectedDateText]}>
                {item.dayNumber}
              </Text>
            </View>
            {item.hasEvent && !isSelected && <View style={styles.eventDot} />}
          </TouchableOpacity>
        );
      })}
    </View>
  );

  const renderAppointmentItem = ({ item }: { item: Appointment }) => (
    <View style={styles.card}>
      <View style={styles.statusIconContainer}>
        {item.status === 'completed' ? (
          <Ionicons name="checkmark-circle" size={28} color="#2ECC71" />
        ) : (
          <Ionicons name="hourglass-outline" size={24} color="#E5E7EB" />
        )}
      </View>
      <View style={styles.cardContent}>
       
        <View style={styles.detailRow}>
          <Ionicons name="person-circle-outline" size={14} color="#9CA3AF" />
          <Text style={styles.detailText}>{item.token_id}</Text>
        </View>
        <View style={styles.detailRow}>
          <Ionicons name="call-outline" size={14} color="#9CA3AF" />
         
            <View style={[styles.providerDot, ]} />
          
          <Text style={styles.detailText}>{item.Number}</Text>
        </View>
      </View>
      <View style={styles.cardRight}>
        <Text style={styles.dateRight}>{selectedDate.format('D MMM')}</Text>
        <Text style={styles.timeRight}>{item.created_at}</Text>
      </View>
      <View style={styles.chevronContainer}>
        <Ionicons name="chevron-forward" size={20} color="#E5E7EB" />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
     
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => changeWeek('prev')}>
          <Ionicons name="chevron-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{selectedDate.format('MMMM YYYY')}</Text>
        <TouchableOpacity onPress={() => changeWeek('next')}>
          <Ionicons name="chevron-forward" size={24} color="#333" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.calendarWrapper}>
        {renderCalendarStrip()}
      </View>

      
      <View style={styles.listContainer}>
        <FlatList
          data={ALL_APPOINTMENTS}
          keyExtractor={(item) => item.token_id}
          renderItem={renderAppointmentItem}
          contentContainerStyle={styles.listContent}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#FFFFFF',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  calendarWrapper: {
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  calendarStrip: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  dayContainer: {
    alignItems: 'center',
    width: 40, 
    paddingVertical: 5,
  },
  dayName: {
    fontSize: 12,
    color: '#9CA3AF',
    marginBottom: 8,
    fontWeight: '500',
  },
  selectedDayName: {
    color: '#F43F5E', 
  },
  dateBubble: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  selectedDateBubble: {
    backgroundColor: '#F43F5E',
    shadowColor: '#F43F5E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  dateText: {
    fontSize: 16,
    color: '#4B5563',
    fontWeight: '500',
  },
  selectedDateText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  eventDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#3B82F6',
    marginTop: 2,
  },
  listContainer: {
    flex: 1, 
  },
  listContent: {
    paddingVertical: 10,
    paddingBottom: 40,
  },
  separator: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginLeft: 70,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  statusIconContainer: {
    width: 40,
    alignItems: 'center',
    marginRight: 10,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  detailText: {
    fontSize: 13,
    color: '#9CA3AF',
    marginLeft: 6,
  },
  providerDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginLeft: 6,
  },
  cardRight: {
    alignItems: 'flex-end',
    marginRight: 10,
  },
  dateRight: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  timeRight: {
    fontSize: 11,
    color: '#9CA3AF',
    marginTop: 2,
  },
  chevronContainer: {
    justifyContent: 'center',
  },
});

export default Content;