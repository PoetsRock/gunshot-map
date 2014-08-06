function warningMaker( obstacle ){
    var count = 0;
    var zones = [];
    return function (location, number ) {
        count++;
        zones.push(location, number);
        var locList = '';
        var numList = '';
        for(var i = 0; i<zones.length; i++){
            locList = locList + '\n' + zones[0][i];
        }
        for(i = 0; i<zones.length; i++){
            numList = numList + '\n' + zones[1][i];
        }
        alert('Beware! There have been ' +
                obstacle +
                ' sightings in the Cove today!\n' +
                number +
                ' ' +
                obstacle +
                '(s) spotted at the ' +
                location +
                '!\n' +
                'This is Alert #' +
                count +
                ' today for ' +
                obstacle +
                ' danger.\n' +
                'Current danger zones are: ' +
                list
        );
        console.log(locList);
        console.log(numList);
    };
}
