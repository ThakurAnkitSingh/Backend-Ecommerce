const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const categoryRoutes = require("./routes/category.routes");
const productRoutes = require("./routes/product.routes");
const userRoutes = require("./routes/user.routes");
const roleRoutes = require("./routes/role.routes");
const orderRoutes = require("./routes/order.routes");
const db = require('./models/index');

const PORT = 3000;

app.use(bodyParser.urlencoded({extended:true}));

userRoutes(app);
roleRoutes(app);
categoryRoutes(app);
productRoutes(app);
orderRoutes(app);

app.listen(PORT, async() => {
    // we can remove or not the db.seq.sync part after creating through table
    // it will syncronize all the tables if the table is not created(through table)
    // (Many-To-Many through Table)
    await db.sequelize.sync(); 
    console.log(`Server is listening ${PORT}`);
})