const express =require('express');
const app=express();
const bodyParser=require('body-parser');
const cors=require('cors');
const mongoose=require('mongoose');
const  listRoutes=express.Router();
const PORT= 4001;

let List =require('./tourist.model');

app.use(cors());
app.use(bodyParser.json());


mongoose.connect('mongodb://127.0.0.1:27017/tourist',{
    useUnifiedTopology: true,
    useNewUrlParser:true});
//     useCreateIndex: true},);

const connection=mongoose.connection;

connection.once('open', function() {

/////

        try {
            console.log("Mongodb database connected successfully")
        }catch (e) {
            console.log("what the error="+e);
        }
    }
);





listRoutes.route('/').get(function (req,res) {
    List.find(function (error,listo) {
        if(error){
            console.log(error);
        }else {
            res.json(listo);
        }
    });
});

listRoutes.route('/:id').get(function (req,res) {
    let id=req.params.id;
    List.findById(id,function (error,list) {
        res.json(list);
    });
});

listRoutes.route('/add').post(function (req,res) {
    let list=new List(req.body);
    list.save()
        .then(list=>{
            res.status(200).json({'list':'List added successfully'});
        })
        .catch(err=>{
            res.status(400).send('Adding new list failed');
        });
});

listRoutes.route('/update/:id').post(function (req,res) {
    List.findById(req.params.id,function (err,list) {
        if(!list)
            res.status(404).send('data is not found');
        else
            list.name=req.body.name;
        list.age=req.body.age;
        list.address=req.body.address;
        list.nic=req.body.nic;
        list.nationality=req.body.nationality;
        list.bloodGrp=req.body.bloodGrp;
        list.hotel=req.body.hotel;
        list.guid=req.body.guid;
        list.cancele=req.body.cancele



        list.save().then(list=>{
            res.json('List updated');
        })
            .catch(err=>{
                res.status(400).send("Updated not possible")
            });

    });
});





app.use('/tourist',listRoutes);

app.listen(PORT,function () {
    console.log("server running on port="+PORT);
});