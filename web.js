
const express = require('express'),
bodyParser = require('body-parser'),
helmet = require('helmet'),
ejs = require('ejs');



module.exports = () {
const PORT = process.env.PORT || 5000;


const app = express();
app.use(helmet());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('public'));
app.engine('html', ejs.renderFile);
app.set('view engine', 'ejs');


require('./router/main')(app);

app.listen(PORT, () => {
    console.log(`PORT: ${PORT}`);
});
}
