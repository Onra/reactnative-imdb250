'use strict';

var React = require('react-native');
var MoviesList = require('./MoviesList');

var styles = React.StyleSheet.create({
    container: {
        flex: 1
    }
});

class ReactNativeImdbTop250 extends React.Component {
    render() {
        return (
            <React.NavigatorIOS
                style = {styles.container}
                initialRoute = {{
                    title: 'IMDb Top 250',
                    component: MoviesList,
                }}/>
        );
    }
}

React.AppRegistry.registerComponent('reactnativeimdb250', function() { return ReactNativeImdbTop250 });
