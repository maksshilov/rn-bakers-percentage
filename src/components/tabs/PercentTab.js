import React, { useEffect, useState } from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import { Ingridient } from '../../components/Ingridient'
import { Ionicons } from '@expo/vector-icons'

export const PercentTab = () => {
	const [flour, setFlour] = useState(0)
	const [water, setWater] = useState({
		mass: 0,
		perc: 0,
	})
	const [salt, setSalt] = useState({
		mass: 0,
		perc: 0,
	})

	// console.log(water)

	return (
		<React.Fragment>
			<Ingridient
				name={'Flour'}
				mass={flour.toString()}
				onChangeMass={(flour) => {
					const { mass: waterMass, perc: waterPerc } = water
					const { mass: saltMass, perc: saltPerc } = salt
					let newWaterPerc = Math.round((waterMass / flour) * 100)
					let newSaltPerc = Math.round((saltMass / flour) * 100)
					setFlour(flour)

					setWater({
						mass: waterMass,
						perc:
							!isNaN(newWaterPerc) && newWaterPerc !== Infinity
								? newWaterPerc
								: waterPerc,
					})

					setSalt({
						mass: saltMass,
						perc:
							!isNaN(newSaltPerc) && newSaltPerc !== Infinity
								? newSaltPerc
								: saltPerc,
					})
				}}
			/>
			<Ingridient
				name={'Water'}
				mass={water.mass.toString()}
				perc={water.perc.toString()}
				onChangeMass={(mass) => {
					const newPerc = Math.round((mass / flour) * 10000) / 100

					setWater({
						mass,
						perc: !isNaN(newPerc) && newPerc !== Infinity ? newPerc : water.perc,
					})
				}}
				onChangePerc={(perc) => {
					const newMass = Math.round(flour * perc) / 100
					setWater({
						mass: !isNaN(newMass) && newMass !== Infinity ? newMass : water.mass,
						perc,
					})
				}}
			/>
			<Ingridient
				name={'Salt'}
				mass={salt.mass.toString()}
				perc={salt.perc.toString()}
				onChangeMass={(mass) => {
					const newPerc = Math.round((mass / flour) * 10000) / 100
					setSalt({
						mass,
						perc: !isNaN(newPerc) && newPerc !== Infinity ? newPerc : salt.perc,
					})
				}}
				onChangePerc={(perc) => {
					const newMass = Math.round(flour * perc * 10) / 1000
					setSalt({
						mass: !isNaN(newMass) && newMass !== Infinity ? newMass : salt.mass,
						perc,
					})
				}}
			/>
			<Ingridient
				name={'Yeast / Sour Starter'}
				mass={salt.mass.toString()}
				perc={salt.perc.toString()}
				onChangeMass={(mass) => {
					const perc = Math.round((mass / flour) * 10000) / 100
					setSalt({
						mass,
						perc,
					})
				}}
				onChangePerc={(perc) => {
					const mass = Math.round(flour * perc * 10) / 1000
					setSalt({
						mass,
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
				onPress={() => {
					setWater({ mass: 0, perc: 0 })
					setSalt({ mass: 0, perc: 0 })
					setFlour(0)
				}}
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
