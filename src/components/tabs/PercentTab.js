import React, { useEffect, useRef, useState } from 'react'
import { Animated, Pressable, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import { Ingridient } from '../../components/Ingridient'
import { Ionicons } from '@expo/vector-icons'
import { connect } from 'react-redux'
import DialogInput from 'react-native-dialog-input'
import store from '../../store'
import { Text, View } from 'native-base'

const PercentTab = ({ state, clear, add }) => {
	const [isDialogVisible, setIsDialogVisible] = useState(false)

	let mapState = Object.values(state)
		.slice(1)
		.sort((a, b) => a.id - b.id)

	let someState = {}

	mapState.map((item) => {
		let fnMass = (value) => {
			store.dispatch({ type: item.key + 'Mass', payload: value })
		}
		let fnPerc = (value) => {
			store.dispatch({ type: item.key + 'Perc', payload: value })
		}
		Object.defineProperty(fnMass, 'name', { value: item.key + 'Mass' })
		Object.defineProperty(fnPerc, 'name', { value: item.key + 'Perc' })
		someState[item.key] = {
			...item,
			fnMass,
			fnPerc,
		}
	})

	let content = Object.keys(someState).map((item) => {
		return (
			<TouchableOpacity
				key={someState[item].key}
				onLongPress={() => alert(someState[item].title)}
				android_ripple
			>
				<Ingridient
					key={someState[item].key}
					type={someState[item].type}
					name={someState[item].title}
					mass={someState[item].mass.toString()}
					perc={someState[item].perc.toString()}
					onChangeMass={(mass) => someState[item].fnMass(mass)}
					onChangePerc={(perc) => someState[item].fnPerc(perc)}
				/>
			</TouchableOpacity>
		)
	})

	// ANIMATION FUNCS
	const marginAnim = useRef(new Animated.Value(0)).current
	const heightAnim = useRef(new Animated.Value(0)).current
	const rollDown = () => {
		Animated.timing(marginAnim, { toValue: 10, duration: 300, useNativeDriver: false }).start()
		Animated.timing(heightAnim, { toValue: 20, duration: 300, useNativeDriver: false }).start()
	}
	const rollUp = () => {
		Animated.timing(marginAnim, { toValue: 0, duration: 300, useNativeDriver: false }).start()
		Animated.timing(heightAnim, { toValue: 0, duration: 300, useNativeDriver: false }).start()
	}

	useEffect(() => {
		state.flour > 0 ? rollDown() : rollUp()
	})

	return (
		<React.Fragment>
			<ScrollView>
				<Animated.View style={{ height: heightAnim, margin: marginAnim }}>
					<Text style={{ fontFamily: 'nunito' }}>Flour total weight: {state.flour}</Text>
				</Animated.View>
				{content}
			</ScrollView>

			<Pressable
				android_ripple={{ color: 'white' }}
				style={{
					...styles.btn,
					left: 30,
					backgroundColor: '#000',
				}}
				onPress={() => clear()}
			>
				<Ionicons name="trash-outline" size={24} color="white" />
			</Pressable>
			<Pressable
				android_ripple={{ color: 'white' }}
				style={{
					...styles.btn,
					right: 30,
					backgroundColor: '#4fd675',
				}}
				onPress={() => setIsDialogVisible(true)}
			>
				<Ionicons name="add" size={24} color="white" />
			</Pressable>
			<DialogInput
				isDialogVisible={isDialogVisible}
				title={'New ingridient'}
				message={'Enter the new ingredient name'}
				submitInput={(inputText) => {
					add(inputText)
					setIsDialogVisible(false)
				}}
				closeDialog={() => setIsDialogVisible(false)}
			></DialogInput>
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
	btn: {
		position: 'absolute',
		bottom: 30,
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		width: 60,
		height: 60,
		borderRadius: 60,
	},
})

// --------- REDUX START ---------
const mapStateToProps = (state) => {
	return { state }
}

const mapDispatchToProps = (dispatch) => {
	return {
		clear: () => dispatch({ type: 'CLEAR' }),
		add: (newItem) => {
			let newItemSort
			let type

			if (newItem[0]) {
				type = 'flour'
				newItemSort = 'flour'.concat(
					newItem[1].toLowerCase().replace('flour', '').split(' ').reverse().join('')
				)
			} else {
				type = 'ingridient'

				newItemSort = newItem[1]
					.toLowerCase()
					.replace('flour', '')
					.split(' ')
					.reverse()
					.join('')
			}

			console.log(newItemSort)
			dispatch({ type: 'ADD', payload: { newItem, newItemSort, type } })
		},
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(PercentTab)
// --------- REDUX END ---------
