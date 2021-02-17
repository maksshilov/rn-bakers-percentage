import React, { useEffect, useRef, useState } from 'react'
import {
	Alert,
	Animated,
	Easing,
	Pressable,
	ScrollView,
	StyleSheet,
	TouchableOpacity,
} from 'react-native'
import { Ingridient } from '../../components/Ingridient'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { connect } from 'react-redux'
import DialogInput from 'react-native-dialog-input'
import store from '../../store'
import { Text } from 'native-base'

const PercentTab = ({ state, clear, add, remove }) => {
	const [isDialogVisible, setIsDialogVisible] = useState(false)

	const removeHandler = (item) => {
		const { title } = item
		Alert.alert(
			'Deleting item',
			`Are you sure you want to delete${'\n'}"${title}" ingridient ?`,
			[
				{
					text: 'Cancel',
					onPress: () => console.log('Cancel Pressed'),
					style: 'cancel',
				},
				{
					text: 'Delete',
					onPress: () => remove(item.key),
				},
			],
			{ cancelable: true }
		)
	}

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

	// ANIMATION FUNCS
	const { flour } = state

	const prevFlourRef = useRef()
	useEffect(() => {
		prevFlourRef.current = flour
	})
	const prevFlour = prevFlourRef.current

	const heightAnim = useRef(new Animated.Value(0)).current
	const topAnim = useRef(new Animated.Value(0)).current
	const marginAnim = useRef(new Animated.Value(0)).current

	const easing = Easing.inOut(Easing.cubic)
	const duration = 600

	const rollDown = () => {
		Animated.timing(heightAnim, {
			toValue: 25,
			duration,
			useNativeDriver: false,
			easing,
		}).start()
		Animated.timing(topAnim, {
			toValue: 0,
			duration,
			useNativeDriver: false,
			easing,
		}).start()
		Animated.timing(marginAnim, {
			toValue: 10,
			duration,
			useNativeDriver: false,
			easing,
		}).start()
	}
	const rollUp = () => {
		Animated.timing(heightAnim, {
			toValue: 0,
			duration,
			useNativeDriver: false,
			easing,
		}).start()
		Animated.timing(topAnim, {
			toValue: -30,
			duration,
			useNativeDriver: false,
			easing,
		}).start()
		Animated.timing(marginAnim, {
			toValue: 0,
			duration,
			useNativeDriver: false,
			easing,
		}).start()
	}

	useEffect(() => {
		flour > 0 ? rollDown() : rollUp()
	})

	let content = Object.keys(someState).map((item) => {
		return (
			<TouchableOpacity
				key={someState[item].key}
				onLongPress={() => removeHandler(someState[item])}
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
	// console.log(topAnim._children[0].top)
	return (
		<React.Fragment>
			<ScrollView>
				<Animated.View
					style={{
						top: topAnim,
						height: heightAnim,
						margin: marginAnim,
						flexDirection: 'row',
						alignItems: 'center',
					}}
				>
					<Text style={{ fontFamily: 'nunito' }}>Flour total weight: {flour}</Text>
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
				<FontAwesome name="trash" size={24} color="white" />
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
				<FontAwesome name="plus" size={24} color="white" />
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

			dispatch({ type: 'ADD', payload: { newItem, newItemSort, type } })
		},
		remove: (item) => dispatch({ type: 'DELETE', payload: item }),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(PercentTab)
// --------- REDUX END ---------
