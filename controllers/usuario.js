import {connection} from '../database/connection.js';
import md5 from 'md5';

export const getClients = async (req, res) => {
    connection.query(
        'SELECT * FROM cuentas',
        function(err, results){
            res.json(results);
        }
    );
};

export const viewClients = () =>{
    return new Promise(function(resolve){
        connection.query(
            'SELECT * FROM cuentas',
            function(err, results){
                resolve(results);
            }
        );
    });
};

export const getClient = async (req, res) =>{
    const {id} = req.query;
    connection.query(
        'SELECT * FROM cuentas WHERE id = ?',
        [id],
        function(err, results){
            res.json(results[0]);
        }
    );
};

export const saveClient = async (req, res) => {
    const {id, email,  direccion, tel, password} = req.body;

    if(id == null || id == undefined || id == 0){
        connection.query(
            'INSERT INTO cuentas (email,  direccion, tel, password) VALUES (?,?,?,?)',
            [email,  direccion, tel, password],
            function(err, results){
                return res.json({
                    "id": results.insertId,
                    "msg": "Usuario creado correctamente",
                });
            }
        );
    } else{
        connection.query(
            'UPDATE cuentas SET email = ?, direccion = ?, tel = ?, password = ? WHERE id = ?',
            [email,  direccion, tel, password, id],
            function(err, results){
                return res.json({
                    "id": id,
                    "msg": "Usuario actualizado correctamente",
                });
            }
        );
    }
};

export const deleteClient = async (req, res) => {
    const {id} = req.body;
    connection.query(
        "DELETE FROM cuentas WHERE id = ?",
        [id],
        function(err, results){
            res.json(results);
        }
    );
};

export const getCuentas = async (req, res) =>{
    const {email, password} = req.body;
    console.log(req.body);
    connection.query(
        'SELECT * FROM cuentas WHERE email = ? AND password = ?',
        [email, password],
        function(err, results){
            if(results[0] === undefined) {
                res.json({
                    "error": 1,
                });
            } else {
                var token = createToken();
                var cuenta = results[0];

                req.session.admin = cuenta.esadmin;
                req.session.idcuenta = cuenta.id;

                token.then(function(r){
                    connection.query(
                        'UPDATE cuentas SET token = ? WHERE id = ?',
                        [r, cuenta.id],
                    );
                    res.json({
                        "error": 0,
                        "usuario": cuenta,
                        "token": r,
                    });
                })
            }
        }
    );
};

export const verifyAdmin = (r) =>{
    const admin = r;
    return new Promise(function(resolve){
        connection.query(
            'SELECT * FROM cuentas WHERE esadmin = ?',
            [admin],
            function(err, results){
                console.log(results);
                if (results.length == 0) resolve(-1)

                resolve(results[0]);
            }
        );
    });
};

function createToken(){
    var randnum = Math.floor(Math.random() * 9999);
    var token = md5(randnum);

return new Promise(function(resolve){
    connection.query(
        "SELECT * FROM cuentas WHERE token = ?",[token], function(err, results){
            if(results[0] === undefined) resolve(token);
            else resolve(createToken());
        }
    );
});
};

export const validateUser = async(req, res) => {
    const {token} = req.body;
    connection.query(
        'SELECT * FROM cuentas WHERE token = ?',
        [token],
        function(err, results){
            if(results[0] === undefined || token === ""){
                res.json({
                    "error": 1,
                });
            } else{
                res.json({
                    "error": 0,
                });
            };
        }
    );
};