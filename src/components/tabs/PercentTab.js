import React, { useState } from 'react'
import { Pressable, StyleSheet } from 'react-native'
import { Ingridient } from '../../components/Ingridient'
import { Ionicons } from '@expo/vector-icons'
import { connect } from 'react-redux'

const PercentTab = ({
	state,
	flourMainMass,
	flourAddMass,
	waterMass,
	waterPerc,
	saltMass,
	clear,
}) => {
	// console.log(state)

	return (
		<React.Fragment>
			<Ingridient
				name={'Main Flour'}
				mass={state.flourMain.mass.toString()}
				perc={state.flourMain.perc.toString()}
				onChangeMass={(mass) => flourMainMass(mass)}
			/>
			<Ingridient
				name={'Add. Flour'}
				mass={state.flourAdd.mass.toString()}
				perc={state.flourAdd.perc.toString()}
				onChangeMass={(mass) => flourAddMass(mass)}
			/>
			<Ingridient
				name={'Water'}
				mass={state.water.mass.toString()}
				perc={state.water.perc.toString()}
				onChangeMass={(mass) => waterMass(mass)}
				onChangePerc={(perc) => {
					waterPerc(perc)

					// const newMass = Math.round(flour * perc) / 100
					// setWater({
					// 	mass: !isNaN(newMass) && newMass !== Infinity ? newMass : water.mass,
					// 	perc,
					// })
				}}
			/>
			<Ingridient
				name={'Salt'}
				mass={state.salt.mass.toString()}
				perc={state.salt.perc.toString()}
				onChangeMass={(mass) => saltMass(mass)}
				onChangePerc={(perc) => {
					const newMass = Math.round(flour * perc * 10) / 1000
					setSalt({
						mass: !isNaN(newMass) && newMass !== Infinity ? newMass : salt.mass,
						perc,
					})
				}}
			/>

			<Pressable
				android_ripple={{ color: 'white' }}
				style={{
					position: 'absolute',
					left: 20,
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
				onPress={() => clear()}
			>
				<Ionicons name="trash-outline" size={24} color="white" />
			</Pressable>
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

// REDUX START
const mapStateToProps = (state) => {
	return { state }
}

const mapDispatchToProps = (dispatch) => {
	return {
		flourMainMass: (mass) => dispatch({ type: 'FLOUR_MAIN_MASS', payload: mass }),
		flourAddMass: (mass) => dispatch({ type: 'FLOUR_ADD_MASS', payload: mass }),
		waterMass: (mass) => dispatch({ type: 'WATER_MASS', payload: mass }),
		waterPerc: (perc) => dispatch({ type: 'WATER_PERC', payload: perc }),
		saltMass: (mass) => dispatch({ type: 'SALT_MASS', payload: mass }),
		clear: () => dispatch({ type: 'CLEAR' }),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(PercentTab)
// REDUX END
