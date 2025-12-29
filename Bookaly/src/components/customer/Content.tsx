import CustomText from '@components/UI/CustomText';
import { Colors } from '@utils/Constants';
import React, { FC, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import Icon from '@components/global/Icon';
import { booktoken, fetchTokens } from '@service/BookingProvider';
import { RefreshControl } from 'react-native';

interface tokenData {
  _id?: string;
  token_id: number;
  queue_date: string | Date;
  user_id?: { name?: string; phone?: string } | string;
  provider_id?: string;
  expires_at?: string | Date;
}

const Content: FC = () => {
  const [tokens, setTokens] = useState<tokenData[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const route: any = useRoute();

  const load = async () => {
    setLoading(true);
    const incomingToken = route?.params?.token;
    
if (incomingToken) {
    setTokens(prevTokens => {
      // 1. Check if the token already exists in our current state
      const isDuplicate = prevTokens.some(
        t => (t._id === incomingToken._id) || (t.token_id === incomingToken.token_id)
      );

      // 2. If it's new, add it to the top. If not, return the state as is.
      if (!isDuplicate) {
        return [incomingToken, ...prevTokens];
      }
      return prevTokens;
    });
    }

    setLoading(false)
  };

  useEffect(() => {
    load();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
  
    await load();
    setRefreshing(false);
  };

  const renderItem = ({ item }: { item: tokenData }) => {
    const date = new Date(item.queue_date);
    const expires = item.expires_at ? new Date(item.expires_at) : null;

  
    return (
      <View style={styles.card}>
        
        <View>
          <View style={styles.topCardContent}>
            <View style={[styles.iconContainer, styles.greenIconBg]}>
              <Icon
                name="calendar-check-outline"
                size={24}
                iconFamily="MaterialCommunityIcons"
                color="#4CAF50"
              />
            </View>
            <View style={styles.textContainer}>
              <CustomText style={{ fontWeight: '300', fontSize: 16 }}>
                Dr. Kunal Hospital
              </CustomText>
              <Text style={styles.timeText}>{item.provider_id}</Text>
            </View>
          </View>
          {/* Divider */}
          <View style={styles.divider} />

          <View style={styles.tokenContent}>
            <CustomText>Token No :</CustomText>
            <CustomText style={{ fontSize: 24, marginStart: 15 }}>
             {item.token_id}
            </CustomText>
          </View>
          <View style={styles.tokenContent}>
            <CustomText>Book Date:</CustomText>
            <CustomText style={{ marginStart: 5 }}>{date.toLocaleString()}</CustomText>
          </View>

          <View style={styles.expire}>
            <CustomText style={{ marginEnd: 5 }}>expire in:</CustomText>
            <Icon name="time-outline" size={16} iconFamily="Ionicons" color="#b81e1eff" />
            <CustomText style={{ fontSize: 10, marginStart: 5, color: '#b81e1eff' }}>{expires?.toLocaleString()}</CustomText>
          </View>
        </View>
      </View>
    );
  };

  if (loading) return <ActivityIndicator style={{ marginTop: 24 }} size="large" />;

  return (
    <View>
      <>
        <View style={styles.cardContainer}>
          <FlatList
            data={tokens}
            keyExtractor={item => item._id ?? String(item.token_id)}
            renderItem={renderItem}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            ListEmptyComponent={<Text style={styles.empty}>No booking found</Text>}
            contentContainerStyle={tokens.length === 0 ? { flex: 1, justifyContent: 'center', alignItems: 'center' } : undefined}
          />
        </View>
      
      </>

      <CustomText style={styles.text2}>Made with ❤️ by Vivek Bisen</CustomText>
    </View>
  );
};
export default Content;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  empty: { color: '#666' },
  topCardContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  tokenContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  expire: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  greenIconBg: {
    backgroundColor: '#E8F5E9',
  },
  textContainer: {
    flex: 1,
  },
  timeText: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
  propertyText: {
    fontSize: 12,
    color: '#888',
    marginTop: 5,
    marginLeft: 5,
  },
  divider: {
    height: 2,
    backgroundColor: '#e1e0e0ff',
    marginVertical: 15,
  },

  cardHeader: {
    marginBottom: 15,
    flex: 1,
    flexDirection: 'row',
  },
  cardContainer: {
    padding: 10,
  },
  text2: {
    opacity: 0.5,
    margin: 20,
    fontSize: 24,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    marginBottom: 20,
    padding: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  scrollViewContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    opacity: 0.8,
    color: '#333',
  },
});
