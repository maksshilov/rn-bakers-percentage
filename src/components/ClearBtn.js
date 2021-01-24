import React from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

export const ClearBtn = ({ onClear }) => {
	return (
		<Pressable
			android_ripple={{ color: 'white' }}
			style={{
				position: 'absolute',
				right: 20,
				bottom: 20,
				flex: 1,
				alignItems: 'center',
				justifyContent: 'center',
				width: 50,
				height: 50,
				backgroundColor: '#000',
				borderWidth: 1,
				borderRadius: 30,
			}}
			onPress={() => onClear()}
		>
			<Ionicons name="trash-outline" size={24} color="white" />
		</Pressable>
	)
}
