import React from 'react'
import { Image, StyleSheet, View } from 'react-native'

export const Header = () => {
	return (
		<View style={styles.wrapper}>
			<Image source={require('../../assets/g-logo.png')} style={styles.logo} />
		</View>
	)
}

const styles = StyleSheet.create({
	wrapper: {
		marginTop: 30,
		height: 100,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#fff',
	},
	logo: {
		resizeMode: 'center',
		// backgroundColor: 'yellow',
	},
})
