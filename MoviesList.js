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

// var styles = StyleSheet.create({
//     width: 80,
//     height: 80,
//     maringRight: 10
// });

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

        return ["Loading ..."];
    }

    _handleResponse(jsonResponse) {
        console.log(this.movies);

        var movies = [];

        jsonResponse.results.collection1.forEach(function(movie) {
            movies.push(movie.title.text);
        });

        this.setState({dataSource: this.state.dataSource.cloneWithRows(movies)});


        console.log(movies);

    }

    rowPressed(movieRanking) {
        console.log("Movie tapped : " + movieRanking);
    }

    renderRow(rowData, sectionID, rowID) {
        return (
            <TouchableHighlight onPress={() => this.rowPressed(rowData)}
            underlayColor='#dddddd'>
            <View>
            <Text>{rowData}</Text>
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
