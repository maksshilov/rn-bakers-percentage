import React from 'react'
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native'

export const Ingridient = ({ name, mass, perc, onChangeMass, onChangePerc, type }) => {
	return (
		<View style={{ ...styles.wrapper, backgroundColor: type === 'flour' ? '#FCF4E7' : '#fff' }}>
			<Text style={styles.label}>{name}</Text>
			<TouchableOpacity>
				<TextInput
					style={styles.value}
					maxLength={6}
					keyboardType={'numeric'}
					placeholder="0"
					value={mass}
					onChangeText={(input) => {
						if (!isNaN(Number(input))) {
							onChangeMass(Number(input))
						}
					}}
				/>
			</TouchableOpacity>
			<Text style={styles.units}>m</Text>
			<TextInput
				style={styles.value}
				maxLength={4}
				keyboardType={'numeric'}
				placeholder="0"
				value={perc}
				onChangeText={(input) => {
					if (!isNaN(Number(input))) {
						onChangePerc(Number(input))
					}
				}}
			/>
			<Text style={styles.units}>%</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	wrapper: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: 10,
		borderBottomWidth: 1,
		borderBottomColor: '#ddd',
		height: 70,
	},
	label: {
		width: 120,
		fontFamily: 'nunito-bold',
		fontSize: 20,
	},
	value: {
		width: 80,
		height: 70,
		fontFamily: 'nunito-bold',
		textAlign: 'right',
		fontSize: 20,
	},
	units: {
		width: 30,
		color: '#aaa',
		fontFamily: 'nunito',
		textAlign: 'right',
		fontSize: 20,
	},
})
