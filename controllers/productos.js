import {connection} from '../database/connection.js'

export const getProducts = async (req, res) => {
    connection.query(
        'SELECT * FROM productos',
        function(err, results){
            res.json(results);
        }
    );
};

export const viewProducts = () =>{
    return new Promise(function(resolve){
        connection.query(
            'SELECT * FROM productos',
            function(err, results){
                resolve(results);
            }
        );
    });
}

export const getProduct = async (req, res) =>{
    const {id} = req.query;
    connection.query(
        'SELECT * FROM productos WHERE id = ?',
        [id],
        function(err, results){
            res.json(results[0]);
        }
    );
};

export const saveProduct = async (req, res) => {
    const {id, precio, nombre} = req.body;

    if(id == null || id == undefined || id == 0){
        connection.query(
            'INSERT INTO productos (precio, nombre) VALUES (?,?)',
            [precio, nombre],
            function(err, results){
                return res.json({
                    "id": results.insertId,
                    "msg": "producto creado correctamente",
                });
            }
        );
    } else{
        connection.query(
            'UPDATE productos SET precio = ?, nombre = ? WHERE id = ?',
            [precio, nombre, id],
            function(err, results){
                return res.json({
                    "id": id,
                    "msg": "Usuario actualizado correctamente",
                });
            }
        );
    }
};

export const deleteProduct = async (req, res) => {
    const {id} = req.body;
    connection.query(
        "DELETE FROM productos WHERE id = ?",
        [id],
        function(err, results){
            res.json(results);
        }
    );
};