import * as Font from 'expo-font'

export default async function bootstrap(){
    await Font.loadAsync({
        
        'nunito':require('../assets/fonts/NunitoSans-Regular.ttf'),
        'nunito-bold':require('../assets/fonts/NunitoSans-Bold.ttf')
    })
}