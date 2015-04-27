'use strict';

var React = require('react-native');

// See Object Destructuring - Part of ECMAScript 6 proposal.
// (http://tinyurl.com/lkb87jo)
var {
    StyleSheet,
    Image,
    View,
    TouchableHighlight,
    ActivityIndicatorIOS,
    ListView,
    Text,
    Component
} = React;

var styles = StyleSheet.create({

    thumb: {
        width: 34,
        height: 50,
        marginRight: 10
    },

    separator: {
        height: 1,
        backgroundColor: '#dddddd'
    },

    rowContainer: {
        flexDirection: 'row',
        padding: 20
    }
});

class MoviesList extends Component {

    constructor(props) {
        super(props);
        var dataSource = new ListView.DataSource(
            {rowHasChanged: (r1, r2) => r1.ranking !== r2.ranking}
        );
        this.state = {
            dataSource: dataSource.cloneWithRows(this._genRows())
        };
    }

    _genRows() {

        console.log("fetch API");

        fetch("https://www.kimonolabs.com/api/3w4usycc?apikey=t6ntCPmhqHKTfbCfOomxPdlMKAvAo2ON")
            .then(response => response.json())
            .then(json => this._handleResponse(json))
            .catch(error => {
                console.log("Something bad happened...");
            });

        return [];
    }

    _handleResponse(jsonResponse) {

        var movies = [];

        jsonResponse.results.collection1.forEach(function(movie) {
            movies.push(movie);
        });

        this.setState({dataSource: this.state.dataSource.cloneWithRows(movies)});


        // console.log(movies);

    }

    rowPressed(movieRanking) {
        console.log("Movie tapped : " + movieRanking);
    }

    renderRow(rowData, sectionID, rowID) {

        console.log(rowData.image.src);

        return (
            <TouchableHighlight onPress={() => this.rowPressed(rowData.title.text)}
            underlayColor='#dddddd'>
            <View>
                <View style={styles.rowContainer}>
                    <Image style={styles.thumb} source={{ uri: rowData.image.src }} />
                    <Text>{rowData.title.text}</Text>
                </View>
                <View style={styles.separator} />
            </View>
            </TouchableHighlight>
        );
    }

    render() {
        return (
            <ListView
            dataSource = {this.state.dataSource}
            renderRow = {this.renderRow.bind(this)} />
        );
    }
}


module.exports = MoviesList;
