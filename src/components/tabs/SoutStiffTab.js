import React, { useState } from 'react'
import Slider from 'react-native-smooth-slider'
import { View, Text } from 'native-base'
import { Pressable, StyleSheet, TextInput, Keyboard } from 'react-native'

export const SoutStiffTab = () => {
	const [liquid, setLiquid] = useState(0)
	const [perc, setPerc] = useState(55)
	const [stiff, setStiff] = useState(0)
	return (
		<React.Fragment>
			<View style={{ alignItems: 'center', marginTop: 30 }}>
				<Text style={{ fontFamily: 'nunito-bold', fontSize: 30 }}>Liquid</Text>
				<Pressable onLongPress={() => alert('123')}>
					<TextInput
						keyboardType="decimal-pad"
						placeholder="type mass"
						style={{ fontSize: 30, textAlign: 'center', fontFamily: 'nunito' }}
						onChangeText={(value) => {
							setLiquid(value)
							let stiff =
								Math.floor(((value * 0.5) / (perc / 100) - value * 0.5) * 100) / 100
							setStiff(stiff)
						}}
					>
						{liquid === 0 ? '' : liquid}
					</TextInput>
				</Pressable>
			</View>
			<Slider
				style={{ marginHorizontal: 40, marginTop: 30 }}
				thumbTintColor="#4fd675"
				value={perc}
				minimumValue={50}
				maximumValue={60}
				onSlidingComplete={(value) => {
					setPerc(value)
					let stiff =
						Math.floor(((liquid * 0.5) / (perc / 100) - liquid * 0.5) * 100) / 100
					setStiff(stiff)
				}}
				onValueChange={(value) => {
					setPerc(value)
					let stiff =
						Math.floor(((liquid * 0.5) / (perc / 100) - liquid * 0.5) * 100) / 100
					setStiff(stiff)
				}}
				useNativeDriver={true}
			/>
			<Text style={{ textAlign: 'center', marginBottom: 30, fontFamily: 'nunito' }}>
				Hydrotation percent: {Math.round(perc * 10) / 10}
			</Text>
			<View style={{ alignItems: 'center' }}>
				<Text style={{ fontFamily: 'nunito-bold', fontSize: 30 }}>Need to add flour</Text>
				<Text style={{ fontSize: 30, fontFamily: 'nunito' }}>{stiff}</Text>
			</View>
		</React.Fragment>
	)
}
const styles = StyleSheet.create({
	label: {
		fontFamily: 'nunito-bold',
	},
	value: {
		width: '50%',
		fontFamily: 'nunito-bold',
		textAlign: 'right',
	},
	units: {
		color: '#aaa',
		fontFamily: 'nunito',
	},
})
