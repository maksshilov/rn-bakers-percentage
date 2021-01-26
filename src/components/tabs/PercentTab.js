import React, { useState } from 'react'
import { Pressable, StyleSheet } from 'react-native'
import { Ingridient } from '../../components/Ingridient'
import { Ionicons } from '@expo/vector-icons'
import { connect } from 'react-redux'

const PercentTab = (props) => {
	const [flour, setFlour] = useState(0)

	const [flourMain, setFlourMain] = useState({
		mass: 0,
		perc: 0,
	})
	const [flourAdd, setFlourAdd] = useState({
		mass: 0,
		perc: 0,
	})
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
				name={'Main Flour'}
				mass={flourMain.mass.toString()}
				perc={flourMain.perc.toString()}
				onChangeMass={(mass) => {
					const { mass: waterMass, perc: waterPerc } = water
					const { mass: saltMass, perc: saltPerc } = salt

					let newWaterPerc = Math.round((waterMass / mass) * 100)
					let newSaltPerc = Math.round((saltMass / mass) * 100)

					let flourCommon = flourAdd.mass + mass
					setFlour(flourCommon)

					setFlourMain({
						mass,
						perc: flourCommon === 0 ? 0 : Math.round((mass / flourCommon) * 1000) / 10,
					})

					setFlourAdd({
						...flourAdd,
						perc:
							flourCommon === 0
								? 0
								: Math.round((flourAdd.mass / flourCommon) * 1000) / 10,
					})

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
				name={'Add. Flour'}
				mass={flourAdd.mass.toString()}
				perc={flourAdd.perc.toString()}
				onChangeMass={(mass) => {
					const { mass: waterMass, perc: waterPerc } = water
					const { mass: saltMass, perc: saltPerc } = salt

					let newWaterPerc = Math.round((waterMass / mass) * 100)
					let newSaltPerc = Math.round((saltMass / mass) * 100)

					let flourCommon = flourMain.mass + mass
					setFlour(flourCommon)

					setFlourMain({
						...flourMain,
						perc:
							flourCommon === 0
								? 0
								: Math.round((flourMain.mass / flourCommon) * 1000) / 10,
					})

					setFlourAdd({
						mass,
						perc: flourCommon === 0 ? 0 : Math.round((mass / flourCommon) * 1000) / 10,
					})

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
					props.clog()
					console.log(props.someVar)
					setFlour(0)
					setFlourMain({ mass: 0, perc: 0 })
					setFlourAdd({ mass: 0, perc: 0 })
					setWater({ mass: 0, perc: 0 })
					setSalt({ mass: 0, perc: 0 })
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

const mapStateToProps = (state) => {
	return { someVar: state }
}

const mapDispatchToProps = (dispatch) => {
	return {
		clog: () => dispatch({ type: 'CLOG' }),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(PercentTab)
