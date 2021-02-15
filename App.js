import React, { useState } from 'react'
import { Tabs, Tab, Container } from 'native-base'
import { LogBox, StyleSheet } from 'react-native'
import AppLoading from 'expo-app-loading'
import bootstrap from './src/bootstrap'
import PercentTab from './src/components/tabs/PercentTab'
import { SoutStiffTab } from './src/components/tabs/SoutStiffTab'
import { Header } from './src/components/Header'
import { Provider } from 'react-redux'
import store from './src/store'

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
		<Provider store={store}>
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
		</Provider>
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
LogBox.ignoreLogs(['Warning: Failed prop type: Invalid prop `tabStyle`'])
