import { Router } from "express";
import { viewProducts } from "../controllers/productos.js";
import { viewClients, verifyAdmin } from "../controllers/usuario.js";

const router = Router();

router.get('/', function(req, res){
    var esadmin = verifyAdmin(req.session.admin);
    esadmin.then(function(admin){
        res.render('pages/index',{
            "esadmin": admin.esadmin,
        });
    })
});
/* <---------- INDEX ----------> */
router.get('/index', function(req,res){
    var esadmin = verifyAdmin(req.session.admin);
    esadmin.then(function(admin){
        console.log("LOCAL:"+admin.esadmin);
        res.render('pages/index',{
            "esadmin": admin.esadmin,
        });
    })
});
/* <---------- AYUDA ----------> */
router.get('/ayuda', function(req,res){
    var esadmin = verifyAdmin(req.session.admin);
    esadmin.then(function(admin){
        res.render('pages/ayuda',{
            "esadmin": admin.esadmin,
        });
    })
});

/* <---------- PERFIL ----------> */
router.get('/perfil', function(req,res){
    var esadmin = verifyAdmin(req.session.admin);
    esadmin.then(function(admin){
        res.render('pages/perfil',{
            "esadmin": admin.esadmin,
        });
    })
});

/* <---------- LOGIN ----------> */
router.get('/login', function(req,res){
    var esadmin = verifyAdmin(req.session.admin);
    esadmin.then(function(admin){
        res.render('pages/login',{
            "esadmin": admin.esadmin,
        });
    })
});

/* <---------- PRODUCTOS ----------> */
router.get('/products', function(req,res){
    var products = viewProducts();
    var esadmin = verifyAdmin(req.session.admin);
    esadmin.then(function(admin){
        products.then(function(product){
            res.render("pages/product", {
                "products": product,
                "esadmin": admin.esadmin,
            });
        });
    })
});

/* <---------- ADMINPROD ----------> */
router.get('/adminProducts', function(req,res){
    var adminProducts = viewProducts();
    adminProducts.then(function(adminProd){
        res.render("pages/adminProd", {
            "adminProducts": adminProd,
        });
    });
});

router.get('/adminProdAE', function(req,res){
    res.render("pages/adminProdAE");
});

router.get('/adminUser', function(req,res){
    var adminUser = viewClients();
    adminUser.then(function(adminUsr){
        res.render("pages/adminUsr", {
            "adminUser": adminUsr,
        });
    });
});

router.get('/adminUsrAE', function(req,res){
    res.render("pages/adminUsrAE");
});

export default router;