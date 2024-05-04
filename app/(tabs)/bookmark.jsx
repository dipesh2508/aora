import { View, Text, ScrollView, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { icons } from "../../constants";

const Bookmark = () => {
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="px-4 my-6">
        <Text className="text-2xl text-white font-psemibold">
          Bookmarks
        </Text>

        <View className="flex flex-col items-center mt-10">
          <Text className="text-lg text-gray-100 font-pmedium mt-4">
            No bookmarks yet 
          </Text>

          <Text className="text-base text-gray-100 font-pmedium mt-4">
            (feature to be added soon!)
          </Text>
        </View>

      </ScrollView>

      </SafeAreaView>
  )
}

export default Bookmark