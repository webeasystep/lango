import React from 'react';
import { translate} from 'react-i18next';
import i18n from 'i18next';
import { StyleSheet, Text, View, Button,AsyncStorage } from 'react-native';

// using the translation hoc to provie t function in props using home as default namespace
// https://github.com/i18next/react-i18next#translate-hoc

const HeaderTitle = (props) => (
    <View style={{textAlign:"left" ,flex:1}} >
        <Text style={{fontSize:21,fontWeight: "bold"}}>{props.lang}</Text>
    </View>
);
export class Home extends React.Component {

    static navigationOptions = ({ navigation, screenProps }) => ({
        headerTitle: <HeaderTitle  lang={screenProps.t('home:title')}/>,
    });

    async onChangeLang(lang) {
        i18n.changeLanguage(lang);
        try {
            await AsyncStorage.setItem('@APP:languageCode',lang);
        } catch (error) {
            console.log(` Hi Errorrrr : ${error}`);
        }
        console.log(i18n.dir());
    }

    render() {
        const { t, i18n, navigation } = this.props;
        const { navigate } = navigation;

        return (
            <View style={styles.container}>
                <Text>{t('common:currentLanguage', { lng: i18n.language })}</Text>
                <Button
                    onPress={() => this.onChangeLang('en')}
                    title={t('common:actions.toggleToEnglish')}
                />
                <Button
                    onPress={() => this.onChangeLang('de')}
                    title={t('common:actions.toggleToGerman')}
                />
                <Button
                    onPress={() => this.onChangeLang('ar')}
                    title={t('common:actions.toggleToArabic')}
                />
                <View style={styles.langContainer}>
                    <Text style={styles.separate}>{t('introduction')}</Text>
                    <Button
                        onPress={() => navigate('Page2')}
                        title={t('common:actions.goToPage2')}
                    />
                </View>

            </View>
        );
    }
}

export default translate(['home', 'common'], { wait: true })(Home);
let isRTL = i18n.dir();
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#F5FCFF',
    },
    langContainer:{
        alignItems:isRTL === 'rtl'? 'flex-end':'flex-start',
        paddingRight:isRTL === 'rtl'? 30:10,
        paddingLeft:isRTL === 'rtl'? 10:30,
        borderTopWidth:2,
        borderTopColor:"#000",
        flexDirection: isRTL === 'rtl'? 'row-reverse':'row',
        padding:5,
        borderRightWidth:isRTL === 'rtl'? 2:0,
        borderLeftWidth:isRTL === 'rtl'? 0:2,
        borderRightColor:"#000",
        borderLeftColor:"#000"
    },
    separate: {
        marginTop: 50
    }
});
