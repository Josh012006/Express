require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const { engine }  = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');




const PORT = process.env.PORT || 5500;


//Création d'une instance d'express
const app = express();


//Définition du path des views et du template engine utilisé
app.engine('handlebars', engine());
app.set('views', path.join(__dirname, '..', 'views'));
app.set('view engine', 'handlebars');
app.use(express.static(path.join(__dirname, '..', "public")));
app.use(bodyParser.json());




const checkTime = (req, res, next) => {
    const currentTime = new Date();
    const currentHour = currentTime.getHours();

    // Vérifiez si l'heure est entre 9h et 17h
    if (currentHour >= 0 && currentHour < 17) {
      // Si l'heure est valide, passez au middleware suivant
        next();
    } else {
      // Sinon, renvoyez une réponse indiquant que la page n'est pas disponible
        res.render('pages/disponibility', {
            title:"Not Available",
            style:"disponibility"
        });
    }
};


//Définition de la route de la page d'accueil
app.get('/', checkTime, (req, res) => {
    res.render('pages/accueil', {
        title:"Accueil",
        style:"accueil"
    });
});

//Définition de a route de la page des services
app.get('/ourservices', checkTime, (req, res) => {
    res.render('pages/services', {
        title:"Nos services",
        style:"services"
    });
});

app.get('/service1', checkTime, (req, res) => {
    res.render('pages/service1', {
        title:"Nos services",
        style:"service1"
    });
});

app.get('/service2', checkTime, (req, res) => {
    res.render('pages/service2', {
        title:"Nos services",
        style:"service2"
    });
});

//Définition de la route pour la page de contact
app.get('/contact', checkTime, (req, res) => {
    res.render('pages/contact', {
        title:"Nous contacter",
        style:"contact"
    });
});


//Définition de la route de confirmation de la soumission
app.post('/soumis', (req, res) => {

    //Traitement de la requête
    const email = req.body;
    console.log(email.mail);

    //Définition des variables pour l'envoi de mail
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'monganjosue3@gmail.com',
            pass: 'clsw tfhn pxul xhjw'
        }
    });

    var mailOptions = {
        from: 'monganjosue3@gmail.com',
        to: email.mail,
        subject: 'Commande chez TechMasters',
        text: 
        `
            Merci d'avoir fait confiance à TechMasters.
            Votre commande a bien été reçue. Un de nos agents vous contactera dans les prochaines 48h.
        `
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log("error1");
            res.status(500);
            res.end();
        }
        else {
            res.status(200);
            res.end();
            console.log(info);
        }
    });
});

app.get('/soumission', (req, res) => {
    res.render('pages/soumis', {
        title:"Soumission",
        style:"soumis"
    });
})


//Définition de la route en cas d'erreur
app.all('/fail', (req, res) => {
    res.status(300);
    res.render('pages/fail', {
        title:"Error",
        style:"error"
    });
});









//Ecouter la requête au port 5500
app.listen(PORT, function() {
    console.log(`Server is running at http://localhost:${PORT}/`);
});


module.exports = app;

