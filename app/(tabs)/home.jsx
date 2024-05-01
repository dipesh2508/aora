import { View, Text, FlatList, Image, RefreshControl, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import {images} from '../../constants'
import SearchInput from '../../components/SearchInput'
import Trending from '../../components/Trending'
import EmptyState from '../../components/EmptyState'
import {getAllPosts} from '../../lib/appwrite'

const Home = () => {

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await getAllPosts();
        setData(response);
      } catch (error) {
        Alert.alert("Error", error.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  console.log(data);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);

    //re call videos

    setRefreshing(false);

  }
  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList 
        data={[{id:1}, {id:2}, {id:3},]}
        keyExtractor={(item)=> item.$id}
        renderItem={({item})=>(
          <Text className="text-3xl text-white">{item.id}</Text>
  )}
  ListHeaderComponent={()=>(
    <View className="my-6 px-4 space-y-6">
      <View className="justify-between items-center flex-row mb-6">
        <View>
          <Text className="font-pmedium text-sm text-gray-100">
            Welcome back
          </Text>

          <Text className="text-2xl font-psemibold text-gray-100">
            Dipesh Ranjan
          </Text>
        </View>
        <View className="mt-1.5">
          <Image source={images.logoSmall} className="w-9 h-10" resizeMode='contain' />
        </View>
        </View>

        <SearchInput />

        <View className="w-full flex-1 pt-2">
          <Text className="text-gray-100 text-lg font-pregular mb-3">
            Latest Videos
          </Text>

          <Trending posts={[{id:1}, {id:2}, {id:3}] ?? []} />

        </View>
    </View>
  )}
  ListEmptyComponent={()=>
  <EmptyState
  title="No videos found"
  subtitle="There are no videos available in the database"
  />
  }

  refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
    </SafeAreaView>
  )
}

export default Home