import React, { useState } from 'react'
import { FlatList, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { Ingridient } from '../../components/Ingridient'
import { Ionicons } from '@expo/vector-icons'
import { connect } from 'react-redux'
import DialogInput from 'react-native-dialog-input'
import store from '../../store'
// import { View } from 'native-base'

const PercentTab = ({
	state,
	flourMainMass,
	flourMainPerc,
	flourAddMass,
	waterMass,
	waterPerc,
	saltMass,
	saltPerc,
	clear,
	add,
}) => {
	const [isDialogVisible, setIsDialogVisible] = useState(false)

	let mapState = state
	let someState = {}

	Object.keys(mapState).map((item) => {
		let fn = (value) => {
			console.log(value)
			store.dispatch({ type: item + 'Mass', payload: value })
		}
		Object.defineProperty(fn, 'name', { value: item + 'Mass' })
		someState[item] = {
			mass: 0,
			perc: 0,
			fn,
		}
	})

	console.log(Object.keys(mapState))

	let content = Object.keys(mapState).map((item) => {
		if (mapState[item].title) {
			return (
				<Ingridient
					name={mapState[item].title}
					mass={mapState[item].mass.toString()}
					perc={mapState[item].perc.toString()}
					onChangeMass={(mass) => someState[item].fn(mass)}
				/>
			)
		}
	})

	return (
		<React.Fragment>
			<ScrollView>{content}</ScrollView>
			{/* <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
				<Text>Flour ALL: {state.flour}</Text>
				<Text>Flour: {state.flourMain.mass}</Text>
				<Text>Flour#2: {state.flourAdd.mass}</Text>
				<Text>Water: {state.water.mass}</Text>
				<Text>Salt: {state.salt.mass}</Text>
			</View> */}
			{Object.keys(mapState).map((item) => {
				if (mapState[item].title) {
					return (
						<View>
							<Text style={{ fontWeight: 'bold' }}>{mapState[item].title}</Text>
							<Text>mass={mapState[item].mass}</Text>
							<Text>perc={mapState[item].perc}</Text>
						</View>
					)
				}
			})}
			{/* <Ingridient
				name={state.flourMain.title}
				mass={state.flourMain.mass.toString()}
				perc={state.flourMain.perc.toString()}
				onChangeMass={(mass) => flourMainMass(mass)}
				onChangePerc={(perc) => flourMainPerc(perc)}
			/>
			<Ingridient
				name={state.flourAdd.title}
				mass={state.flourAdd.mass.toString()}
				perc={state.flourAdd.perc.toString()}
				onChangeMass={(mass) => flourAddMass(mass)}
			/>
			<Ingridient
				name={state.water.title}
				mass={state.water.mass.toString()}
				perc={state.water.perc.toString()}
				onChangeMass={(mass) => waterMass(mass)}
				onChangePerc={(perc) => waterPerc(perc)}
			/>
			<Ingridient
				name={state.salt.title}
				mass={state.salt.mass.toString()}
				perc={state.salt.perc.toString()}
				onChangeMass={(mass) => saltMass(mass)}
				onChangePerc={(perc) => saltPerc(perc)}
			/> */}

			<Pressable
				android_ripple={{ color: 'white' }}
				style={{
					position: 'absolute',
					left: 200,
					bottom: 20,
					flex: 1,
					alignItems: 'center',
					justifyContent: 'center',
					width: 50,
					height: 50,
					backgroundColor: '#000',
					// borderWidth: 1,
					borderRadius: 30,
				}}
				onPress={() => clear()}
			>
				<Ionicons name="trash-outline" size={24} color="white" />
			</Pressable>
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
					backgroundColor: '#4fd675',
					// borderWidth: 1,
					borderRadius: 30,
				}}
				onPress={() => setIsDialogVisible(true)}
			>
				<Ionicons name="add" size={24} color="white" />
			</Pressable>
			<DialogInput
				isDialogVisible={isDialogVisible}
				title={'New ingridient'}
				message={'Enter the new ingredient name'}
				// hintInput={'HINT INPUT'}
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
})

// --------- REDUX START ---------
const mapStateToProps = (state) => {
	return { state }
}

const mapDispatchToProps = (dispatch) => {
	return {
		// flourMainMass: (mass) => dispatch({ type: 'FLOUR_MAIN_MASS', payload: mass }),
		// flourMainPerc: (perc) => dispatch({ type: 'FLOUR_MAIN_PERC', payload: perc }),
		// flourAddMass: (mass) => dispatch({ type: 'FLOUR_ADD_MASS', payload: mass }),
		// waterMass: (mass) => dispatch({ type: 'WATER_MASS', payload: mass }),
		// waterPerc: (perc) => dispatch({ type: 'WATER_PERC', payload: perc }),
		// saltMass: (mass) => dispatch({ type: 'SALT_MASS', payload: mass }),
		// saltPerc: (perc) => dispatch({ type: 'SALT_PERC', payload: perc }),
		clear: () => dispatch({ type: 'CLEAR' }),
		add: (newItem) => dispatch({ type: 'ADD', payload: newItem }),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(PercentTab)
// --------- REDUX END ---------
