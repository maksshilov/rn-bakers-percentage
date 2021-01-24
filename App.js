import React, { useState } from 'react'
import { Tabs, Tab, TabHeading, Container } from 'native-base'
import { StyleSheet } from 'react-native'
import AppLoading from 'expo-app-loading'
import bootstrap from './src/bootstrap'
import { PercentTab } from './src/components/tabs/PercentTab'
import { SoutStiffTab } from './src/components/tabs/SoutStiffTab'
import { Header } from './src/components/Header'
import { FontAwesome } from '@expo/vector-icons'

export default function App() {
	const [isReady, setIsReady] = useState(false)

	if (!isReady) {
		return (
			<AppLoading
				startAsync={bootstrap}
				onFinish={() => setIsReady(true)}
				onError={(err) => console.log(err)}
			/>
		)
	}

	return (
		<Container>
			<Header hasTabs />
			<Tabs initialPage={0}>
				<Tab
					heading="Baker %"
					tabStyle={{
						backgroundColor: '#000',
					}}
					activeTabStyle={{
						backgroundColor: '#000',
					}}
					textStyle={{
						color: '#888',
						fontFamily: 'nunito-bold',
					}}
					activeTextStyle={{
						color: '#fff',
						fontFamily: 'nunito-bold',
					}}
				>
					<PercentTab />
				</Tab>
				<Tab
					heading="Liquid / Stiff"
					// heading={
					// 	<TabHeading>
					// 		<Text>Sour</Text>
					// 		<FontAwesome name="exchange" size={24} />
					// 	</TabHeading>
					// }
					tabStyle={{
						backgroundColor: '#000',
					}}
					activeTabStyle={{
						backgroundColor: '#000',
					}}
					textStyle={{
						color: '#888',
						fontFamily: 'nunito-bold',
					}}
					activeTextStyle={{
						color: '#fff',
						fontFamily: 'nunito-bold',
					}}
				>
					<SoutStiffTab />
				</Tab>
			</Tabs>
		</Container>
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
