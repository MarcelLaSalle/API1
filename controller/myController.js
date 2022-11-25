module.exports.get = function(req, res){
    // console.log('hola');
    // res.send('Accedistes a BABOSAS.COM');

    const json = {
        alumnos: ['Rabocop', 'Letarray', 'Rosa Melano', 'Chupapimuñaño', 'Antonio Carlos'],
        totalAlumnos: ''
    }

    json['totalAlumnos'] = json['alumnos'].length;

    res.status(200).send(json);
}

module.exports.example1 = function(req, res){
    res.send('entra');
}